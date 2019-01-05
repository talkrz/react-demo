import React, { Component } from 'react';
import ExpensesList from './components/ExpensesList';
import ExchangeRate from './components/exchangeRate/ExchangeRate';
import ExpenseStore from './stores/ExpenseStore';
import ExchangeRateStore from './stores/ExchangeRateStore';
import { ExchangeRateContext } from './stores/ExchangeRateStore';
import './App.css';

class App extends Component {
  render() {
    return (
      <ExchangeRateStore>
        <ExchangeRateContext.Consumer>
          {({ exchangeRates }) => (
            <ExpenseStore exchangeRates={exchangeRates}>
              <div className="App">
                <header className="App-header">
                  <div className="App-header-content">
                    <h1>List of expenses</h1>
                      <ExchangeRate />
                  </div>
                </header>
                <div id="App-content">
                    <ExpensesList />
                </div>
              </div>
            </ExpenseStore>
          )}
        </ExchangeRateContext.Consumer>
      </ExchangeRateStore>
    );
  }
}

export default App;
