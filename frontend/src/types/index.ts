export interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image_url: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  category_slug: string;
  brand: string;
  price: number;
  discount_price: number;
  discount_percentage: number;
  description: string;
  image_url: string;
  additional_images: string[];
  specifications: Record<string, string>;
  rating: number;
  review_count: number;
  stock: number;
  is_featured: boolean;
  is_deal_of_the_day: boolean;
  is_trending: boolean;
  created_at: string;
  reviews?: Review[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_items: number;
  total_price: number;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  order_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  payment_status: string;
  order_status: 'Order Placed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  total_mrp: number;
  total_discount: number;
  delivery_fee: number;
  final_amount: number;
  created_at: string;
  items: OrderItem[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface FilterState {
  category: string;
  query: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: string;
  dealOnly: boolean;
}
