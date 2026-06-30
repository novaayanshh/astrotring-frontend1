import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import StarfieldCanvas from './components/layout/StarfieldCanvas';
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/layout/CartDrawer';
import Notification from './components/layout/Notification';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Account from './pages/Account';
import './styles/global.css';
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <StarfieldCanvas />
        <Navbar />
        <CartDrawer />
        <Notification />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
