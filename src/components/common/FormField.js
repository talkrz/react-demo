import React from 'react';

export default function Field({ id, label, input, error }) {
  return (
    <div className="FormField" aria-label={id}>
      <label htmlFor={id}>
        {label}
      </label>
      {input(id)}
      {error && <p className="ExpenseForm-error">{error}</p>}
    </div>
  )
}
