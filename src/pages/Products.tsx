import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Filter, SortAsc, Grid, List } from 'lucide-react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useProducts } from '../context/ProductContext';

const categories = ["All", "Lighting", "Furniture", "Electronics", "Kitchen", "Decor"];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const { products } = useProducts();
  const [searchParams] = useSearchParams();

  // Handle search from URL parameters
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(decodeURIComponent(searchFromUrl));
    }
  }, [searchParams, setSearchQuery]);

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="card p-4">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4 hover:opacity-90 transition-opacity"
        />
      </Link>
      <h3 className="text-lg font-semibold mb-2">
        <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
          {product.name}
        </Link>
      </h3>
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

  const ProductListItem: React.FC<{ product: Product }> = ({ product }) => (
    <div className="card p-6 flex items-center space-x-6">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <span className="text-sm text-gray-500">{product.category}</span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary-600 mb-4">${product.price}</div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Discover our collection of premium design products</p>
        {searchQuery && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Search results for: "{searchQuery}"</span>
            <button
              onClick={clearSearch}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        {/* Category Filter */}
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <SortAsc className="h-5 w-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field py-1 px-3 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? `No products match "${searchQuery}". Try adjusting your search terms or filters.`
              : "Try adjusting your filters or search terms"
            }
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              clearSearch();
            }}
            className="btn-primary"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products; 