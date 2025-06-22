import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import VendorRegistration from './pages/VendorRegistration';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AdminProvider } from './context/AdminContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AdminProvider>
      <ProductProvider>
        <SearchProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/vendor/register" element={<VendorRegistration />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </SearchProvider>
      </ProductProvider>
    </AdminProvider>
  );
}

export default App; 