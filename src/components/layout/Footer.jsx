import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>✦ Astrotring</div>
          <p className={styles.tagline}>
            Bridging ancient Vedic wisdom with authentic gemstones — every piece energised for your unique cosmic journey.
          </p>
        </div>
        <div>
          <div className={styles.heading}>Shop</div>
          <ul className={styles.links}>
            <li><Link to="/shop">Gemstone Rings</Link></li>
            <li><Link to="/shop">Bracelets</Link></li>
            <li><Link to="/shop">Rudraksha Malas</Link></li>
            <li><Link to="/shop">Crystals &amp; Décor</Link></li>
            <li><Link to="/shop">Yantras</Link></li>
          </ul>
        </div>
        <div>
          <div className={styles.heading}>Services</div>
          <ul className={styles.links}>
            <li><Link to="/services">Kundali Reading</Link></li>
            <li><Link to="/services">Gemstone Advice</Link></li>
            <li><Link to="/services">Kundali Matching</Link></li>
            <li><Link to="/services">Vastu Consultation</Link></li>
          </ul>
        </div>
        <div>
          <div className={styles.heading}>Help</div>
          <ul className={styles.links}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        © 2026 Astrotring. All rights reserved. Made with ✦ for cosmic seekers.
      </div>
    </footer>
  );
}
