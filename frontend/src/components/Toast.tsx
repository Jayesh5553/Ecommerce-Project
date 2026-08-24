import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-slate-900 text-white font-medium text-xs px-4 py-3 rounded-md shadow-2xl flex items-center gap-2.5 border border-slate-700">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
