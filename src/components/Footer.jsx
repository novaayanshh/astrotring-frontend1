import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiChevronRight,
} from 'react-icons/fi';
import './Footer.css';

const socialLinks = [
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/' },
  { icon: <FaTiktok />, label: 'TikTok', href: 'https://www.tiktok.com/' },
  { icon: <FaYoutube />, label: 'YouTube', href: 'https://www.youtube.com/' },
  { icon: <FaEnvelope />, label: 'Email', href: 'mailto:hello@astrotring.com' },
];

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
            <a href="#"><FiInstagram size={20} /></a>
            <a href="#"><FiYoutube size={20} /></a>
            <a href="mailto:info@astrotring.com"><FiMail size={20} /></a>
            <a href="tel:+911234567890"><FiPhone size={20} /></a>
          </div>
        </div>

        <div>
          <div className="footer-heading">Shop</div>
          <ul className="footer-links">
            {['Gemstone Rings', 'Bracelets', 'Rudraksha Malas', 'Crystals & Décor', 'Yantras'].map((l) => (
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
        <span>© 2026 Astrotring. All rights reserved.</span>
        <span>Made with ✦ for cosmic seekers</span>
      </div>
    </footer>
  );
}
