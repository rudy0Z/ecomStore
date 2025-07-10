
# Shop Smart – Explore Easily

An elegant, modern e-commerce web app for discovering, filtering, and shopping products with a seamless user experience.

## ✨ Features

- **Landing Page:** Eye-catching hero section, featured products, and quick add-to-cart.
- **Product Catalog:**
  - Browse by categories, offers, or search.
  - Grid/List view toggle.
  - Advanced filtering (category, price, rating, in-stock).
  - Sorting (featured, price, rating, newest).
- **Product Details:**
  - Modal with images, price, discount, description, and add-to-cart.
  - Wishlist and quick actions.
- **Shopping Cart:**
  - Slide-in cart sidebar with item management.
  - Update quantity, remove items, clear cart.
  - Cart summary and checkout button.
- **Checkout Flow:**
  - Multi-step checkout (cart, shipping, payment, confirmation).
  - Address and payment form (UI only, no real payment integration).
- **Wishlist:**
  - Add/remove products to wishlist.
  - Move items from wishlist to cart.
- **User Profile:**
  - View and edit profile info.
  - Tabs for orders, wishlist, and payment methods (UI only).
- **Offers & Flash Sales:**
  - Dedicated offers page with featured deals and flash sales.
- **Responsive Design:**
  - Fully mobile-friendly and accessible.
- **Modern UI:**
  - Built with React, Vite, shadcn-ui, and Tailwind CSS.
  - Custom toasts, dialogs, carousels, and more.

## 🚀 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📁 Project Structure

- `src/pages/` – Main pages (Landing, Categories, Offers, Wishlist, Profile, Checkout)
- `src/components/` – UI and store components (ProductCard, ShoppingCart, etc.)
- `src/contexts/` – App-wide state management (cart, wishlist, user)
- `src/data/` – Mock product data
- `src/hooks/` – Custom React hooks
- `src/lib/` – Utility functions

## 📦 Features in Detail

- **Product Browsing:**
  - Search, filter, and sort products easily.
  - View product details in a modal without leaving the page.
- **Cart & Wishlist:**
  - Add, remove, and update items in cart and wishlist.
  - Cart sidebar for quick access.
- **Checkout:**
  - Multi-step checkout UI (cart, shipping, payment, confirmation).
- **User Profile:**
  - Edit profile, view orders and wishlist (UI only).
- **Offers:**
  - See current deals and flash sales.

---

> **Note:** This project is for demo/educational purposes. No real payment or authentication is implemented.
