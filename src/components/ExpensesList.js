import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import { ExpenseContext } from '../stores/ExpenseStore';
import { ExchangeRateContext } from '../stores/ExchangeRateStore';
import './ExpensesList.css';

export default function ExpensesList() {
  return (
    <ExchangeRateContext.Consumer>
      {({ currency }) => (
        <ExpenseContext.Consumer>
          {({ expensesList, expenseAdd, expenseRemove }) => (
            <div className="ExpensesList">
              <ExpenseForm onSubmit={expenseAdd} />
              <ExpensesTable
                expensesList={expensesList.expenses}
                expenseRemove={expenseRemove}
                currency={currency}
              />
              <div className="ExpensesList-sum">
                Sum: {expensesList.sumPln.toFixed(2)} PLN
                ({expensesList.sumCurrency.toFixed(2)} {currency})
              </div>
            </div>
          )}
        </ExpenseContext.Consumer>
      )}
    </ExchangeRateContext.Consumer>
  )
}
