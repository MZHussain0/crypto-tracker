import axios from "axios";
import React from "react";
import { useState } from "react";
import { CryptoState } from "../../context/cryptoContext";
import { CoinList } from "../../config/api";
import { useEffect } from "react";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { TableContainer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { TableHead } from "@mui/material";
import { Table } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import classes from "./CoinsTable.module.css";
import { numberWithCommas } from "../Banner/Carousel";
import { Paper } from "@mui/material";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      handleSearch();
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const count = Number((coins?.length / 10).toFixed(0));
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ margin: 15, fontFamily: "Montserrat" }}>
        Cryptocurrencies by Market Cap
      </Typography>

      <TextField
        label="Search Cryptocurrencies.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer
        sx={{
          border: "1px solid rgba(128,128,128,0.4)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 4,
          borderRadius: 2,
        }}
      >
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#EEbc1d" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                      paddingLeft: 100,
                    }}
                    key={head}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {coins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                return (
                  <TableRow className={classes.row} key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <Link to={`/coins/${row.id}`}>
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10, paddingLeft: 80 }}
                        />
                      </Link>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 80,
                        }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          row.price_change_percentage_24h > 0
                            ? "rgb(14, 203, 129)"
                            : "red",
                        fontWeight: 500,
                        paddingLeft: 120,
                      }}
                    >
                      {row.price_change_percentage_24h > 0 && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell style={{ paddingLeft: 110 }}>
                      {symbol}{" "}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/* Comes from @material-ui/lab */}
      <Pagination
        count={count}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
