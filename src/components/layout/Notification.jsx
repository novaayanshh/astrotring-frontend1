import { useCart } from '../../context/CartContext';

export default function Notification() {
  const { notification, notifVisible } = useCart();
  return (
    <div className={`notif ${notifVisible ? 'show' : ''}`}>
      {notification}
    </div>
  );
}
