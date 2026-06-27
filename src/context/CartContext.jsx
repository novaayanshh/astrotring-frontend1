import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState('');
  const [notifVisible, setNotifVisible] = useState(false);

  const showNotif = useCallback((msg) => {
    setNotification(msg);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 2800);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(x => x.id === product.id);
      if (existing) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + qty } : x);
      return [...prev, { ...product, qty }];
    });
    showNotif(`✦ ${product.name} added to cart`);
  }, [showNotif]);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(x => x.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCartItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(x => x.id === product.id);
      if (exists) { showNotif('✦ Removed from wishlist'); return prev.filter(x => x.id !== product.id); }
      showNotif('✦ Added to wishlist');
      return [...prev, product];
    });
  }, [showNotif]);

  const cartTotal = cartItems.reduce((s, x) => s + x.price * x.qty, 0);
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal,
      isCartOpen, setIsCartOpen,
      wishlist,
      notification, notifVisible,
      addToCart, removeFromCart, updateQty, toggleWishlist, showNotif,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
