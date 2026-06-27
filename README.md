# ✦ Astrotring Frontend

A full React + Vite e-commerce frontend for an astrology jewellery store.

## Tech Stack
- **React 19** + **Vite**
- **React Router v6** — page routing
- **CSS Modules** — scoped component styles
- **Context API** — cart & wishlist state management

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx / .module.css
│   │   ├── CartDrawer.jsx / .module.css
│   │   ├── Footer.jsx / .module.css
│   │   ├── StarfieldCanvas.jsx
│   │   └── Notification.jsx
│   └── ui/
│       └── ProductCard.jsx / .module.css
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── Home.jsx / .module.css
│   ├── Shop.jsx / .module.css
│   ├── ProductDetail.jsx / .module.css
│   ├── Services.jsx / .module.css
│   └── Account.jsx / .module.css
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Pages
| Route | Page |
|-------|------|
| `/` | Home — Hero, categories, featured products, birthstone quiz, testimonials |
| `/shop` | Shop — Filters (category, zodiac, price, rating), product grid, sort |
| `/product/:id` | Product Detail — Gallery, qty selector, add to cart, related products |
| `/services` | Services — 6 astrology consultation cards + booking |
| `/account` | Account — Orders, Wishlist, Profile, Kundali details |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Features
- ✦ Animated starfield canvas background
- 🛒 Full cart drawer (add, remove, update qty)
- ♡ Wishlist with heart toggle on all product cards
- 🔮 Birthstone quiz (select zodiac → get gem recommendation)
- 🔍 Product filters: category, zodiac, max price, min rating
- 📦 Product detail page with image gallery and related products
- 📱 Responsive layout (mobile-friendly)
- 🔔 Toast notifications for cart/wishlist actions
