import React, { useState, useEffect, useMemo } from 'react';
import fetchExpenses from '../dataSource/fetchExpenses';

export const ExpenseContext = React.createContext();

function exchangeRates() {
  return {
    eurpln: 4.382
  };
}

/**
 * Create expenses computed state (sums, amounts converted to other currencies)
 * from minimal expenses data
 */
function createExpensesList(expenses) {
  const expensesList = expenses.map((expense, idx) => ({
    // a little trick, normally we have some id from storage, but
    // not in this example, so let's just use item order from original array
    idx,
    title: expense.title,
    amount: parseFloat(expense.amount),
    amountEur: parseFloat(expense.amount) / exchangeRates().eurpln, // @todo
  }));
  return {
    expenses: expensesList,
    sumPln: expensesList.reduce((acc, current) => (acc + current.amount), 0.0),
    sumEur: expensesList.reduce((acc, current) => (acc + current.amountEur), 0.0)
  }
}

export default function ExpenseStore({ children }) {
  const [expenses, setExpenses] = useState([]);

  // No need to use effect here but normally fetching data from external source
  // shpuld be defined as effect
  useEffect(() => {
    setExpenses(fetchExpenses());
  }, []);

  // memoize the computed state
  const expensesList = useMemo(
    () => (createExpensesList(expenses)),
    [expenses]
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
