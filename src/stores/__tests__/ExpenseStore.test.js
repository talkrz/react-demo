import React from 'react';
import { render } from 'react-testing-library';
import ExpenseStore, { ExpenseContext } from '../ExpenseStore';

it('sets the proper values and actions in the context', () => {
  const exchangeRates = {
    EUR: 3.33,
  }

  let expenseStoreValue = {};

  const ChildComponent = function() {
    return (
      <ExpenseContext.Consumer>
        {(data) => { expenseStoreValue = data }}
      </ExpenseContext.Consumer>
    );
  }

  const Store = function() {
    return (
      <ExpenseStore exchangeRates={exchangeRates} currency="EUR">
        <ChildComponent />
      </ExpenseStore>
    )
  }

  const { rerender } = render(<Store />);

  // rerender store component to fire useEffect hook
  rerender(<Store />);

  expect(expenseStoreValue.expensesList).toBeDefined();
  expect(expenseStoreValue.expensesList.expenses).toBeDefined();
  expect(expenseStoreValue.expensesList.expenses.length).toBe(4);
  expect(expenseStoreValue.expensesList.sumPln).toBe(222.54);
  expect(expenseStoreValue.expensesList.sumCurrency).toBe(222.54 / exchangeRates.EUR);
  expect(expenseStoreValue.expenseAdd).toBeDefined();
  expect(expenseStoreValue.expenseRemove).toBeDefined();
});
