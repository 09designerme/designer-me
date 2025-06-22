import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './CartContext';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
  getProductById: (id: number) => Product | undefined;
  getProductsByVendor: (vendorId: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

// Initial products data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Elegant desk lamp with adjustable brightness",
    category: "Lighting",
    vendorId: "vendor1"
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Comfortable office chair with lumbar support",
    category: "Furniture",
    vendorId: "vendor2"
  },
  {
    id: 3,
    name: "Wireless Bluetooth Speaker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "Portable speaker with crystal clear sound",
    category: "Electronics",
    vendorId: "vendor1"
  },
  {
    id: 4,
    name: "Designer Coffee Mug",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Ceramic mug with unique geometric design",
    category: "Kitchen",
    vendorId: "vendor3"
  },
  {
    id: 5,
    name: "Wall Art Canvas",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    description: "Abstract wall art to enhance your space",
    category: "Decor",
    vendorId: "vendor2"
  },
  {
    id: 6,
    name: "Smart Home Hub",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Control your home with voice commands",
    category: "Electronics",
    vendorId: "vendor1"
  },
  {
    id: 7,
    name: "Plant Stand",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    description: "Modern plant stand for indoor greenery",
    category: "Decor",
    vendorId: "vendor3"
  },
  {
    id: 8,
    name: "Kitchen Mixer",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Professional kitchen mixer for baking",
    category: "Kitchen",
    vendorId: "vendor2"
  }
];

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = async (productData: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      
      setProducts(prev => [...prev, newProduct]);
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const updateProduct = async (id: number, productData: Partial<Product>): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(prev => prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      ));
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByVendor = (vendorId: string): Product[] => {
    return products.filter(product => product.vendorId === vendorId);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByVendor
    }}>
      {children}
    </ProductContext.Provider>
  );
}; 