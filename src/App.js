import React, { Component } from 'react';
import ExpensesList from './components/ExpensesList';
import ExchangeRate from './components/exchangeRate/ExchangeRate';
import ExpenseStore from './stores/ExpenseStore';
import ExchangeRateStore from './stores/ExchangeRateStore';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-content">
            <h1>List of expenses</h1>
            <ExchangeRateStore>
              <ExchangeRate />
            </ExchangeRateStore>
          </div>
        </header>
        <div id="App-content">
          <ExpenseStore>
            <ExpensesList />
          </ExpenseStore>
        </div>
      </div>
    );
  }
}

export default App;
