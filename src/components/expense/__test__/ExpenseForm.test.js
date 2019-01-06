import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import ExpenseForm from '../ExpenseForm';

function setupForm(onSubmit) {
  const { container, getByLabelText } = render(<ExpenseForm onSubmit={onSubmit} />)
  const form = container.querySelector('form');

  return {
    form,
    getByLabelText
  }
}

afterEach(cleanup);

it ('displays error message when title not valid', () => {
  const { form, getByLabelText } = setupForm(() => {});
  const field = getByLabelText('title');
  const input = field.querySelector('input');
  // text too short
  fireEvent.change(input, { target: { value: 'abc'}});
  fireEvent.submit(form);

  const errorMessage = field.querySelector('p');
  expect(errorMessage).toBeDefined();
  expect(errorMessage.innerHTML).toBe('Title should have at least 5 characters');
})

it ('displays error message when amount not valid', () => {
  const { form, getByLabelText } = setupForm(() => {});
  const field = getByLabelText('amount');
  const input = field.querySelector('input');

  const errorMsg = "Amount should be proper number in a form: '12.34'";

  // text
  fireEvent.change(input, { target: { value: 'abc'}});
  fireEvent.submit(form);

  let errorMessage = field.querySelector('p');
  expect(errorMessage).not.toBeNull();
  expect(errorMessage.innerHTML).toBe(errorMsg);

  // comma instead of dot
  fireEvent.change(input, { target: { value: '10,10'}});
  fireEvent.submit(form);

  errorMessage = field.querySelector('p');
  expect(errorMessage).not.toBeNull();
  expect(errorMessage.innerHTML).toBe(errorMsg);

  // to many decimal places
  fireEvent.change(input, { target: { value: '10.111'}});
  fireEvent.submit(form);

  errorMessage = field.querySelector('p');
  expect(errorMessage).not.toBeNull();
  expect(errorMessage.innerHTML).toBe(errorMsg);
})

it ('submits the form without errors with correct data', () => {
  const mockOnSubmit = jest.fn(() => {});
  const { form, getByLabelText } = setupForm(mockOnSubmit);
  const fieldTitle = getByLabelText('title');
  const inputTitle = fieldTitle.querySelector('input');

  const fieldAmount = getByLabelText('amount');
  const inputAmount = fieldAmount.querySelector('input');

  fireEvent.change(inputTitle, { target: { value: 'abcde'}});
  fireEvent.change(inputAmount, { target: { value: '10.34'}});
  fireEvent.submit(form);

  let errorMessage = fieldTitle.querySelector('p');
  expect(errorMessage).toBeNull();
  errorMessage = fieldAmount.querySelector('p');
  expect(errorMessage).toBeNull();

  expect(mockOnSubmit.mock.calls.length).toBe(1);
})
