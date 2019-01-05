import React from 'react';
import Button from '../common/Button';
import './ExpensesTable.css';

export default function ExpenseForm({ expensesList, expenseRemove, currency }) {
  return (
    <div className="ExpensesTable">
      <table>
        <thead>
          <tr>
          <td>Title</td>
          <td className="ExpensesTable-price">Amount (PLN)</td>
          <td className="ExpensesTable-price">Amount ({currency})</td>
          <td className="ExpensesTable-actions">Options</td>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense, idx) => (
            <tr key={expense.idx}>
              <td>{expense.title}</td>
              <td className="ExpensesTable-price">{expense.amount.toFixed(2)}</td>
              <td className="ExpensesTable-price">{expense.amountCurrency.toFixed(2)}</td>
              <td className="ExpensesTable-actions">
                <Button text="Delete" onClick={e => { expenseRemove(expense.idx) }}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
