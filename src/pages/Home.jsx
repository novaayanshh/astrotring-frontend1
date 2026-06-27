import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, ZODIAC_DATA, TESTIMONIALS } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Footer from '../components/layout/Footer';
import styles from './Home.module.css';

const FEATURED_IDS = [1, 4, 5, 7];

function ZodiacStrip() {
  const doubled = [...ZODIAC_DATA, ...ZODIAC_DATA];
  return (
    <div className={styles.zodiacStrip}>
      <div className={styles.zodiacScroll}>
        {doubled.map((z, i) => (
          <span key={i} className={styles.zodiacItem}>{z.sign} {z.name} <span className={styles.dot}>✦</span></span>
        ))}
      </div>
    </div>
  );
}

function BirthstoneQuiz() {
  const navigate = useNavigate();
  const [activeZodiac, setActiveZodiac] = useState(null);
  const sel = ZODIAC_DATA.find(z => z.name === activeZodiac);
  return (
    <div className={styles.quiz}>
      <div className={styles.quizTitle}>✦ Find Your Birthstone</div>
      <p className={styles.quizSub}>Select your zodiac sign to discover the gemstones aligned with your cosmic energy.</p>
      <div className={styles.zodiacGrid}>
        {ZODIAC_DATA.map(z => (
          <button key={z.name}
            className={`${styles.zodiacBtn} ${activeZodiac === z.name ? styles.zodiacActive : ''}`}
            onClick={() => setActiveZodiac(activeZodiac === z.name ? null : z.name)}>
            <span className={styles.zSign}>{z.sign}</span>
            {z.name}
          </button>
        ))}
      </div>
      {sel && (
        <div className={styles.quizResult}>
          <div className={styles.qrTitle}>{sel.sign} {sel.name} · Stone: {sel.gem}</div>
          <p className={styles.qrText}>{sel.desc}</p>
          <button className="btn-primary" style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '0.7rem 1.5rem' }}
            onClick={() => navigate('/shop')}>Shop These Gems →</button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const featured = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));

  return (
    <div>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>✦ Celestially Certified ✦</div>
        <h1 className={styles.heroTitle}>Wear the <span className={styles.gold}>Cosmos</span>,<br />Command Your Destiny</h1>
        <p className={styles.heroSub}>Authentic Vedic gemstones, Rudraksha malas, and astrological jewellery — handpicked by expert astrologers for your unique birth chart.</p>
        <div className={styles.heroBtns}>
          <button className="btn-primary" onClick={() => navigate('/shop')}>Explore Collection</button>
          <button className="btn-outline" onClick={() => navigate('/services')}>Get a Reading</button>
        </div>
        <div className={styles.heroScroll}>↓</div>
      </section>

      {/* ZODIAC STRIP */}
      <ZodiacStrip />

      {/* CATEGORIES */}
      <section className={`section ${styles.catSection}`}>
        <div className="centered" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Browse by type</div>
          <h2 className="section-title">Sacred Collections</h2>
          <div className="divider" />
        </div>
        <div className={styles.catGrid}>
          {CATEGORIES.map(cat => (
            <div key={cat.name} className={styles.catCard} onClick={() => navigate('/shop', { state: { filter: cat.name } })}>
              <span className={styles.catIcon}>{cat.emoji}</span>
              <div className={styles.catName}>{cat.name}</div>
              <div className={styles.catCount}>{cat.count} Items</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="centered" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Astrologer picks</div>
          <h2 className="section-title">Featured Gems</h2>
          <div className="divider" />
        </div>
        <div className={styles.prodGrid}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-outline" onClick={() => navigate('/shop')}>View All Products</button>
        </div>
      </section>

      {/* BIRTHSTONE QUIZ */}
      <section className="section">
        <BirthstoneQuiz />
      </section>

      {/* TRUST BAR */}
      <div className={styles.trustBar}>
        <div className={styles.trustGrid}>
          {[
            { icon: '🔬', label: 'Lab Certified', sub: 'Every gem tested & verified' },
            { icon: '🌙', label: 'Astrologer Vetted', sub: 'Expert guidance on every pick' },
            { icon: '🔄', label: '30-Day Returns', sub: 'Hassle-free, no questions' },
            { icon: '🚀', label: 'Fast Shipping', sub: 'Pan India & international' },
          ].map(t => (
            <div key={t.label} className={styles.trustItem}>
              <span className={styles.trustIcon}>{t.icon}</span>
              <div className={styles.trustLabel}>{t.label}</div>
              <div className={styles.trustSub}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="centered" style={{ marginBottom: '3rem' }}>
          <div className="section-label">Real stories</div>
          <h2 className="section-title">What the Stars Said</h2>
          <div className="divider" />
        </div>
        <div className={styles.testiGrid}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={styles.testiCard}>
              <div className={styles.testiStars}>{'★'.repeat(t.rating)}</div>
              <p className={styles.testiText}>"{t.text}"</p>
              <div className={styles.testiAuthor}>
                <div className={styles.testiAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testiName}>{t.name}</div>
                  <div className={styles.testiMeta}>{t.location} · Verified Purchase</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
