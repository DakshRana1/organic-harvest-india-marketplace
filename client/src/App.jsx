import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="*" element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center bg-surface text-center px-4">
                <div>
                  <span className="material-symbols-outlined text-[96px] text-outline mb-4 block">sentiment_dissatisfied</span>
                  <h1 className="font-serif text-display-lg text-primary mb-4">404</h1>
                  <p className="font-sans text-body-lg text-on-surface-variant mb-8">This page seems to have gone back to the farm.</p>
                  <a href="/" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-sans font-semibold hover:bg-secondary transition-colors shadow-xl">
                    Back to Home
                  </a>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
