import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <div className="footer-logo">✦ Astrotring</div>
          <p className="footer-tagline">
            Bridging ancient Vedic wisdom with authentic gemstones — every piece energised for your unique cosmic journey.
          </p>
          <div className="footer-socials">
            <span>📸</span><span>🐦</span><span>▶️</span><span>📘</span>
          </div>
        </div>

        <div>
          <div className="footer-heading">Shop</div>
          <ul className="footer-links">
            {['Gemstone Rings','Bracelets','Rudraksha Malas','Crystals & Décor','Yantras'].map(l => (
              <li key={l}><Link to="/shop">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-heading">Services</div>
          <ul className="footer-links">
            {['Kundali Reading','Gemstone Advice','Kundali Matching','Vastu Consultation','Annual Forecast'].map(l => (
              <li key={l}><Link to="/services">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-heading">Help</div>
          <ul className="footer-links">
            {['About Us','Blog','Track Order','Return Policy','Contact Us'].map(l => (
              <li key={l}><a href="#top">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Astrotring. All rights reserved.</span>
        <span>Made with ✦ for cosmic seekers</span>
      </div>
    </footer>
  );
}
