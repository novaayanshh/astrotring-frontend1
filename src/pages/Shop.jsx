import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Footer from '../components/layout/Footer';
import styles from './Shop.module.css';

const CATS = ['All', 'Gemstone Rings', 'Bracelets', 'Rudraksha', 'Crystals', 'Yantras'];
const ZODIACS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

export default function Shop() {
  const location = useLocation();
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedZodiac, setSelectedZodiac] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    if (location.state?.filter) setSelectedCat(location.state.filter);
  }, [location.state]);

  let filtered = PRODUCTS.filter(p => {
    if (selectedCat !== 'All' && !p.cat.includes(selectedCat)) return false;
    if (selectedZodiac !== 'All' && p.zodiac !== selectedZodiac && p.zodiac !== 'All') return false;
    if (p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ paddingTop: '64px' }}>
      <div className={styles.layout}>
        {/* FILTERS */}
        <aside className={styles.sidebar}>
          <div className={styles.filterTitle}>✦ Refine</div>

          <div className={styles.filterGroup}>
            <div className={styles.filterGroupLabel}>Category</div>
            {CATS.map(c => (
              <div key={c} className={`${styles.filterOpt} ${selectedCat === c ? styles.selected : ''}`}
                onClick={() => setSelectedCat(c)}>
                <div className={styles.filterCheck} />
                {c}
              </div>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterGroupLabel}>Zodiac</div>
            <div className={`${styles.filterOpt} ${selectedZodiac === 'All' ? styles.selected : ''}`}
              onClick={() => setSelectedZodiac('All')}>
              <div className={styles.filterCheck} /> All Signs
            </div>
            {ZODIACS.map(z => (
              <div key={z} className={`${styles.filterOpt} ${selectedZodiac === z ? styles.selected : ''}`}
                onClick={() => setSelectedZodiac(z)}>
                <div className={styles.filterCheck} /> {z}
              </div>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterGroupLabel}>Max Price</div>
            <input type="range" className={styles.priceRange} min={500} max={50000} step={500}
              value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
            <div className={styles.priceLabels}><span>₹500</span><span>₹{maxPrice.toLocaleString('en-IN')}</span></div>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filterGroupLabel}>Min Rating</div>
            {[0, 3, 4, 4.5].map(r => (
              <div key={r} className={`${styles.filterOpt} ${minRating === r ? styles.selected : ''}`}
                onClick={() => setMinRating(r)}>
                <div className={styles.filterCheck} />
                {r === 0 ? 'Any' : `★ ${r}+`}
              </div>
            ))}
          </div>

          <button className="btn-outline" style={{ width: '100%', fontSize: '0.78rem', padding: '0.6rem 1rem' }}
            onClick={() => { setSelectedCat('All'); setSelectedZodiac('All'); setMaxPrice(50000); setMinRating(0); }}>
            Clear Filters
          </button>
        </aside>

        {/* PRODUCTS */}
        <div>
          <div className={styles.shopHeader}>
            <div>
              <h1 className={styles.shopTitle}>{selectedCat === 'All' ? 'All Products' : selectedCat}</h1>
              <div className={styles.shopMeta}>Showing {filtered.length} products</div>
            </div>
            <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
              <p>No products match your filters.</p>
              <button className="btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setSelectedCat('All'); setSelectedZodiac('All'); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={styles.prodGrid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
