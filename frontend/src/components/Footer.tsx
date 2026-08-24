import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 text-xs mt-12">
      <div className="border-b border-slate-800 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-fk-yellow" />
            <span className="text-gray-300 font-semibold">100% Original Products</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 text-fk-yellow" />
            <span className="text-gray-300 font-semibold">Easy 7 Days Return</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-5 h-5 text-fk-yellow" />
            <span className="text-gray-300 font-semibold">Fast Free Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Headphones className="w-5 h-5 text-fk-yellow" />
            <span className="text-gray-300 font-semibold">24x7 Customer Support</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h5 className="text-gray-200 font-bold uppercase tracking-wider mb-3 text-[11px]">ABOUT</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Flipkart Stories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gray-200 font-bold uppercase tracking-wider mb-3 text-[11px]">HELP</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Payments</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gray-200 font-bold uppercase tracking-wider mb-3 text-[11px]">POLICY</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-gray-200 font-bold uppercase tracking-wider mb-3 text-[11px]">SOCIAL</h5>
          <ul className="space-y-1.5">
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter X</a></li>
            <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <h5 className="text-gray-200 font-bold uppercase tracking-wider mb-3 text-[11px]">Mail Us:</h5>
          <p className="leading-relaxed text-gray-400 mb-4">
            Flipkart Internet Private Limited,<br/>
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br/>
            Bengaluru, 560103, Karnataka, India
          </p>
          <div className="flex items-center gap-2 text-fk-yellow font-bold">
            <CreditCard className="w-4 h-4" />
            <span>UPI, Visa, Mastercard, NetBanking</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 bg-slate-950 text-center text-gray-500 text-[11px]">
        <p>© 2026 E-Commerce Platform</p>
      </div>

    </footer>
  );
};
