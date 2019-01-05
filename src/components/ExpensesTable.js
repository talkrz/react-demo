import React from 'react';
import './ExpensesTable.css';

export default function ExpenseForm({ expensesList, expenseRemove }) {
  return (
    <div className="ExpensesTable">
      <table>
        <thead>
          <tr>
          <td>Title</td>
          <td className="ExpensesTable-price">Amount (PLN)</td>
          <td className="ExpensesTable-price">Amount (EUR)</td>
          <td className="ExpensesTable-actions">Options</td>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense, idx) => (
            <tr key={expense.idx}>
              <td>{expense.title}</td>
              <td className="ExpensesTable-price">{expense.amount.toFixed(2)}</td>
              <td className="ExpensesTable-price">{expense.amountEur.toFixed(2)}</td>
              <td className="ExpensesTable-actions">
                <button onClick={e => { expenseRemove(expense.idx) }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
