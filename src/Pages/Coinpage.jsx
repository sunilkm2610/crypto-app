import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../Components/Banner/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import parser from "html-react-parser";
import useMediaQuery from "@mui/material/useMediaQuery";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinpage = () => {
  const { id } = useParams();
  const { curracy, symbol } = CryptoState();
  const [coin, setCoin] = useState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchSingleCoin();
  }, [curracy]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      // [theme.breakpoints.down("md")]: {
      //   flexDirection: "column",
      //   alignItems: "center",
      // },
    },
    sidebar: {
      width: "30%",
      // [theme.breakpoints.down("md")]: {
      //   width: "100%",
      // },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      // [theme.breakpoints.down("md")]: {
      //   display: "flex",
      //   justifyContent: "space-around",
      // },
      // [theme.breakpoints.down("sm")]: {
      //   flexDirection: "column",
      //   alignItems: "center",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   alignItems: "start",
      // },
    },
  }));

  const classes = useStyles();
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
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parser(`${coin?.description.en.split(". ")[0]}`)}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[curracy.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[curracy.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
