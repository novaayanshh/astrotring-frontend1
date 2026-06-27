import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const inWishlist = wishlist.find(x => x.id === product.id);

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      <div className={styles.imgWrap}>
        <span className={styles.emoji}>{product.emoji}</span>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <button
          className={`${styles.wishBtn} ${inWishlist ? styles.wishlisted : ''}`}
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '♥' : '♡'}
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.cat}>{product.cat}</div>
        <div className={styles.stars}>
          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.footer}>
          <div>
            <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            <span className={styles.oldPrice}>₹{product.old.toLocaleString('en-IN')}</span>
          </div>
          <button
            className={styles.cartBtn}
            onClick={e => { e.stopPropagation(); addToCart(product); }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}
