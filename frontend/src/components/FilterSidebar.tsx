import React from 'react';
import { Filter, RotateCcw, Star } from 'lucide-react';
import { Category, FilterState } from '../types';

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableBrands: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  availableBrands,
}) => {

  const handleBrandToggle = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ brands: nextBrands });
  };

  return (
    <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 text-xs">
      
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 uppercase tracking-wide">
          <Filter className="w-4 h-4 text-fk-blue" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-fk-blue hover:underline text-[11px] font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2 text-[11px]">
          Categories
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <div
            onClick={() => onFilterChange({ category: '' })}
            className={`cursor-pointer px-2 py-1.5 rounded-sm transition-colors ${
              filters.category === '' ? 'bg-blue-50 text-fk-blue font-bold' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Categories
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.slug })}
              className={`cursor-pointer px-2 py-1.5 rounded-sm transition-colors ${
                filters.category === cat.slug ? 'bg-blue-50 text-fk-blue font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2 text-[11px]">
          Price Range
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="200000"
            step="5000"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-fk-blue cursor-pointer"
          />
          <div className="flex items-center justify-between text-gray-600 font-semibold">
            <span>Min: ₹{filters.minPrice.toLocaleString('en-IN')}</span>
            <span>Max: ₹{filters.maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

  
      {availableBrands.length > 0 && (
        <div className="mb-5 border-b border-gray-100 pb-4">
          <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2 text-[11px]">
            Brand
          </h4>
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {availableBrands.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-fk-blue">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => handleBrandToggle(b)}
                  className="rounded border-gray-300 text-fk-blue focus:ring-fk-blue w-3.5 h-3.5 cursor-pointer"
                />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="mb-4">
        <h4 className="font-bold text-gray-800 uppercase tracking-wider mb-2 text-[11px]">
          Customer Ratings
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-fk-blue">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => onFilterChange({ minRating: rating })}
                className="text-fk-blue focus:ring-fk-blue w-3.5 h-3.5 cursor-pointer"
              />
              <span className="flex items-center gap-1 font-semibold">
                {rating} <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> & above
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};
