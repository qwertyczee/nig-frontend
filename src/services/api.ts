import { Product } from '../types';

    const API_BASE_URL = '/api'; // Proxied by Vite

    export const fetchProducts = async (): Promise<Product[]> => {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
        throw new Error(errorData.message || 'Failed to fetch products');
      }
      return response.json();
    };

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

    // Add other API functions as needed (create, update, delete)
    // For example:
    /*
    export const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
        throw new Error(errorData.message || 'Failed to create product');
      }
      return response.json();
    };
    */
