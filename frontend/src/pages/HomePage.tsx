import React from 'react';
import { Product, Category } from '../types';
import { CategoryBar } from '../components/CategoryBar';
import { BannerCarousel } from '../components/BannerCarousel';
import { DealSection } from '../components/DealSection';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onNavigate,
}) => {
  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 6);
  const trendingProducts = products.filter((p) => p.is_trending).slice(0, 6);

  return (
    <div className="min-h-screen pb-12">
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => {
          onSelectCategory(slug);
          if (slug !== '') onNavigate('catalog');
        }}
      />
      <BannerCarousel onSelectCategory={(slug) => { onSelectCategory(slug); onNavigate('catalog'); }} />
      <DealSection
        products={products}
        onSelectProduct={onSelectProduct}
        onViewAll={() => { onSelectCategory(''); onNavigate('catalog'); }}
      />
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 sm:p-5">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-fk-blue" />
              <h2 className="font-extrabold text-lg text-gray-900 tracking-tight">
                Best of Electronics & Mobiles
              </h2>
            </div>

            <button
              onClick={() => { onSelectCategory('electronics'); onNavigate('catalog'); }}
              className="text-xs font-bold text-fk-blue hover:text-fk-darkBlue flex items-center gap-1 group"
            >
              <span>SEE ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>

        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 sm:p-5">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-fk-orange" />
              <h2 className="font-extrabold text-lg text-gray-900 tracking-tight">
                Trending Deals & Style Statements
              </h2>
            </div>

            <button
              onClick={() => { onSelectCategory('fashion'); onNavigate('catalog'); }}
              className="text-xs font-bold text-fk-blue hover:text-fk-darkBlue flex items-center gap-1 group"
            >
              <span>SEE ALL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};
