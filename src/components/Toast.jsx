import React from 'react';
import { useCart } from '../context/CartContext';
import './Toast.css';

export default function Toast() {
  const { toastMsg, toastVisible } = useCart();
  return (
    <div className={`toast ${toastVisible ? 'show' : ''}`} role="status" aria-live="polite">
      {toastMsg}
    </div>
  );
}
