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
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-200 dark:bg-dark-surface dark:shadow-lg dark:hover:shadow-2xl dark:border-dark-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-dark-background">
        <img
          src={product.main_image_url || 'https://placehold.co/400x300.png?text=Photo'}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300.png?text=Chyba+obrázku')}
        />
        {product.is_18_plus && (
          <span className="absolute top-2 left-2 bg-red-600 text-xs px-3 py-1 rounded-full text-white font-bold shadow">18+</span>
        )}
        <span className="absolute top-2 right-2 bg-blue-600 text-xs px-3 py-1 rounded-full text-white font-bold shadow dark:bg-gradient-to-r dark:from-dark-primary dark:to-dark-secondary dark:text-dark-on-primary">Photo</span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-extrabold text-gray-800 dark:text-dark-on-surface mb-1 truncate" title={product.name}>{product.name}</h3>
        <p className="text-gray-600 text-xs mb-2 dark:text-dark-text-medium">Generovaná fotka: {product.category || 'různá etnika'}</p>
        <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3 dark:text-dark-text-light">{product.shortDescription || product.description || 'Popis není k dispozici.'}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-dark-border">
          <span className="text-xl font-bold text-blue-600 dark:bg-gradient-to-r dark:from-dark-primary dark:to-dark-secondary dark:bg-clip-text dark:text-transparent">{product.price.toLocaleString('cs-CZ')} Kč</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary dark:focus:ring-dark-primary dark:focus:ring-opacity-50"
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
