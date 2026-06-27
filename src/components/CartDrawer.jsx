import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, removeFromCart, updateQty, showToast } = useCart();

  const handleCheckout = () => {
    showToast('✦ Proceeding to checkout…');
    onClose();
  };

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-head">
          <span className="cart-head-title">Your Cart</span>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="ce-icon">🛒</div>
              <p>Your cart awaits the stars</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                  <div className="cart-qty-row">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >+</button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="btn-outline" style={{ width: '100%' }} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
