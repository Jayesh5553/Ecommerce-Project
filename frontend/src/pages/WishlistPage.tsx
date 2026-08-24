import React from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface WishlistPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onSelectProduct, onNavigate }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-sm border border-gray-200 p-12 shadow-sm max-w-md mx-auto">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-500 mb-6">Save items that you like to view them later.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-2.5 bg-fk-blue text-white font-bold text-xs rounded-sm hover:bg-fk-darkBlue shadow"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        <span>My Wishlist ({wishlist.length})</span>
      </h1>

      <div className="bg-white rounded-sm border border-gray-200 shadow-sm divide-y divide-gray-100">
        {wishlist.map((prod) => (
          <div key={prod.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            
            <div 
              onClick={() => onSelectProduct(prod)}
              className="w-20 h-20 border border-gray-100 p-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform bg-white flex-shrink-0"
            >
              <img src={prod.image_url} alt={prod.name} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{prod.brand}</span>
              <h3 
                onClick={() => onSelectProduct(prod)}
                className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-fk-blue cursor-pointer truncate"
              >
                {prod.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-extrabold text-gray-900">₹{prod.discount_price.toLocaleString('en-IN')}</span>
                <span className="text-xs text-gray-400 line-through">₹{prod.price.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-fk-green">{prod.discount_percentage}% Off</span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => addToCart(prod)}
                className="px-4 py-2 bg-fk-yellow hover:bg-yellow-400 text-fk-textDark font-extrabold text-xs rounded-sm shadow-sm flex items-center gap-1.5"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>Move to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(prod)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
