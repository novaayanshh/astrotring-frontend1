import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMessageCircle, FiStar, FiZap, FiShield, FiMoon, FiRefreshCw, FiTruck } from 'react-icons/fi';
import { PRODUCTS, CATEGORIES, ZODIAC_DATA, TESTIMONIALS, ASTROLOGERS, QUICK_LINKS } from '../data/products';
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
          <span key={i} className={styles.zodiacItem}>{z.sign} {z.name} <span className={styles.dot}><FiZap size={12} /></span></span>
        ))}
      </div>
    </div>
  );
}

function QuickPills() {
  const navigate = useNavigate();
  return (
    <div className={styles.quickPills}>
      <div className={styles.pillsScroll}>
        {QUICK_LINKS.map(q => (
          <button key={q.label} className={styles.pill} onClick={() => navigate('/services')}>
            <span>{q.icon}</span> {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AstrologersSection() {
  const navigate = useNavigate();
  return (
    <section className={`section ${styles.astroSection}`}>
      <div className="centered" style={{ marginBottom: '3rem' }}>
        <div className="section-label">Live now</div>
        <h2 className="section-title">Talk to Our Astrologers</h2>
        <div className="divider" />
      </div>
      <div className={styles.astroGrid}>
        {ASTROLOGERS.map(a => (
          <div key={a.id} className={styles.astroCard}>
            <div className={styles.astroAvatar}>
              {a.initials}
              {a.online && <span className={styles.astroOnline} />}
            </div>
            <div className={styles.astroName}>{a.name}</div>
            <div className={styles.astroExpertise}>{a.expertise}</div>
            <div className={styles.astroMeta}>
              <span>{a.experience} yrs exp</span>
              <span><FiStar size={14} style={{ marginRight: '0.2rem' }} /> {a.rating}</span>
            </div>
            <button className={styles.astroBtn} onClick={() => navigate('/services')}>
              Chat Â· <span className={styles.astroPrice}>â‚¹{a.price}/min</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function BirthstoneQuiz() {
  const navigate = useNavigate();
  const [activeZodiac, setActiveZodiac] = useState(null);
  const sel = ZODIAC_DATA.find(z => z.name === activeZodiac);
  return (
    <div className={styles.quiz}>
      <div className={styles.quizTitle}><FiZap size={16} style={{ marginRight: '0.4rem' }} /> Find Your Birthstone</div>
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
          <div className={styles.qrTitle}>{sel.sign} {sel.name} Â· Stone: {sel.gem}</div>
          <p className={styles.qrText}>{sel.desc}</p>
          <button className="btn-primary" style={{ marginTop: '1rem', fontSize: '0.8rem', padding: '0.7rem 1.5rem' }}
            onClick={() => navigate('/shop')}>Shop These Gems â†’</button>
        </div>
      )}
    </div>
  );
}
function SupportWidget() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.supportWidget}>
      {!dismissed && (
        <div className={styles.supportTip}>
          <button className={styles.supportClose} onClick={() => setDismissed(true)} aria-label="Dismiss">Ã—</button>
          <div className={styles.supportTipTitle}><FiMessageCircle size={16} style={{ marginRight: '0.4rem' }} /> Need guidance?</div>
          <div className={styles.supportTipText}>Chat with an astrologer now</div>
        </div>
      )}
      <button className={styles.supportBtn} aria-label="Chat with an astrologer" onClick={() => navigate('/services')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cosmic)" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
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
        <div className={styles.heroEyebrow}><FiZap size={14} style={{ marginRight: '0.35rem' }} /> Celestially Certified <FiZap size={14} style={{ marginLeft: '0.35rem' }} /></div>
        <h1 className={styles.heroTitle}>Wear the <span className={styles.gold}>Cosmos</span>,<br />Command Your Destiny</h1>
        <p className={styles.heroSub}>Authentic Vedic gemstones, Rudraksha malas, and astrological jewellery â€” handpicked by expert astrologers for your unique birth chart.</p>
        <div className={styles.heroBtns}>
          <button className="btn-primary" onClick={() => navigate('/shop')}>Explore Collection</button>
          <button className="btn-outline" onClick={() => navigate('/services')}>Get a Reading</button>
        </div>
        <div className={styles.heroScroll}>â†“</div>
      </section>

      {/* QUICK ACCESS PILLS */}
      <QuickPills />

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

      {/* ASTROLOGERS */}
      <AstrologersSection />

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
            { icon: <FiShield />, label: 'Lab Certified', sub: 'Every gem tested & verified' },
            { icon: <FiMoon />, label: 'Astrologer Vetted', sub: 'Expert guidance on every pick' },
            { icon: <FiRefreshCw />, label: '30-Day Returns', sub: 'Hassle-free, no questions' },
            { icon: <FiTruck />, label: 'Fast Shipping', sub: 'Pan India & international' },
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
              <div className={styles.testiStars}>{Array.from({ length: t.rating }, (_, i) => <FiStar key={i} size={14} />)}</div>
              <p className={styles.testiText}>"{t.text}"</p>
              <div className={styles.testiAuthor}>
                <div className={styles.testiAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testiName}>{t.name}</div>
                  <div className={styles.testiMeta}>{t.location} Â· Verified Purchase</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* FLOATING SUPPORT WIDGET */}
      <SupportWidget />
    </div>
  );
}
