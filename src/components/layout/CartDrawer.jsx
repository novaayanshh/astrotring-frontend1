import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';
export default function CartDrawer() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, isCartOpen, setIsCartOpen, removeFromCart, updateQty, showNotif } = useCart();
  const close = () => setIsCartOpen(false);
  return (
    <>
      {isCartOpen && <div className={styles.overlay} onClick={close} />}
      <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.head}>
          <span className={styles.headTitle}>Your Cart</span>
          <button className={styles.closeBtn} onClick={close}>✕</button>
        </div>
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p>Your cart awaits the stars</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImg}>{item.emoji}</div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</div>
                  <div className={styles.qtyRow}>
                    <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className={styles.qtyVal}>{item.qty}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.foot}>
            <div className={styles.total}>
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', marginBottom: '0.75rem' }}
              onClick={() => {
                showNotif('✦ Proceeding to checkout…');
                close();
                navigate('/checkout');
              }}
            >
              Proceed to Checkout
            </button>
            <button className="btn-outline" style={{ width: '100%' }} onClick={close}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
