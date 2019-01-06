import React from 'react';

export default function Field({ id, label, input, error }) {
  return (
    <div className="FormField" aria-label={id}>
      <div className="FormField-field">
        <label htmlFor={id}>
          {label}
        </label>
        {input(id)}
      </div>
      <div className="FormField-error">
        {error && <p className="FormField-error-message">{error}</p>}
      </div>
    </div>
  )
}
