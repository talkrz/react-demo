import React from 'react';
import './Button.css';

export default function Button({ text, onClick, type, className }) {
  const buttonType = type ? type : 'button';
  const buttonClass = className ? `${className} Button` : 'Button';
  return (
    <button className={buttonClass} onClick={onClick} type={buttonType}>
      {text}
    </button>
  )
}
