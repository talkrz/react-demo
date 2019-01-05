import React from 'react';
import './Input.css';

export default function Input({ id, type, value, onChange, className }) {
  const inputClass = className ? `${className} Input` : 'Input';
  return (
    <input
      id={id}
      className={inputClass}
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}
