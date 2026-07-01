import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const links = [
    { to: '/',         label: 'Home'     },
    { to: '/shop',     label: 'Shop'     },
    { to: '/services', label: 'Services' },
    { to: '/account',  label: 'Account'  },
  ];

  // Filter products by query
  const results = query.trim().length > 0
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase()) ||
        p.stone?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    else setQuery('');
  }, [searchOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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
      <Link to="/" className={styles.logo}>✦ Astrotring</Link>

      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className={`${styles.link} ${pathname === l.to ? styles.active : ''}`}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>

        {/* ── Search ── */}
        <div className={styles.searchWrap} ref={wrapperRef}>
          <button
            className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
            onClick={() => setSearchOpen(o => !o)}
            title="Search"
            aria-label="Search"
          >
            🔍
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
                <button type="submit" className={styles.searchSubmit} aria-label="Go">→</button>
              </form>

              {/* Live results */}
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

              {/* No results */}
              {query.trim().length > 0 && results.length === 0 && (
                <p className={styles.searchEmpty}>No gems found for "{query}"</p>
              )}
            </div>
          )}
        </div>

        <button className={styles.iconBtn} onClick={() => setIsCartOpen(true)} title="Cart">
          🛒
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>

        <Link to="/account" className={styles.iconBtn} title="Account">👤</Link>
      </div>
    </nav>
  );
}