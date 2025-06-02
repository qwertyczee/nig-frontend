import { Product, Order, OrderItemInput, ShippingAddress } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Fetches a list of all products from the API.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * @throws {Error} If the network response is not ok or fetching fails.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(errorData.message || 'Failed to fetch products');
  }
  return response.json();
};

/**
 * Fetches a single product by its ID from the API.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Product>} A promise that resolves to the product object.
 * @throws {Error} If the product is not found or fetching fails.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(errorData.message || `Failed to fetch product with id ${id}`);
  }
  return response.json();
};

export type ProductCreationPayload = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

/**
 * Creates a new product via the API.
 * @param {ProductCreationPayload} productData - The data for the product to create.
 * @param {string} token - The authorization token.
 * @returns {Promise<Product>} A promise that resolves to the created product object.
 * @throws {Error} If product creation fails.
 */
export const createProduct = async (productData: ProductCreationPayload, token: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(errorData.message || 'Failed to create product');
  }
  return response.json();
};

export interface OrderPayload {
  items: Array<OrderItemInput>;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  customer_email?: string;
}

export interface CreateOrderResponse extends Order {
  checkoutUrl: string;
}

/**
 * Creates an order and initiates the checkout process.
 * @param {OrderPayload} payload - The order payload containing items and shipping/billing addresses.
 * @returns {Promise<CreateOrderResponse>} A promise that resolves to the created order response with a checkout URL.
 * @throws {Error} If order creation or checkout initiation fails.
 */
export const createOrderAndInitiateCheckout = async (payload: OrderPayload): Promise<CreateOrderResponse> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to create order. Network response was not ok.' }));
    throw new Error(errorData.message || 'Failed to create order and initiate checkout.');
  }
  return response.json();
};
