export interface Product {
      id: string; // Changed from number to string for UUIDs from Supabase
      name: string;
      price: number;
      description: string;
      shortDescription?: string; // Keep as optional or ensure backend provides it
      image_url?: string; // Changed from image to image_url to match Supabase
      category?: string;
      in_stock?: boolean;
      created_at?: string;
      updated_at?: string;
    }

    export interface CartItem {
      product: Product;
      quantity: number;
    }
