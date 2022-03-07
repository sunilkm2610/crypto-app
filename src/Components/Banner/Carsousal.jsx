import { makeStyles } from "@mui/styles";
import React from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { useState } from "react";
import { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textTransform: "uppercase",
    color: "white",
  },
}));

export const numberwithcommma = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carsousal = () => {
  const [trend, setTrend] = useState([]);

  const classes = useStyles();

  const { curracy, symbol } = CryptoState();

  const fetchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(curracy));
    setTrend(data);
  };

  const items = trend.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coin/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberwithcommma(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    516: {
      items: 4,
    },
  };

  useEffect(() => {
    fetchTrandingCoins();
  }, [curracy]);

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        responsive={responsive}
        autoPlay
        disableDotsControls
        items={items}
      />
    </div>
  );
};

export default Carsousal;
