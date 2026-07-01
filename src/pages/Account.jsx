import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import Footer from '../components/layout/Footer';
import styles from './Account.module.css';

const ORDERS = [
  { id: 'AT-2891', name: 'Yellow Sapphire Ring', emoji: '💛', date: '14 Jun 2026', price: 18500, status: 'Delivered' },
  { id: 'AT-2834', name: '5-Mukhi Rudraksha Mala', emoji: '📿', date: '28 May 2026', price: 4200, status: 'In Transit' },
  { id: 'AT-2756', name: 'Amethyst Crystal Ball', emoji: '🔮', date: '3 May 2026', price: 3800, status: 'Delivered' },
];

export default function Account() {
  const { wishlist, showNotif } = useCart();
  const [tab, setTab] = useState('orders');
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '64px' }}>
      <div className={styles.layout}>
        <div>
          <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Account</h1>
          <p style={{ color: 'var(--gold)', marginBottom: '2rem', fontFamily: 'Cinzel,serif', fontSize: '0.9rem' }}>✦ Welcome back, Ayansh</p>
        </div>

        <div className={styles.tabs}>
          {['orders', 'wishlist', 'profile', 'kundali'].map(t => (
            <button key={t} className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`}
              onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            {ORDERS.map(o => (
              <div key={o.id} className={styles.orderItem}>
                <div className={styles.orderImg}>{o.emoji}</div>
                <div className={styles.orderInfo}>
                  <div className={styles.orderName}>{o.name}</div>
                  <div className={styles.orderMeta}>Order #{o.id} · {o.date} · ₹{o.price.toLocaleString('en-IN')}</div>
                </div>
                <span className={`${styles.status} ${o.status === 'Delivered' ? styles.delivered : styles.transit}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* WISHLIST */}
        {tab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className={styles.empty}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>♡</div>
                <p>Your wishlist is empty.</p>
                <button
                  className="btn-outline"
                  style={{ display: 'inline-block', marginTop: '1rem' }}
                  onClick={() => navigate('/shop')}
                >
                  Browse Gems
                </button>
              </div>
            ) : (
              <div className={styles.wishGrid}>
                {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {tab === 'profile' && (
          <div>
            <div className="form-grid">
              <div className="form-row"><label className="form-label">First Name</label><input className="form-input" defaultValue="Ayansh" /></div>
              <div className="form-row"><label className="form-label">Last Name</label><input className="form-input" defaultValue="Pandey" /></div>
            </div>
            <div className="form-row"><label className="form-label">Email</label><input className="form-input" type="email" defaultValue="ayansh@example.com" /></div>
            <div className="form-row"><label className="form-label">Phone</label><input className="form-input" type="tel" defaultValue="+91 98765 43210" /></div>
            <div className="form-row"><label className="form-label">Address</label><input className="form-input" defaultValue="Gurugram, Haryana, India" /></div>
            <button className="btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => showNotif('✦ Profile saved')}>Save Changes</button>
          </div>
        )}

        {/* KUNDALI */}
        {tab === 'kundali' && (
          <div>
            <div className={styles.kundaliBox}>
              <div className={styles.kundaliTitle}>Your Birth Details</div>
              <div className="form-grid">
                <div className="form-row"><label className="form-label">Date of Birth</label><input className="form-input" type="date" defaultValue="2004-01-15" /></div>
                <div className="form-row"><label className="form-label">Time of Birth</label><input className="form-input" type="time" defaultValue="08:30" /></div>
              </div>
              <div className="form-row"><label className="form-label">Place of Birth</label><input className="form-input" defaultValue="Gurugram, Haryana, India" /></div>
              <button className="btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => showNotif('✦ Kundali updated!')}>Update & Recalculate</button>
            </div>
            <div className={styles.stonesBox}>
              <div className={styles.kundaliTitle}>Recommended Stones for You</div>
              <div className={styles.stonesGrid}>
                {[
                  { emoji: '💛', name: 'Yellow Sapphire', planet: 'Jupiter' },
                  { emoji: '🟢', name: 'Emerald',         planet: 'Mercury' },
                  { emoji: '🔴', name: 'Red Coral',       planet: 'Mars'    },
                ].map(s => (
                  <div key={s.name} className={styles.stoneCard}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                    <div style={{ fontFamily: 'Cinzel,serif', fontSize: '0.85rem', color: 'var(--white)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: '4px' }}>{s.planet}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}