import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Designer Me</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            {/* Mobile Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 