import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();

  const discount = Math.round(((product.old - product.price) / product.old) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    showToast('Added to Wishlist');
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/product/${product.id}`)}
      aria-label={`View ${product.name}`}
    >
      <div className="pc-image">
        <span className="pc-emoji">{product.emoji}</span>
        {product.badge && (
          <span className="pc-badge">{product.badge}</span>
        )}
        {!product.inStock && (
          <span className="pc-badge pc-badge-oos">Out of Stock</span>
        )}
        <button
          className="pc-wishlist"
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <FiHeart size={18} />
        </button>
        {discount > 0 && (
          <span className="pc-discount">−{discount}%</span>
        )}
      </div>

      <div className="pc-info">
        <div className="pc-category">{product.cat}</div>
        <div className="pc-stars">
          <FiStar size={14} />
          <span>{product.rating.toFixed(1)}</span>
          <span className="pc-review-count">({product.reviews})</span>
        </div>
        <div className="pc-name">{product.name}</div>
        <div className="pc-footer">
          <div className="pc-price-block">
            <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="pc-old-price">₹{product.old.toLocaleString('en-IN')}</span>
          </div>
          <button
            className="pc-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? '+ Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
