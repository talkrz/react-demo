import React, { useState } from 'react';

export const ExchangeRateContext = React.createContext();

export default function ExchangeRateStore({ children }) {
  // hardcoded initial state, normally should be fetched from storage
  const [exchangeRates, setExchangeRates] = useState({
    eurpln: 4.382
  });

  // set exchange rate action
  function setExchangeRate(currencyPair, rate) {
    setExchangeRates(Object.assign({}, exchangeRates, {
      [currencyPair]: rate,
    }));
  }

  return (
    <ExchangeRateContext.Provider value={{ exchangeRates, setExchangeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}
