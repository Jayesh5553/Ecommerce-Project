import React from 'react';
import { Smartphone, Laptop, Shirt, Home as HomeIcon, Tv, Sparkles, Plane, Tag } from 'lucide-react';
import { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

const defaultCategoryIcons: Record<string, any> = {
  'mobiles': Smartphone,
  'electronics': Laptop,
  'fashion': Shirt,
  'home-furniture': HomeIcon,
  'appliances': Tv,
  'beauty-toys': Sparkles,
};

export const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm py-3 mb-3 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-w-max gap-4 sm:gap-8">
    
        <div
          onClick={() => onSelectCategory('')}
          className={`flex flex-col items-center cursor-pointer group px-2 py-1 transition-all ${
            selectedCategory === '' ? 'text-fk-blue font-bold scale-105' : 'text-gray-700 hover:text-fk-blue'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-1 group-hover:bg-blue-100 group-hover:scale-110 transition-all shadow-sm">
            <Tag className="w-6 h-6 text-fk-blue" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-center">Top Offers</span>
        </div>

        {categories.map((cat) => {
          const IconComponent = defaultCategoryIcons[cat.slug] || Sparkles;
          const isSelected = selectedCategory === cat.slug;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex flex-col items-center cursor-pointer group px-2 py-1 transition-all ${
                isSelected ? 'text-fk-blue font-bold scale-105' : 'text-gray-700 hover:text-fk-blue'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-1 overflow-hidden group-hover:bg-blue-50 group-hover:scale-110 transition-all shadow-sm border border-gray-100">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <IconComponent className="w-6 h-6 text-fk-blue" />
                )}
              </div>
              <span className="text-xs font-medium tracking-tight text-center max-w-[90px] truncate">
                {cat.name}
              </span>
            </div>
          );
        })}

        <div
          onClick={() => onSelectCategory('mobiles')}
          className="flex flex-col items-center cursor-pointer group px-2 py-1 text-gray-700 hover:text-fk-blue transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-1 group-hover:bg-yellow-100 group-hover:scale-110 transition-all shadow-sm">
            <Plane className="w-6 h-6 text-fk-yellow" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-center">Flights & Travel</span>
        </div>

      </div>
    </div>
  );
};
