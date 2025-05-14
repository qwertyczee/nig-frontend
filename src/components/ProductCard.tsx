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
          to={`/produkt/${product.id}`} // ID is now a string (UUID)
          className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img 
              src={product.image_url || 'https://via.placeholder.com/400x300.png?text=Obrázek+není+k+dispozici'} 
              alt={product.name} 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300.png?text=Chyba+obrázku')}
            />
          </div>
          
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.name}>{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
              {product.shortDescription || product.description || 'Popis není k dispozici.'}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <span className="text-xl font-bold text-blue-900">{product.price.toLocaleString('cs-CZ')} Kč</span>
              <button 
                onClick={handleAddToCart}
                className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
