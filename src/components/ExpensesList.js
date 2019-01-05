import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import { ExpenseContext } from '../stores/ExpenseStore';
import './ExpensesList.css';



export default function ExpensesList() {
  return (
    <ExpenseContext.Consumer>
      {({ expensesList, expenseAdd, expenseRemove }) => (
        <div className="ExpensesList">
          <ExpenseForm onSubmit={expenseAdd} />
          <ExpensesTable
            expensesList={expensesList.expenses}
            expenseRemove={expenseRemove}/>
          <div className="ExpensesList-sum">
            Sum: {expensesList.sumPln.toFixed(2)} PLN
            ({expensesList.sumEur.toFixed(2)} EUR)
          </div>
        </div>
      )}
    </ExpenseContext.Consumer>
  )
}
