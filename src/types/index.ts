export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
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

export interface OrderItem extends OrderItemInput {
  id: string;
  price_at_purchase: number;
  product?: Product;
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
