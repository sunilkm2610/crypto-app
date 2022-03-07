import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
// import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [curracy, setCurrancy] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (curracy === "INR") setSymbol("₹");
    else if (curracy === "USD") setSymbol("$");
  }, [curracy]);

  return (
    <Crypto.Provider value={{ curracy, symbol, setCurrancy }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
