import React from 'react';
import { ExchangeRateContext } from '../../stores/ExchangeRateStore';

export default function ExchangeRate() {
  return (
    <ExchangeRateContext.Consumer>
      {({ exchangeRates, setExchangeRate }) => (
        <p>1 EUR = {exchangeRates.eurpln} PLN</p>
      )}
    </ExchangeRateContext.Consumer>
  )
}
