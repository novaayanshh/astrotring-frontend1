import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
} from 'react-icons/fi';
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
          <button className="nav-search" title="Search" aria-label="Search">
            <FiSearch size={20} />
          </button>
          <button
            className="nav-cart"
            onClick={() => setCartOpen(true)}
            title="Cart"
            aria-label={`Cart — ${cartCount} items`}
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          <button className="nav-login" title="Login" aria-label="Login">
            <FiUser size={20} />
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
