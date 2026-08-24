import React from 'react';
import { Star, Heart, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-fk-card hover:shadow-fk-hover transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
      <div className="p-3 pb-0 flex items-center justify-between z-10">
        <span className="text-[11px] font-extrabold text-fk-green bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
          {product.discount_percentage}% OFF
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="p-1.5 rounded-full bg-white/80 hover:bg-gray-100 shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

  
      <div 
        onClick={() => onSelectProduct(product)}
        className="cursor-pointer p-4 flex items-center justify-center h-48 sm:h-52 bg-white group-hover:scale-105 transition-transform duration-300 relative"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      <div className="p-4 pt-1 flex-1 flex flex-col justify-between border-t border-gray-50 bg-white">
        <div>
      
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
            {product.brand}
          </div>
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 hover:text-fk-blue cursor-pointer leading-snug mb-2"
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-sm">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-white stroke-none" />
            </div>
            <span className="text-[11px] text-gray-400 font-medium">({product.review_count})</span>

            <div className="ml-auto inline-flex items-center gap-0.5 text-[10px] font-extrabold text-fk-blue italic">
              <span>Assured</span>
              <CheckCircle2 className="w-3 h-3 text-fk-blue fill-fk-yellow" />
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-gray-900">
                ₹{product.discount_price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400 line-through font-normal">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-[10px] font-bold text-fk-green">Free delivery</div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-fk-yellow hover:bg-yellow-400 text-fk-textDark rounded-sm shadow-sm transition-transform active:scale-90 flex items-center justify-center font-bold text-xs"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>

    </div>
  );
};
