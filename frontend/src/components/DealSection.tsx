import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface DealSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const DealSection: React.FC<DealSectionProps> = ({ products, onSelectProduct, onViewAll }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.is_deal_of_the_day).slice(0, 6);

  if (dealProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 mb-6">
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-fk-orange text-white px-3 py-1.5 rounded-sm font-extrabold text-sm uppercase tracking-wide shadow-sm">
              <Flame className="w-4 h-4 fill-white" />
              <span>Deals of the Day</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-sm">
              <Timer className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Ends in</span>
              <span className="font-mono text-fk-textDark font-extrabold bg-gray-200 px-1.5 py-0.5 rounded text-[13px]">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-bold text-fk-blue hover:text-fk-darkBlue transition-colors group"
          >
            <span>VIEW ALL DEALS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {dealProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
