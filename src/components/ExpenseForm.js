import React, { useState } from 'react';
import Field from './form/Field';
import Button from './Button';
import Input from './Input';
import './ExpenseForm.css';

export default function ExpenseForm({ onSubmit }) {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    const data = {
      title: expenseTitle,
      amount: expenseAmount
    };
    const isValid = validate(data);

    if (isValid) {
      setExpenseTitle('');
      setExpenseAmount('');
      onSubmit(data);
    }

    event.preventDefault();
  }

  function validate(data) {
    const validationErrors = {};
    if (!data.title || data.title.length < 5) {
      validationErrors.title = "Title should have at least 5 characters";
    }
    // @todo: extract and test
    if (!data.amount || !data.amount.toString().match(/^-?\d{1,6}(\.\d{1,2})?$/)) {
      validationErrors.amount = "Amount should be proper number in a form: '12.34'";
    }
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }

  return (
    <div className="ExpenseForm">
      <form onSubmit={handleSubmit} className="ExpenseForm-form">
        <Field
          id="title"
          label="Title of transaction"
          input={(id) => (
            <Input
              id={id}
              type="text"
              value={expenseTitle}
              onChange={e => setExpenseTitle(e.target.value)}
            />
          )}
          error={errors.title}
        />
        <Field
          id="amount"
          label="Amount (in PLN)"
          input={(id) => (
            <Input
              id={id}
              type="text"
              value={expenseAmount}
              onChange={e => setExpenseAmount(e.target.value)}
            />
          )}
          error={errors.amount}
        />
        <Button className="ExpenseForm-submit" type="submit" text="Add" />
      </form>
    </div>
  )
}
