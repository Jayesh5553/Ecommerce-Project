import React, { useState } from 'react';
import { Search, ShoppingCart, User as UserIcon, Heart, Package, LogOut, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, onNavigate, currentPage }) => {
  const { user, logout, setShowAuthModal } = useAuth();
  const { totalItems, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onNavigate('catalog');
  };

  return (
    <header className="sticky top-0 z-50 bg-fk-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          <div 
            onClick={() => { onSearch(''); onNavigate('home'); }} 
            className="cursor-pointer flex flex-col justify-center select-none group"
          >
            <div className="flex items-center gap-1">
              <span className="font-extrabold italic text-2xl tracking-wide text-white group-hover:opacity-95 transition-opacity">
                Shop<span className="text-fk-yellow">Kart</span>
              </span>
            </div>
            <span className="text-[10px] text-gray-200 hover:underline italic font-medium -mt-0.5">
              Online Shopping Store
            </span>
          </div>

    
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 max-w-2xl relative flex items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full py-2 pl-4 pr-11 text-sm text-gray-900 bg-white rounded-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 shadow-inner"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 bottom-0 px-3 text-fk-blue hover:text-fk-darkBlue transition-colors flex items-center justify-center"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>
     
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
            <div className="hidden lg:flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-sm cursor-pointer transition-all border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-fk-yellow" />
              <div>
                <div className="text-[10px] text-gray-200 leading-none">Deliver to</div>
                <div className="font-bold text-white leading-tight">400001 Mumbai</div>
              </div>
            </div>

            <div className="relative">
              {user ? (
                <div 
                  onMouseEnter={() => setShowUserDropdown(true)}
                  onMouseLeave={() => setShowUserDropdown(false)}
                  className="relative py-1"
                >
                  <button 
                    className="flex items-center gap-1 px-4 py-1.5 bg-white text-fk-blue font-bold rounded-sm hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <UserIcon className="w-4 h-4 fill-fk-blue" />
                    <span>{user.first_name || user.username}</span>
                    <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 top-full pt-1 w-48 z-50">
                      <div className="bg-white text-gray-800 rounded-sm shadow-xl border border-gray-100 py-1 font-normal divide-y divide-gray-100 animate-in fade-in duration-150">
                        <div className="py-1">
                          <button
                            onClick={() => { onNavigate('orders'); setShowUserDropdown(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-2.5 text-xs text-gray-700"
                          >
                            <Package className="w-4 h-4 text-fk-blue" />
                            <span>My Orders</span>
                          </button>
                          <button
                            onClick={() => { onNavigate('wishlist'); setShowUserDropdown(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-2.5 text-xs text-gray-700"
                          >
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>Wishlist ({wishlist.length})</span>
                          </button>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => { logout(); setShowUserDropdown(false); }}
                            className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2.5 text-xs font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-5 py-1.5 bg-white text-fk-blue font-bold rounded-sm hover:bg-gray-100 transition-all shadow-sm active:scale-95"
                >
                  Login
                </button>
              )}
            </div>

            <button
              onClick={() => onNavigate('wishlist')}
              className="hidden sm:flex items-center gap-1 hover:text-fk-yellow transition-colors relative py-1"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="hidden md:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center gap-1.5 font-bold hover:text-fk-yellow transition-colors relative py-1"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-fk-yellow text-fk-textDark text-[11px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
