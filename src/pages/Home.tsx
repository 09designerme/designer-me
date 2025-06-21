import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

// Sample featured products
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Elegant desk lamp with adjustable brightness",
    category: "Lighting"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Comfortable office chair with lumbar support",
    category: "Furniture"
  },
  {
    id: 3,
    name: "Wireless Bluetooth Speaker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Portable speaker with crystal clear sound",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Designer Coffee Mug",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Ceramic mug with unique geometric design",
    category: "Kitchen"
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="card p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-primary-600">${product.price}</span>
        <button
          onClick={() => addItem(product)}
          className="btn-primary flex items-center space-x-1"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Design Your Perfect Space
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover premium design products that transform your home and office
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Designer Me?
            </h2>
            <p className="text-lg text-gray-600">
              We offer the best in design, quality, and customer service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Every product is carefully selected for its design and quality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Free shipping on orders over $50 with quick delivery
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return within 30 days for a full refund
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular items that customers love
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-lg px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of satisfied customers who have upgraded their homes with our products
          </p>
          <Link to="/products" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Start Shopping Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 