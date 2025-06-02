import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ProductCardProps {
  product: Product;
}

/**
 * Renders a product card with product details and an add-to-cart button.
 * @param {Object} props - The component props.
 * @param {Product} props.product - The product object to display.
 * @returns {JSX.Element} The ProductCard component.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  /**
   * Handles adding a product to the cart.
   * Prevents default link navigation and stops event propagation.
   * Shows a toast notification upon successful addition.
   * @param {React.MouseEvent} e - The mouse event.
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Přidáno do košíku",
      description: `${product.name} bylo přidáno do košíku.`,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group"
    >
      <Card className="overflow-hidden flex flex-col h-full border border-dark-border bg-dark-surface shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-dark-background">
          <img
            src={product.main_image_url || 'https://placehold.co/400x300.png?text=Photo'}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300.png?text=Chyba+obrázku')}
          />
          {product.is_18_plus && (
            <span className="absolute top-2 left-2 bg-red-600 text-xs px-3 py-1 rounded-full text-white font-bold shadow">18+</span>
          )}
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="text-xl font-extrabold text-dark-on-surface mb-2 truncate" title={product.name}>{product.name}</h3>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-border">
            <span className="text-ml font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">{product.price.toLocaleString('cs-CZ')} Kč</span>
            <Button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-primary focus:ring-opacity-50 flex items-center space-x-2 bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary"
              aria-label={`Přidat ${product.name} do košíku`}
            >
              <ShoppingCart size={20} />
              <span>Přidat do košíku</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
