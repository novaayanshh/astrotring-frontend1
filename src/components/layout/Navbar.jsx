import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiArrowRight, FiZap, FiFilter, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const links = [
    { to: '/',         label: 'Home'     },
    { to: '/shop',     label: 'Shop'     },
    { to: '/services', label: 'Services' },
    { to: '/account',  label: 'Account'  },
  ];

  const results = query.trim().length > 0
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase()) ||
        p.stone?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    else setQuery('');
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setMobileMenuOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleResultClick = (id) => {
    setSearchOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}><FiZap size={16} style={{ marginRight: '0.35rem' }} /> Astrotring</Link>

      <ul className={`${styles.links} ${mobileMenuOpen ? styles.linksOpen : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className={`${styles.link} ${pathname === l.to ? styles.active : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <div className={styles.searchWrap} ref={wrapperRef}>
          <button
            className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
            onClick={() => setSearchOpen(o => !o)}
            title="Search"
            aria-label="Search"
          >
            <FiSearch size={18} />
            <span className={styles.iconLabel}>Search</span>
          </button>

          {searchOpen && (
            <div className={styles.searchDropdown}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  ref={inputRef}
                  className={styles.searchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search gems, rings, stones…"
                  autoComplete="off"
                />
                <button type="submit" className={styles.searchSubmit} aria-label="Go"><FiArrowRight size={16} /></button>
              </form>

              {results.length > 0 && (
                <ul className={styles.searchResults}>
                  {results.map(p => (
                    <li key={p.id}>
                      <button
                        className={styles.searchResultItem}
                        onClick={() => handleResultClick(p.id)}
                      >
                        <span className={styles.srEmoji}>{p.emoji}</span>
                        <span className={styles.srInfo}>
                          <span className={styles.srName}>{p.name}</span>
                          <span className={styles.srPrice}>₹{p.price.toLocaleString('en-IN')}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className={styles.searchEmpty}>No gems found for "{query}"</p>
              )}
            </div>
          )}
        </div>

        <Link to="/shop" className={styles.iconBtn} title="Filter">
          <FiFilter size={18} />
          <span className={styles.iconLabel}>Filter</span>
        </Link>

        <Link to="/wishlist" className={styles.iconBtn} title="Wishlist">
          <FiHeart size={18} />
          <span className={styles.iconLabel}>Wishlist</span>
        </Link>

        <button className={styles.iconBtn} onClick={() => setIsCartOpen(true)} title="Cart">
          <FiShoppingCart size={18} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          <span className={styles.iconLabel}>Cart</span>
        </button>

        <Link to="/account" className={styles.iconBtn} title="Account">
          <FiUser size={18} />
          <span className={styles.iconLabel}>Account</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
    </nav>
  );
}