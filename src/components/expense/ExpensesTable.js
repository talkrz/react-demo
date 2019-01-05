import React, { useState } from 'react';
import Button from '../common/Button';
import './ExpensesTable.css';

export default function ExpenseForm({ expensesList, expenseRemove, currency }) {
  const [sort, setSort] = useState();
  const [sortAscDesc, setSortAscDesc] = useState();

  function toggleSort(sortField) {
    setSort(sortField);
    if (!sortAscDesc)
      setSortAscDesc(1);
    else {
      setSortAscDesc(0);
    }
  }

  function sortExpenses(expenses) {
    return expenses.sort((a, b) => {
      if (sort === 'title') {
        return sortAscDesc ? a.title < b.title : a.title > b.title;
      }
      if (sort === 'amount') {
        return sortAscDesc ? a.amount < b.amount : a.amount > b.amount;
      }
      if (sort === 'amountCurrency') {
        return sortAscDesc ? a.amountCurrency < b.amountCurrency : a.amountCurrency > b.amountCurrency;
      }
      return 0;
    })
  }

  function sortArrow(sortField) {
    return sort === sortField ? sortAscDesc ? '&uarr;' : '&darr;' : '&uarr;&darr;';
  }

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
          <td className="ExpensesTable-price">Amount ({currency}){sortButton('amountCurrency')}</td>
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
