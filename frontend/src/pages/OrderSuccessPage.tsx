import React from 'react';
import { CheckCircle2, Package, Truck, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessPageProps {
  order: Order;
  onNavigate: (page: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6 text-center mb-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Order Placed Successfully!</h1>
        <p className="text-xs text-gray-500 mb-3">
          Thank you for shopping with us. We've sent a confirmation email & SMS.
        </p>
        <div className="inline-block bg-blue-50 border border-blue-200 px-4 py-1.5 rounded text-xs font-bold text-fk-blue">
          Order ID: <span className="font-mono text-gray-900">{order.order_id}</span>
        </div>
      </div>
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-6">Delivery Progress</h3>
        
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-200 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-8 w-1/4 h-1 bg-emerald-500 -translate-y-1/2 z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">✓</div>
            <span className="text-[11px] font-bold text-gray-900 mt-2">Order Placed</span>
            <span className="text-[9px] text-gray-400">Today</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-500 flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 mt-2">Packing</span>
            <span className="text-[9px] text-gray-400">In Progress</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 border-2 border-gray-300 flex items-center justify-center font-bold text-xs">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-gray-400 mt-2">Shipped</span>
            <span className="text-[9px] text-gray-400">Expected Tomorrow</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 border-2 border-gray-300 flex items-center justify-center font-bold text-xs">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-gray-400 mt-2">Delivered</span>
            <span className="text-[9px] text-gray-400">By 9 PM</span>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-5 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-gray-400 mb-3 text-[11px]">Shipping Details</h4>
          <p className="font-bold text-gray-900 text-sm mb-1">{order.full_name}</p>
          <p className="text-gray-600 leading-relaxed">{order.address}</p>
          <p className="text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
          <p className="text-gray-600 mt-2"><strong>Phone:</strong> {order.phone}</p>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-5 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-gray-400 mb-3 text-[11px]">Payment Summary</h4>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-bold text-gray-900 uppercase">{order.payment_method}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status:</span>
              <span className="font-bold text-fk-green">{order.payment_status}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t">
              <span>Total Paid:</span>
              <span>₹{order.final_amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('orders')}
          className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-800 font-bold text-xs rounded-sm shadow-sm hover:bg-gray-50 transition-colors"
        >
          View All Orders History
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto px-8 py-3 bg-fk-blue text-white font-extrabold text-xs uppercase rounded-sm shadow-md hover:bg-fk-darkBlue transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
