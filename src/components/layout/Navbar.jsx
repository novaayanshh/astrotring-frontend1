import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiZap, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/',          label: 'Home'        },
    { to: '/shop',      label: 'Shop'        },
    { to: '/services',  label: 'Services'    },
    { to: '/astrologers', label: 'Astrologers' },
    { to: '/account',   label: 'Account'     },
  ];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}><FiZap size={16} style={{ marginRight: '0.35rem' }} /> Astrotring</Link>

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
          <Link to="/shop" className={styles.cta}>Get Started</Link>

          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileHeader}>
            <Link to="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
              <FiZap size={16} style={{ marginRight: '0.35rem' }} /> Astrotring
            </Link>
            <button
              className={styles.mobileClose}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <ul className={styles.mobileLinks}>
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={styles.mobileLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileCtaWrap}>
            <Link
              to="/shop"
              className={styles.mobileCta}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}