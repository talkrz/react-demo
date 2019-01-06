import React from 'react';
import { render } from 'react-testing-library';
import ExchangeRateStore, { ExchangeRateContext } from '../ExchangeRateStore';

it('sets the proper values and actions in the context', () => {

  let storeValue = {};

  const ChildComponent = function() {
    return (
      <ExchangeRateContext.Consumer>
        {(data) => { storeValue = data }}
      </ExchangeRateContext.Consumer>
    );
  }

  const Store = function() {
    return (
      <ExchangeRateStore>
        <ChildComponent />
      </ExchangeRateStore>
    )
  }

  render(<Store />);

  expect(storeValue.exchangeRates).toBeDefined();
  expect(storeValue.exchangeRates.EUR).toBeDefined();
  expect(storeValue.exchangeRates.USD).toBeDefined();
  expect(storeValue.setExchangeRate).toBeDefined();
  expect(storeValue.currency).toBe('EUR');
  expect(storeValue.setCurrency).toBeDefined();
});
