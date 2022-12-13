import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../context/cryptoContext";
import { SingleCoin } from "../../config/api";
import { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import CoinInfo from "../../components/CoinInfo/CoinInfo";
import classes from "./CoinsPage.module.css";
import { LinearProgress } from "@mui/material";
import { Typography } from "@mui/material";
import HtmlParser from "react-html-parser";
import { numberWithCommas } from "../../components/Banner/Carousel";

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };
  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 5 }}>
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            padding: 6,
            paddingBottom: 4,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {HtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 5 }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <div className="">
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default CoinsPage;
