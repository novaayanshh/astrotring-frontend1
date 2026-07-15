import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiClipboard, FiCompass, FiHeart, FiRefreshCw, FiShield, FiShoppingCart, FiZap, FiStar, FiTruck } from 'react-icons/fi';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import Footer from '../components/layout/Footer';
import styles from './ProductDetail.module.css';

const THUMBS = [<FiZap />, <FiStar />, <FiCompass />, <FiBookOpen />];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!product) return (
    <div style={{ paddingTop: '120px', textAlign: 'center', color: 'var(--parchment-muted)' }}>
      <p>Product not found.</p>
      <button className="btn-outline" style={{ marginTop: '1rem' }} onClick={() => navigate('/shop')}>Back to Shop</button>
    </div>
  );

  const inWishlist = wishlist.find(x => x.id === product.id);
  const thumbIcons = [product.emoji, ...THUMBS];
  const saving = product.old - product.price;
  const savingPct = Math.round((saving / product.old) * 100);

  return (
    <div style={{ paddingTop: '64px' }}>
      <div className={styles.layout}>
        {/* GALLERY */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>{thumbIcons[activeThumb]}</div>
          <div className={styles.thumbs}>
            {thumbIcons.map((e, i) => (
              <div key={i} className={`${styles.thumb} ${activeThumb === i ? styles.activeThumb : ''}`}
                onClick={() => setActiveThumb(i)}>{e}</div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <div className={styles.breadcrumb}>
            <span onClick={() => navigate('/shop')} style={{ cursor: 'pointer', color: 'var(--gold)' }}>Shop</span>
            {' / '}{product.cat}{' / '}{product.name}
          </div>

          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{Array.from({ length: 5 }, (_, i) => <FiStar key={i} size={14} style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.35 }} />)}</span>
            <span className={styles.reviewCount}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className={styles.priceBlock}>
  <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
  <span className={styles.oldPrice}>₹{product.old.toLocaleString('en-IN')}</span>
  <div className={styles.saving}>You save ₹{saving.toLocaleString('en-IN')} ({savingPct}% off)</div>
</div>

          <p className={styles.desc}>{product.desc}</p>

          <div className={styles.tags}>
            {product.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={styles.qtyRow}>
            <span className={styles.qtyLabel}>Qty</span>
            <div className={styles.qtyCtrl}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>âˆ’</button>
              <span className={styles.qtyVal}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className={styles.stock}><FiZap size={14} style={{ marginRight: '0.3rem' }} /> In Stock</span>
          </div>

          <div className={styles.actions}>
            <button className="btn-cart" onClick={() => addToCart(product, qty)}>
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
            <button className={`btn-outline ${inWishlist ? styles.wishlisted : ''}`}
              onClick={() => toggleWishlist(product)}>
              {inWishlist ? <><FiHeart size={16} style={{ marginRight: '0.35rem' }} /> Wishlisted</> : <><FiHeart size={16} style={{ marginRight: '0.35rem' }} /> Wishlist</>}
            </button>
          </div>

          <div className={styles.perks}>
            {[
              [<FiShield />, 'GIA Lab Certified'],
              [<FiMoon />, 'Vedic Energised'],
              [<FiRefreshCw />, '30-day returns'],
              [<FiTruck />, 'Free shipping â‚¹999+'],
              [<FiClipboard />, 'Secure payment'],
              [<FiBookOpen />, 'Certificate included'],
            ].map(([icon, text]) => (
              <div key={text} className={styles.perk}><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className={`section ${styles.relatedSection}`} style={{ position: 'relative', zIndex: 1 }}>
        <div className="centered" style={{ marginBottom: '2rem' }}>
          <div className="section-label">You may also like</div>
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Related Products</h2>
        </div>
        <div className={styles.relatedGrid}>
          {PRODUCTS.filter(p => p.id !== product.id && p.cat === product.cat).slice(0, 4).map(p => (
            <div key={p.id} className={styles.relatedCard} onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0,0); }}>
              <div className={styles.relatedImg}>{p.emoji}</div>
              <div style={{ padding: '1rem' }}>
                <div style={{ fontFamily: 'Cinzel,serif', fontSize: '0.9rem', color: 'var(--white)', marginBottom: '0.5rem' }}>{p.name}</div>
                <div style={{ color: 'var(--gold)' }}>â‚¹{p.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

