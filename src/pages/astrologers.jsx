import { useState } from 'react';
import { FiMenu, FiX, FiMessageCircle, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Astrologers.module.css';

const ASTROLOGERS = [
  { id: 1, name: 'Kunal Shastri', tradition: 'Vedic', expertise: 'Finance', price: 15, emoji: 'Male' },
  { id: 2, name: 'Meera Devi', tradition: 'Vedic', expertise: 'Marriage', price: 18, emoji: 'Female' },
  { id: 3, name: 'Rudra Nath', tradition: 'Vedic', expertise: 'Career', price: 15, emoji: 'Sage' },
  { id: 4, name: 'Vihaan Joshi', tradition: 'Vedic', expertise: 'Love', price: 20, emoji: 'Male2' },
];

const TICKER_ITEMS = ['Chat to Astrologer', 'Free Kundli', 'Kundli Matching', 'Daily Horoscope'];

export default function Astrologers() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link to="/" className={styles.logo}>Astrotring</Link>
        <button className={styles.menuBtn} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Chat With <span className={styles.highlight}>Astrologers</span> right now.
        </h1>
        <p className={styles.heroSub}>
          Know about astrology, zodiac signs, retrogrades, and more! Your world becomes clear once you understand how the universe influences it.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.chatBtn}>
            <FiMessageCircle size={18} /> Chat Now
          </button>
          <Link to="/shop" className={styles.shopBtn}>
            <FiShoppingBag size={18} /> Shop Now
          </Link>
        </div>
      </section>

      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>{item}</span>
          ))}
        </div>
      </div>

      <section className={styles.listSection}>
        <h2 className={styles.listTitle}>AI Astrologers</h2>
        <p className={styles.listSub}>Connect with our expert AI astrologers for guidance</p>
        <div className={styles.cards}>
          {ASTROLOGERS.map(a => (
            <div key={a.id} className={styles.card}>
              <div className={styles.avatar}>{a.emoji}</div>
              <div className={styles.cardInfo}>
                <h3>{a.name}</h3>
                <p className={styles.cardTradition}>{a.tradition}</p>
                <p className={styles.cardExpertise}>Expertise: <span>{a.expertise}</span></p>
                <p className={styles.cardPrice}>Rs.{a.price.toFixed(2)}/msg</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn} aria-label="Chat on WhatsApp">
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}
