import React, { useState, useEffect } from 'react';
import { Product, Category, Order } from './types';
import { productService } from './services/api';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthModal } from './components/Modals/AuthModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { OrdersHistoryPage } from './pages/OrdersHistoryPage';
import { WishlistPage } from './pages/WishlistPage';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setServerError(null);
    try {
      const [cats, prods] = await Promise.all([
        productService.getCategories(),
        productService.getProducts(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err: any) {
      console.error('Failed to load backend data:', err);
      const status = err.response?.status;
      if (status >= 500) {
        setServerError(`Server Error (${status}): Could not load catalog data from the backend.`);
      } else if (!err.response) {
        setServerError('Network Error: Unable to connect to the backend server. Please verify the Django server is running.');
      } else {
        setServerError('An unexpected error occurred while loading catalog data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('catalog');
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setSearchQuery('');
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setCurrentPage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-fk-bg">
          <Navbar
            onSearch={handleSearch}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
          <main className="flex-1">
            {serverError && (
              <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-xs text-red-700 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold">⚠️ Warning:</span>
                  <span>{serverError}</span>
                </div>
                <button
                  onClick={fetchData}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-colors shadow-sm"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-fk-blue border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xs font-bold text-gray-600">Loading Experience...</p>
              </div>
            ) : (
              <>
                {currentPage === 'home' && (
                  <HomePage
                    products={products}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                    onSelectProduct={handleSelectProduct}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'catalog' && (
                  <CatalogPage
                    products={products}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                    onSelectCategory={handleSelectCategory}
                    onSelectProduct={handleSelectProduct}
                  />
                )}

                {currentPage === 'product-detail' && selectedProduct && (
                  <ProductDetailPage
                    product={selectedProduct}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'cart' && (
                  <CartPage
                    onNavigate={handleNavigate}
                    onSelectProduct={handleSelectProduct}
                  />
                )}

                {currentPage === 'checkout' && (
                  <CheckoutPage onOrderComplete={handleOrderComplete} />
                )}

                {currentPage === 'order-success' && completedOrder && (
                  <OrderSuccessPage
                    order={completedOrder}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'orders' && (
                  <OrdersHistoryPage onNavigate={handleNavigate} />
                )}

                {currentPage === 'wishlist' && (
                  <WishlistPage
                    onSelectProduct={handleSelectProduct}
                    onNavigate={handleNavigate}
                  />
                )}
              </>
            )}
          </main>
          <Footer />

          <Toast />
          <AuthModal />

        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
