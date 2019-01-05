import React, { useState } from 'react';
import Button from '../common/Button';
import './ExpensesTable.css';

export default function ExpenseForm({ expensesList, expenseRemove, currency }) {
  const [sort, setSort] = useState();
  const [sortAscDesc, setSortAscDesc] = useState();

  /**
   * Toggle between asc and desc sort by given column
   */
  function toggleSort(sortField) {
    setSort(sortField);
    if (!sortAscDesc)
      setSortAscDesc(1);
    else {
      setSortAscDesc(0);
    }
  }

  /**
   * Sort expenses array
   */
  function sortExpenses(expenses) {
    return expenses.sort((a, b) => {
      if (sort === 'title') {
        return sortAscDesc ?
          a.title.toLowerCase() < b.title.toLowerCase()
          : a.title.toLowerCase() > b.title.toLowerCase();
      }
      if (sort === 'amount') {
        return sortAscDesc ? a.amount < b.amount : a.amount > b.amount;
      }
      return 0;
    })
  }

  /**
   * Get arrow depending on sort order
   */
  function sortArrow(sortField) {
    return sort === sortField ?
      sortAscDesc ?
        '&uarr;'
        : '&darr;'
      : '&uarr;&darr;';
  }

  /**
   * Render sort button
   */
  function sortButton(sortField) {
    return (
      <button
        className="ExpensesTable-sort"
        dangerouslySetInnerHTML={{ __html: sortArrow(sortField) /* o.O */}}
        onClick={e => toggleSort(sortField)}
      >
      </button>
    )
  }

  return (
    <div className="ExpensesTable">
      <table>
        <thead>
          <tr>
          <td>Title{sortButton('title')}</td>
          <td className="ExpensesTable-price">Amount (PLN){sortButton('amount')}</td>
          <td className="ExpensesTable-price">Amount ({currency}){sortButton('amount')}</td>
          <td className="ExpensesTable-actions">Options</td>
          </tr>
        </thead>
        <tbody>
          {sortExpenses(expensesList).map((expense, idx) => (
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
