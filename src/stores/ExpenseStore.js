import React, { useState, useEffect, useMemo } from 'react';
import fetchExpenses from '../dataSource/fetchExpenses';

export const ExpenseContext = React.createContext();

/**
 * Create expenses computed state (sums, amounts converted to other currencies)
 * from minimal expenses data
 */
function createExpensesList(expenses, exchangeRates) {
  const expensesList = expenses.map((expense, idx) => ({
    // a little trick, normally we have some id from storage, but
    // not in this example, so let's just use item order from original array
    idx,
    title: expense.title,
    amount: parseFloat(expense.amount),
    amountEur: parseFloat(expense.amount) / exchangeRates.eurpln,
  }));

  return {
    expenses: expensesList,
    sumPln: expensesList.reduce((acc, current) => (acc + current.amount), 0.0),
    sumEur: expensesList.reduce((acc, current) => (acc + current.amountEur), 0.0)
  }
}

export default function ExpenseStore({ exchangeRates, children }) {
  const [expenses, setExpenses] = useState([]);

  // No need to use effect here but normally fetching data from external source
  // shpuld be defined as effect
  useEffect(() => {
    setExpenses(fetchExpenses());
  }, []);

  // memoize the computed state
  const expensesList = useMemo(
    () => (createExpensesList(expenses, exchangeRates)),
    [expenses, exchangeRates]
  );

  // remove action
  function expenseRemove(idx) {
    const newList = expenses.slice();
    newList.splice(idx, 1);
    setExpenses(newList);
  }

  // add action
  function expenseAdd(expense) {
    const newList = expenses.slice();
    newList.push(expense);
    setExpenses(newList);
  }

  return (
    <ExpenseContext.Provider value={{ expensesList, expenseAdd, expenseRemove }}>
      {children}
    </ExpenseContext.Provider>
  );
}
