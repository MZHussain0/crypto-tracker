import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Toolbar } from "@mui/material";
import { AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import { CryptoState } from "../../context/cryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar color="primary" position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              color: "gold",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <Link to="/">Cryptoscope</Link>
          </Typography>
          <Select
            variant="filled"
            defaultValue={"USD"}
            style={{
              width: 100,
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
