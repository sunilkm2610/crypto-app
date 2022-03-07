import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Carsousal from "./Carsousal";

const useStyles = makeStyles({
  banner: {
    backgroundImage:
      "url(https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg)",
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    justifyContent: "center",
    height: "40%",
    flexDirection: "column",
    textAlign: "center",
  },
});

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontFamily: "Montserrat",
              color: "darkgrey",
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carsousal />
      </Container>
    </div>
  );
};

export default Banner;
