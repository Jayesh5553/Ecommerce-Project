import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div
        className={`font-medium text-xs px-4 py-3 rounded-md shadow-2xl flex items-center gap-2.5 border ${
          isError
            ? 'bg-red-950 text-red-100 border-red-800'
            : isWarning
            ? 'bg-amber-950 text-amber-100 border-amber-800'
            : 'bg-slate-900 text-white border-slate-700'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
        ) : isWarning ? (
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
        ) : (
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
