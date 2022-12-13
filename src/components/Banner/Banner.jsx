import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import classes from "./Banner.module.css";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              border: "1px solid green",
            }}
          >
            Cryptoscope
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favourite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
