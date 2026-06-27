import { SERVICES } from '../data/products';
import { useCart } from '../context/CartContext';
import Footer from '../components/layout/Footer';
import styles from './Services.module.css';

export default function Services() {
  const { showNotif } = useCart();
  return (
    <div style={{ paddingTop: '64px' }}>
      <div className={styles.hero}>
        <div className="section-label">Ancient wisdom, modern guidance</div>
        <h1 className="section-title">Astrology Services</h1>
        <div className="divider" />
        <p className={styles.sub}>Our panel of 50+ certified Vedic astrologers provide personalised guidance for every aspect of your life.</p>
      </div>

      <div className={styles.cards}>
        {SERVICES.map(s => (
          <div key={s.name} className={styles.card}>
            <span className={styles.icon}>{s.emoji}</span>
            <div className={styles.name}>{s.name}</div>
            <p className={styles.desc}>{s.desc}</p>
            <div className={styles.price}>{s.price}</div>
            <button className="btn-primary" style={{ marginTop: '1.5rem', fontSize: '0.8rem', padding: '0.7rem 1.5rem' }}
              onClick={() => showNotif(`✦ Booking for ${s.name} coming soon…`)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* PROCESS */}
      <div className={`section ${styles.process}`}>
        <div className="centered" style={{ marginBottom: '3rem' }}>
          <div className="section-label">How it works</div>
          <h2 className="section-title">Your Journey</h2>
          <div className="divider" />
        </div>
        <div className={styles.steps}>
          {[
            { n: '01', title: 'Book a Session', text: 'Choose your service and select a time slot. Provide your birth details securely.' },
            { n: '02', title: 'Expert Analysis', text: 'Our astrologer studies your Kundali in depth before the consultation.' },
            { n: '03', title: 'Live Consultation', text: 'Connect via video/call. Get personalised guidance and answers to your questions.' },
            { n: '04', title: 'Gem Recommendations', text: 'Receive a written report with gemstone prescriptions matched to your chart.' },
          ].map(s => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepNum}>{s.n}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepText}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
