import axios from 'axios';
import { Product, Category, Cart, Order, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : '/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login/') &&
      !originalRequest.url?.includes('/auth/register/') &&
      !originalRequest.url?.includes('/auth/token/refresh/')
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          if (res.data.access) {
            localStorage.setItem('access_token', res.data.access);
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }

   
    if (error.response?.status && error.response.status >= 500) {
      console.error(`[Server Error ${error.response.status}] Endpoint: ${originalRequest?.url}`, error.response.data);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app:server-error', {
            detail: {
              status: error.response.status,
              url: originalRequest?.url,
              message: `Server Error (${error.response.status}): The server encountered an internal problem. Please try again.`,
            },
          })
        );
      }
    } else if (!error.response && error.request) {
      console.error(`[Network Error] Could not connect to backend server for ${originalRequest?.url}`);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app:network-error', {
            detail: {
              url: originalRequest?.url,
              message: 'Unable to connect to backend server. Please verify the server is running.',
            },
          })
        );
      }
    }

    return Promise.reject(error);
  }
);

export const productService = {
  getProducts: async (params?: Record<string, any>): Promise<Product[]> => {
    try {
      const response = await api.get('/products/', { params });
      return response.data.results || response.data;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  },

  getProductById: async (id: number): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}/`);
      return response.data;
    } catch (err) {
      console.error(`Error fetching product #${id}:`, err);
      return null;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories/');
      return response.data.results || response.data;
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  },

  addReview: async (productId: number, review: { user_name: string; rating: number; comment: string }) => {
    const response = await api.post(`/products/${productId}/reviews/`, review);
    return response.data;
  }
};

export const cartService = {
  getCart: async (): Promise<Cart> => {
    try {
      const response = await api.get('/cart/');
      return response.data;
    } catch (err) {
      return { id: 1, items: [], total_items: 0, total_price: 0 };
    }
  },

  addToCart: async (productId: number, quantity: number = 1): Promise<Cart> => {
    const response = await api.post('/cart/', { product_id: productId, quantity });
    return response.data;
  },

  updateCartItem: async (itemId: number, quantity: number): Promise<Cart> => {
    const response = await api.put('/cart/', { item_id: itemId, quantity });
    return response.data;
  },

  removeFromCart: async (itemId: number): Promise<Cart> => {
    const response = await api.delete('/cart/', { data: { item_id: itemId } });
    return response.data;
  },

  clearCart: async (): Promise<Cart> => {
    const response = await api.delete('/cart/');
    return response.data;
  }
};

export const orderService = {
  createOrder: async (orderData: any): Promise<Order> => {
    const response = await api.post('/checkout/', orderData);
    return response.data;
  },

  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get('/orders/');
      return response.data.results || response.data;
    } catch (err) {
      return [];
    }
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const response = await api.get(`/orders/${orderId}/`);
      return response.data;
    } catch (err) {
      return null;
    }
  }
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login/', credentials);
    if (response.data && response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
    }
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  getProfile: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (err) {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

export default api;
