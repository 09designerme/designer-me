import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft, Heart } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

// Sample products data (same as Products page)
const allProducts: Product[] = [
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
  },
  {
    id: 5,
    name: "Wall Art Canvas",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    description: "Abstract wall art to enhance your space",
    category: "Decor"
  },
  {
    id: 6,
    name: "Smart Home Hub",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Control your home with voice commands",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Plant Stand",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    description: "Modern plant stand for indoor greenery",
    category: "Decor"
  },
  {
    id: 8,
    name: "Kitchen Mixer",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Professional kitchen mixer for baking",
    category: "Kitchen"
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const product = allProducts.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link to="/products" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-primary-600 font-medium">{product.category}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(4.8 out of 5)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary-600 mb-6">
            ${product.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input-field w-20"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 py-3"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted
                    ? "border-red-500 text-red-500 hover:bg-red-50"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Product Features */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                High-quality materials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Modern design
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                Easy to use
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                30-day return policy
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="card p-4">
                <Link to={`/product/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded-lg mb-4 hover:opacity-90 transition-opacity"
                  />
                </Link>
                <h3 className="font-semibold mb-2">
                  <Link to={`/product/${relatedProduct.id}`} className="hover:text-primary-600 transition-colors">
                    {relatedProduct.name}
                  </Link>
                </h3>
                <p className="text-primary-600 font-bold">${relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 