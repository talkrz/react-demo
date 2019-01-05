import React from 'react';
import { ExchangeRateContext } from '../../stores/ExchangeRateStore';
import Input from '../common/Input';
import './ExchangeRate.css';

export default function ExchangeRate() {
  return (
    <ExchangeRateContext.Consumer>
      {({ exchangeRates, setExchangeRate, currency, setCurrency }) => (
        <div className="ExchangeRate">
          1
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            {Object.keys(exchangeRates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          =
          <Input
            type="text"
            value={exchangeRates[currency]}
            onChange={e => setExchangeRate(currency, e.target.value)}
          />
          PLN
        </div>
      )}
    </ExchangeRateContext.Consumer>
  )
}
