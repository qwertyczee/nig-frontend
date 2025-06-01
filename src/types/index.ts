export interface Product {
  id: string; // Changed from number to string for UUIDs from Supabase
  name: string;
  price: number;
  description: string;
  shortDescription?: string; // Keep as optional or ensure backend provides it
  main_image_url?: string;
  rating: number;
  sub_image_urls?: string[];
  likes?: string[];
  is_18_plus?: boolean;
  mail_content?: string;
  category?: string;
  in_stock?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  full_name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
}

export interface OrderItemInput {
  product_id: string;
  quantity: number;
}

// This represents a created order item, possibly with more details
export interface OrderItem extends OrderItemInput {
  id: string; // or number, depending on your DB schema for order_items
  price_at_purchase: number;
  product?: Product; // Optionally include full product details
}

export type OrderStatus =
  | 'pending'
  | 'awaiting_payment'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export interface Order {
  id: string;
  user_id?: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  shipping_address_id: ShippingAddress;
  billing_address_id?: ShippingAddress;
  created_at: string;
  updated_at: string; 
}

export interface OrderPayload {
  items: Array<OrderItemInput>;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  customer_email?: string;
}
