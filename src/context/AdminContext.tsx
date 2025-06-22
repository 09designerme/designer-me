import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'vendor';
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerVendor: (vendorData: VendorData) => Promise<boolean>;
}

interface VendorData {
  username: string;
  email: string;
  password: string;
  companyName: string;
  phone: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  // Mock admin credentials (in real app, this would be handled by backend)
  const mockAdmins = [
    { email: 'admin@designerme.com', password: 'admin123', role: 'admin' as const },
    { email: 'vendor@designerme.com', password: 'vendor123', role: 'vendor' as const }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundAdmin = mockAdmins.find(a => a.email === email && a.password === password);
    
    if (foundAdmin) {
      const adminData: Admin = {
        id: Date.now().toString(),
        username: email.split('@')[0],
        email: foundAdmin.email,
        role: foundAdmin.role
      };
      setAdmin(adminData);
      localStorage.setItem('admin', JSON.stringify(adminData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  const registerVendor = async (vendorData: VendorData): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send data to backend
    console.log('Registering vendor:', vendorData);
    
    // Simulate successful registration
    return true;
  };

  // Check for existing admin session on mount
  React.useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  return (
    <AdminContext.Provider value={{
      admin,
      isAuthenticated: !!admin,
      login,
      logout,
      registerVendor
    }}>
      {children}
    </AdminContext.Provider>
  );
}; 