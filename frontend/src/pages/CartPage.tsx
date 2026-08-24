import React from 'react';
import { Trash2, Plus, Minus, ShieldCheck, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const {
    items,
    totalItems,
    totalMrp,
    totalDiscountPrice,
    totalSavings,
    deliveryFee,
    finalAmount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-sm border border-gray-200 p-12 shadow-sm max-w-md mx-auto">
          <ShoppingBag className="w-20 h-20 text-fk-blue mx-auto mb-4 stroke-[1.5]" />
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Your Cart is Empty!</h2>
          <p className="text-xs text-gray-500 mb-6">
            Explore our vast range of products and discover unbelievable deals!
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 bg-fk-blue hover:bg-fk-darkBlue text-white font-extrabold text-xs uppercase rounded-sm shadow-md transition-colors tracking-wider"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 flex items-center justify-between">
            <h2 className="font-bold text-base text-gray-900">
              My Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
            </h2>
            <span className="text-xs font-semibold text-gray-500">Deliver to: <strong className="text-gray-900">400001 Mumbai</strong></span>
          </div>
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div 
                  onClick={() => onSelectProduct(item.product)}
                  className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 border border-gray-100 rounded p-2 bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <img src={item.product.image_url} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.product.brand}</span>
                  <h3 
                    onClick={() => onSelectProduct(item.product)}
                    className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-fk-blue cursor-pointer truncate mb-1"
                  >
                    {item.product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base font-extrabold text-gray-900">
                      ₹{item.product.discount_price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-fk-green">
                      {item.product.discount_percentage}% Off
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>REMOVE</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}

            <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-end sticky bottom-0 z-10 shadow-lg">
              <button
                onClick={() => onNavigate('checkout')}
                className="py-3 px-8 bg-fk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase rounded-sm shadow-md transition-transform active:scale-95 tracking-wider flex items-center gap-2"
              >
                <span>PLACE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
        <div className="lg:col-span-4 sticky top-20">
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 text-xs">
            
            <h3 className="font-bold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-100 text-[11px]">
              PRICE DETAILS
            </h3>

            <div className="py-4 space-y-3 border-b border-gray-100 text-gray-700">
              <div className="flex justify-between">
                <span>Price ({totalItems} items)</span>
                <span className="font-medium">₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-fk-green">
                <span>Discount</span>
                <span className="font-bold">- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-fk-green">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
            </div>

            <div className="py-4 border-b border-gray-100 flex justify-between items-center text-sm font-extrabold text-gray-900">
              <span>Total Amount</span>
              <span>₹{finalAmount.toLocaleString('en-IN')}</span>
            </div>

            {totalSavings > 0 && (
              <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-fk-green font-bold text-[11px] rounded-sm text-center">
                You will save ₹{totalSavings.toLocaleString('en-IN')} on this order
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-fk-blue" />
              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
