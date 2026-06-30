import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home',     path: '/' },
    { label: 'Shop',     path: '/shop' },
    { label: 'Services', path: '/services' },
    { label: 'Account',  path: '/account' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">✦ Astrotring</Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={location.pathname === l.path ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/shop" className="nav-icon" title="Search">🔍</Link>
          <button
            className="nav-icon cart-btn"
            onClick={() => setCartOpen(true)}
            title="Cart"
            aria-label={`Cart — ${cartCount} items`}
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          <Link to="/account" className="nav-icon" title="Account">👤</Link>
          <Link to="/login">Sign In</Link>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
