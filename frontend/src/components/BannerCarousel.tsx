import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  bgColor: string;
  image: string;
  ctaText: string;
  slug: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: 'THE BIG BILLION DAYS',
    subtitle: 'Up to 80% Off on Flagship Smartphones & Laptops',
    tag: 'BIGGEST DEALS OF THE YEAR',
    bgColor: 'from-blue-600 via-indigo-700 to-blue-900',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    ctaText: 'SHOP NOW',
    slug: 'mobiles'
  },
  {
    id: 2,
    title: 'TECH FESTIVAL 2026',
    subtitle: 'MacBooks, Gaming Laptops & Audio Gear at Unbeatable Prices',
    tag: 'LIMITED TIME BANK OFFERS',
    bgColor: 'from-purple-700 via-blue-800 to-slate-900',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    ctaText: 'EXPLORE TECH',
    slug: 'electronics'
  },
  {
    id: 3,
    title: 'FASHION GRAND SALE',
    subtitle: 'Nike, Ray-Ban, Zara & Roadster Starting ₹499',
    tag: 'EXTRA 10% INSTANT DISCOUNT',
    bgColor: 'from-amber-600 via-orange-600 to-red-700',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80',
    ctaText: 'SHOP FASHION',
    slug: 'fashion'
  }
];

interface BannerCarouselProps {
  onSelectCategory: (slug: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <div className="relative max-w-7xl mx-auto px-4 mb-6">
      <div className={`relative overflow-hidden rounded-md bg-gradient-to-r ${slide.bgColor} text-white shadow-lg min-h-[200px] sm:min-h-[280px] flex items-center transition-all duration-700`}>
        

        <div className="w-full md:w-3/5 p-6 sm:p-10 z-10">
          <div className="inline-flex items-center gap-1.5 bg-fk-yellow text-fk-textDark text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
            <Zap className="w-3.5 h-3.5 fill-fk-textDark" />
            {slide.tag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 text-shadow drop-shadow-md">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-100 font-medium mb-6 max-w-lg">
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectCategory(slide.slug)}
              className="bg-fk-yellow text-fk-textDark font-extrabold text-sm px-6 py-2.5 rounded-sm hover:bg-yellow-400 transition-transform active:scale-95 shadow-md flex items-center gap-2"
            >
              {slide.ctaText}
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Flipkart Assured</span>
            </div>
          </div>
        </div>


        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 w-80 h-64 rounded-md overflow-hidden shadow-2xl border-4 border-white/20 rotate-1 transform hover:rotate-0 transition-transform duration-300">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>


        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white text-gray-900 hover:text-fk-blue p-2 rounded-r-md backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white text-gray-900 hover:text-fk-blue p-2 rounded-l-md backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

   
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-fk-yellow' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
