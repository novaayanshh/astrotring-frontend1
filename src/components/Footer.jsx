import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiZap,
} from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo"><FiZap size={16} style={{ marginRight: '0.4rem' }} /> Astrotring</div>
          <p className="footer-tagline">
            Bridging ancient Vedic wisdom with authentic gemstones â€” every piece energised for your unique cosmic journey.
          </p>
          <div className="footer-socials">
            <a href="#"><FiInstagram size={20} /></a>
            <a href="#"><FiYoutube size={20} /></a>
            <a href="mailto:info@astrotring.com"><FiMail size={20} /></a>
            <a href="tel:+911234567890"><FiPhone size={20} /></a>
          </div>
        </div>

        <div>
          <div className="footer-heading">Shop</div>
          <ul className="footer-links">
            {['Gemstone Rings', 'Bracelets', 'Rudraksha Malas', 'Crystals & DÃ©cor', 'Yantras'].map((l) => (
              <li key={l}><Link to="/shop">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            {['Kundali Reading', 'Gemstone Advice', 'Kundali Matching', 'Vastu Consultation', 'Annual Forecast'].map((l) => (
              <li key={l}><Link to="/services">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-heading">Help</div>
          <ul className="footer-links">
            {['About Us', 'Blog', 'Track Order', 'Return Policy', 'Contact Us'].map((l) => (
              <li key={l}><a href="#top">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Â© 2026 Astrotring. All rights reserved.</span>
        <span>Made with <FiZap size={14} style={{ margin: '0 0.25rem' }} /> for cosmic seekers</span>
      </div>
    </footer>
  );
}

