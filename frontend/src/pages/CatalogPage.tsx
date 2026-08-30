import React, { useState, useMemo, useEffect } from 'react';
import { Product, Category, FilterState } from '../types';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, PackageSearch } from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  onSelectCategory: (slug: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  categories,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSelectProduct,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: selectedCategory,
    query: searchQuery,
    brands: [],
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
    sort: 'popularity',
    dealOnly: false,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: selectedCategory,
      query: searchQuery,
    }));
  }, [selectedCategory, searchQuery]);

  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category && p.category_slug !== filters.category) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (p.discount_price < filters.minPrice || p.discount_price > filters.maxPrice) return false;
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sort === 'price_low') return a.discount_price - b.discount_price;
      if (filters.sort === 'price_high') return b.discount_price - a.discount_price;
      if (filters.sort === 'rating') return b.rating - a.rating;
      if (filters.sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.review_count - a.review_count; // Popularity default
    });
  }, [products, filters, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white p-4 rounded-sm border border-gray-200 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 capitalize">
            {searchQuery ? `Search Results for "${searchQuery}"` : filters.category ? `${filters.category.replace('-', ' ')} Products` : 'All Products'}
          </h1>
          <span className="text-xs text-gray-500 font-medium">
            (Showing 1 – {filteredProducts.length} of {filteredProducts.length} items)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium self-stretch sm:self-auto overflow-x-auto">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Sort By:</span>
          {[
            { id: 'popularity', label: 'Popularity' },
            { id: 'price_low', label: 'Price -- Low to High' },
            { id: 'price_high', label: 'Price -- High to Low' },
            { id: 'rating', label: 'Customer Rating' },
            { id: 'newest', label: 'Newest' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilters((prev) => ({ ...prev, sort: tab.id }))}
              className={`px-3 py-1.5 rounded-sm transition-colors font-semibold ${
                filters.sort === tab.id
                  ? 'bg-fk-blue text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 sticky top-20">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onFilterChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
            onResetFilters={() => {
              setFilters({
                category: '',
                query: '',
                brands: [],
                minPrice: 0,
                maxPrice: 200000,
                minRating: 0,
                sort: 'popularity',
                dealOnly: false,
              });
              onSelectCategory('');
            }}
            availableBrands={availableBrands}
          />
        </div>
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-sm border border-gray-200 p-12 text-center shadow-sm">
              <PackageSearch className="w-16 h-16 text-gray-300 mx-auto mb-3 stroke-[1.5]" />
              <h3 className="text-base font-bold text-gray-800 mb-1">No products found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                We couldn't find any match for your current search or filter criteria. Try clearing filters or searching for something else.
              </p>
              <button
                onClick={() => {
                  setFilters({
                    category: '',
                    query: '',
                    brands: [],
                    minPrice: 0,
                    maxPrice: 200000,
                    minRating: 0,
                    sort: 'popularity',
                    dealOnly: false,
                  });
                  onSelectCategory('');
                }}
                className="px-5 py-2 bg-fk-blue text-white font-bold text-xs rounded-sm shadow-sm hover:bg-fk-darkBlue transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
