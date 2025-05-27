import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if card is a link
    e.stopPropagation(); // Prevent event bubbling
    addToCart(product);
    // Optionally, add some user feedback here, e.g., a toast notification
  };

  return (
    <Link 
      to={`/produkt/${product.id}`}
      className="group bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-800"
    >
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
        <span className="absolute top-2 right-2 bg-gradient-to-r from-dark-primary to-dark-secondary text-xs px-3 py-1 rounded-full text-dark-on-primary font-bold shadow">Photo</span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-extrabold text-dark-on-surface mb-1 truncate" title={product.name}>{product.name}</h3>
        <p className="text-dark-text-medium text-xs mb-2">Generovaná fotka: {product.category || 'různá etnika'}</p>
        <p className="text-dark-text-light text-sm mb-4 flex-grow line-clamp-3">{product.shortDescription || product.description || 'Popis není k dispozici.'}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-dark-border">
          <span className="text-xl font-bold bg-gradient-to-r from-dark-primary to-dark-secondary bg-clip-text text-transparent">{product.price.toLocaleString('cs-CZ')} Kč</span>
          <button
            onClick={handleAddToCart}
            className="bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-primary focus:ring-opacity-50"
            aria-label={`Přidat ${product.name} do košíku`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
