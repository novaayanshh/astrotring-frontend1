import { useState } from 'react';
import { SERVICES } from '../data/products';
import { useCart } from '../context/CartContext';
import Footer from '../components/layout/Footer';
import styles from './Services.module.css';

export default function Services() {
  const { showNotif } = useCart();

  const [modal, setModal] = useState(null);   // null | service object
  const [step, setStep]   = useState('form'); // 'form' | 'success'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', date: '', time: '',
    dob: '', birthTime: '', birthPlace: '',
  });

  const openModal = (s) => {
    setModal(s);
    setStep('form');
    setError('');
    setLoading(false);
    setForm({ name: '', email: '', date: '', time: '', dob: '', birthTime: '', birthPlace: '' });
  };

  const closeModal = () => setModal(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleBook = (e) => {
    e.preventDefault();
    setError('');
    const { name, email, date, time } = form;
    if (!name || !email || !date || !time) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      showNotif(`✦ ${modal.name} booked successfully!`);
    }, 1400);
  };

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ paddingTop: '64px' }}>
      <div className={styles.hero}>
        <div className="section-label">Ancient wisdom, modern guidance</div>
        <h1 className="section-title">Astrology Services</h1>
        <div className="divider" />
        <p className={styles.sub}>
          Our panel of 50+ certified Vedic astrologers provide personalised guidance for every aspect of your life.
        </p>
      </div>

      <div className={styles.cards}>
        {SERVICES.map(s => (
          <div key={s.name} className={styles.card}>
            <span className={styles.icon}>{s.emoji}</span>
            <div className={styles.name}>{s.name}</div>
            <p className={styles.desc}>{s.desc}</p>
            <div className={styles.price}>{s.price}</div>
            <button
              className="btn-primary"
              style={{ marginTop: '1.5rem', fontSize: '0.8rem', padding: '0.7rem 1.5rem' }}
              onClick={() => openModal(s)}
            >
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
            { n: '01', title: 'Book a Session',      text: 'Choose your service and select a time slot. Provide your birth details securely.' },
            { n: '02', title: 'Expert Analysis',     text: 'Our astrologer studies your Kundali in depth before the consultation.' },
            { n: '03', title: 'Live Consultation',   text: 'Connect via video/call. Get personalised guidance and answers to your questions.' },
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

      {/* ── BOOKING MODAL ── */}
      {modal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button className={styles.modalClose} onClick={closeModal} aria-label="Close">✕</button>

            {step === 'form' && (
              <>
                <div className={styles.modalHeader}>
                  <span className={styles.modalEmoji}>{modal.emoji}</span>
                  <h2 className={styles.modalTitle}>{modal.name}</h2>
                  <p className={styles.modalPrice}>{modal.price}</p>
                </div>

                {error && <p className={styles.modalError}>{error}</p>}

                <form className={styles.modalForm} onSubmit={handleBook}>
                  <div className={styles.mRow2}>
                    <label className={styles.mLabel}>
                      Full Name <span className={styles.req}>*</span>
                      <input className={styles.mInput} value={form.name} onChange={set('name')} placeholder="Ayansh Pandey" />
                    </label>
                    <label className={styles.mLabel}>
                      Email <span className={styles.req}>*</span>
                      <input className={styles.mInput} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                    </label>
                  </div>

                  <div className={styles.mRow2}>
                    <label className={styles.mLabel}>
                      Preferred Date <span className={styles.req}>*</span>
                      <input className={styles.mInput} type="date" value={form.date} onChange={set('date')} min={today} />
                    </label>
                    <label className={styles.mLabel}>
                      Preferred Time <span className={styles.req}>*</span>
                      <input className={styles.mInput} type="time" value={form.time} onChange={set('time')} />
                    </label>
                  </div>

                  <div className={styles.mSectionLabel}>
                    ✦ Birth Details <span className={styles.mOptional}>(for accurate reading)</span>
                  </div>

                  <div className={styles.mRow2}>
                    <label className={styles.mLabel}>
                      Date of Birth
                      <input className={styles.mInput} type="date" value={form.dob} onChange={set('dob')} />
                    </label>
                    <label className={styles.mLabel}>
                      Birth Time
                      <input className={styles.mInput} type="time" value={form.birthTime} onChange={set('birthTime')} />
                    </label>
                  </div>

                  <label className={styles.mLabel}>
                    Birth Place
                    <input className={styles.mInput} value={form.birthPlace} onChange={set('birthPlace')} placeholder="City, State, Country" />
                  </label>

                  <button type="submit" className={styles.mSubmit} disabled={loading}>
                    {loading
                      ? <span className={styles.spinner} />
                      : 'Confirm Booking'}
                  </button>
                </form>
              </>
            )}

            {step === 'success' && (
              <div className={styles.successBox}>
                <div className={styles.successStar}>✦</div>
                <h2 className={styles.successTitle}>Booking Confirmed!</h2>
                <p className={styles.successText}>
                  Your session for <strong>{modal.name}</strong> has been received.
                  Our astrologer will reach out to <strong>{form.email}</strong> within 24 hours to confirm your slot.
                </p>
                <p className={styles.bookingId}>
                  Booking ID: AST-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <button className={styles.mSubmit} onClick={closeModal}>
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}