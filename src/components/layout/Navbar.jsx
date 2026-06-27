import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/services', label: 'Services' },
    { to: '/account', label: 'Account' },
  ];

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
        <Link to="/shop" className={styles.iconBtn} title="Search">🔍</Link>
        <button className={styles.iconBtn} onClick={() => setIsCartOpen(true)} title="Cart">
          🛒
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
        <Link to="/account" className={styles.iconBtn} title="Account">👤</Link>
      </div>
    </nav>
  );
}
