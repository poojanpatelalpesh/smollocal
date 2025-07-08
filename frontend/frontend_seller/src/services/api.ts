const API_BASE_URL = 'http://localhost:7890/api';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Seller {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  address: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  seller: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  _id: string;
  seller: string;
  products: Array<{
    productId: string | Product | null;
    quantity: number;
  }>;
  customer?: Customer;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  status: 'pending' | 'approved' | 'denied' | 'paid';
  denialReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ token: string; seller: Seller }> => {
    const response = await fetch(`${API_BASE_URL}/sellers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    const { token, ...sellerData } = data;
    return { token, seller: sellerData };
  },

  register: async (sellerData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    businessName: string;
    address: string;
  }): Promise<{ token: string; seller: Seller }> => {
    const response = await fetch(`${API_BASE_URL}/sellers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sellerData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await response.json();
    const { token, ...sellerInfo } = data;
    return { token, seller: sellerInfo };
  },

  getProfile: async (token: string): Promise<Seller> => {
    const response = await fetch(`${API_BASE_URL}/sellers/profile`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }
    
    return response.json();
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async (token: string): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch categories');
    }
    
    return response.json();
  },

  create: async (token: string, name: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }
    
    return response.json();
  },

  update: async (token: string, id: string, name: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update category');
    }
    
    return response.json();
  },

  delete: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete category');
    }
  },
};

// Products API
export const productsAPI = {
  getAll: async (token: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch products');
    }
    
    return response.json();
  },

  create: async (token: string, productData: FormData): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      body: productData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }
    
    return response.json();
  },

  update: async (token: string, id: string, productData: FormData): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
      body: productData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update product');
    }
    
    return response.json();
  },

  delete: async (token: string, id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (token: string): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch orders');
    }
    
    return response.json();
  },

  updateStatus: async (token: string, id: string, status: string, denialReason?: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status, denialReason }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update order');
    }
    
    return response.json();
  },
};

// QR API
export const qrAPI = {
  generateQR: async (token: string): Promise<{ qrImage: string; storeUrl: string }> => {
    const response = await fetch(`${API_BASE_URL}/qr/seller/qr`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate QR code');
    }
    
    return response.json();
  },
};

// Customers API
export const customersAPI = {
  getCount: async (token: string): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/customers/count`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch customer count');
    }
    const data = await response.json();
    return data.count;
  },
};

// Utility functions
export const getAuthToken = (): string | null => {
  return localStorage.getItem('sellerToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('sellerToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('sellerToken');
}; 