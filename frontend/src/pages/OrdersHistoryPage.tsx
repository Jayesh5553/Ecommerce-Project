import React, { useState, useEffect } from 'react';
import { Package, Truck, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import { Order } from '../types';
import { orderService } from '../services/api';

interface OrdersHistoryPageProps {
  onNavigate: (page: string) => void;
}

export const OrdersHistoryPage: React.FC<OrdersHistoryPageProps> = ({ onNavigate }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await orderService.getUserOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-xs font-semibold text-gray-500">
        Loading orders history...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-sm border border-gray-200 p-12 shadow-sm max-w-md mx-auto">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-1">No Orders Found</h2>
          <p className="text-xs text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-2.5 bg-fk-blue text-white font-bold text-xs rounded-sm hover:bg-fk-darkBlue shadow"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      <h1 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-fk-blue" />
        <span>My Orders ({orders.length})</span>
      </h1>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id || ord.order_id} className="bg-white rounded-sm border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3 text-xs">
              <div>
                <span className="font-bold text-gray-900">Order #{ord.order_id}</span>
                <span className="text-gray-400 ml-2">Placed on {new Date(ord.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-fk-green font-bold px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {ord.order_status}
                </span>
                <span className="font-extrabold text-gray-900">₹{ord.final_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3">
              {ord.items && ord.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-16 h-16 border border-gray-100 p-1 flex items-center justify-center flex-shrink-0 bg-white">
                    <img src={it.product.image_url} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-gray-800 truncate">{it.product.name}</h4>
                    <p className="text-gray-500">Qty: {it.quantity} | Brand: {it.product.brand}</p>
                    <p className="font-extrabold text-gray-900 mt-0.5">₹{it.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
