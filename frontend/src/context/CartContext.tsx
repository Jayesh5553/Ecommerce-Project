import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { cartService } from '../services/api';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface CartContextType {
  items: CartItem[];
  wishlist: Product[];
  totalItems: number;
  totalMrp: number;
  totalDiscountPrice: number;
  totalSavings: number;
  deliveryFee: number;
  finalAmount: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  toast: ToastData | null;
  toastMessage: string | null;
  showToast: (msg: string, type?: 'success' | 'error' | 'warning') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('wishlist_items', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Global listeners for 500 server errors & network errors dispatched by API interceptors
  useEffect(() => {
    const handleServerError = (e: any) => {
      const msg = e.detail?.message || 'Server encountered an internal error (500). Please try again.';
      showToast(msg, 'error');
    };

    const handleNetworkError = (e: any) => {
      const msg = e.detail?.message || 'Cannot connect to backend server. Please verify the server is running.';
      showToast(msg, 'error');
    };

    window.addEventListener('app:server-error', handleServerError);
    window.addEventListener('app:network-error', handleNetworkError);

    return () => {
      window.removeEventListener('app:server-error', handleServerError);
      window.removeEventListener('app:network-error', handleNetworkError);
    };
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: Date.now(), product, quantity }];
    });
    cartService.addToCart(product.id, quantity).catch(() => {});
    showToast(`Added '${product.name.slice(0, 24)}...' to Cart`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Added to Wishlist!');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalMrp = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalDiscountPrice = items.reduce((acc, item) => acc + item.product.discount_price * item.quantity, 0);
  const totalSavings = totalMrp - totalDiscountPrice;
  const deliveryFee = totalDiscountPrice >= 500 || totalDiscountPrice === 0 ? 0 : 40;
  const finalAmount = totalDiscountPrice + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        totalItems,
        totalMrp,
        totalDiscountPrice,
        totalSavings,
        deliveryFee,
        finalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toast,
        toastMessage: toast?.message || null,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
