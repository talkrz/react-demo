import React from 'react';
import { ExchangeRateContext } from '../../stores/ExchangeRateStore';
import Input from '../common/Input';
import './ExchangeRate.css';

export default function ExchangeRate() {
  return (
    <ExchangeRateContext.Consumer>
      {({ exchangeRates, setExchangeRate }) => (
        <div className="ExchangeRate">
          1 EUR =
          <Input
            type="text"
            value={exchangeRates.eurpln}
            onChange={e => setExchangeRate('eurpln', e.target.value)}
          /> PLN
        </div>
      )}
    </ExchangeRateContext.Consumer>
  )
}
