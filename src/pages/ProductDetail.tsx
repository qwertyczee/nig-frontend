import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { fetchProductById } from '../services/api';
import { ArrowLeft, ShoppingCart, MinusCircle, PlusCircle, Loader2, AlertTriangle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID produktu chybí.');
      setIsLoading(false);
      return;
    }
    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.message === 'Product not found') {
            setError('Produkt nenalezen.');
          } else {
            setError(err.message);
          }
        } else {
          setError('Nepodařilo se načíst detail produktu. Neznámá chyba.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh] bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
        <Loader2 size={48} className="animate-spin text-blue-600 dark:text-dark-primary" />
        <p className="ml-4 text-lg text-gray-600 dark:text-dark-text-medium">Načítání detailu díla...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
        <AlertTriangle size={48} className="mx-auto text-red-600 dark:text-dark-error mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-dark-error">{error || 'Dílo nenalezeno'}</h2>
        <p className="mb-8 text-gray-600 dark:text-dark-text-medium">
          {error === 'Produkt nenalezen'
            ? 'Omlouváme se, ale hledané dílo neexistuje nebo bylo odstraněno.'
            : 'Došlo k chybě při načítání informací o díle.'}
        </p>
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 flex items-center mx-auto hover:text-blue-700 dark:text-dark-primary dark:hover:text-dark-primary-dark transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Zpět na seznam děl
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/cart');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
      <button
        onClick={() => navigate('/products')}
        className="text-blue-600 flex items-center mb-8 hover:text-blue-700 dark:text-dark-primary dark:hover:text-dark-primary-dark transition-colors duration-200"
      >
        <ArrowLeft size={16} className="mr-2" /> Zpět na seznam děl
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.main_image_url || 'https://placehold.co/600x400.png?text=Image+not+available'}
              alt={product.name}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            />
            {product.sub_image_urls && product.sub_image_urls.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg dark:bg-dark-background/50">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">Další díla:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {product.sub_image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} - Sub Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md shadow-sm border border-gray-200 dark:border-dark-border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-dark-on-surface">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-2xl font-bold text-blue-600 dark:text-dark-primary">{product.price} Kč</p>
              <p className="text-sm text-gray-600 dark:text-dark-text-medium">Cena včetně DPH</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed dark:text-dark-text-light">{product.description}</p>
            </div>

            {product.likes && product.likes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-dark-on-surface">Co má ráda:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-light">
                  {product.likes.map((like, index) => (
                    <li key={index}>{like}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.is_18_plus && (
              <div className="mb-6 p-3 bg-red-800/20 text-red-400 rounded-md flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                <span className="font-semibold">Obsah pro dospělé 18+</span>
              </div>
            )}

            {product.mail_content && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200 dark:bg-dark-background/50 dark:border-dark-border">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-dark-on-surface">Co obdržíte v mailu:</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap dark:text-dark-text-light">{product.mail_content}</p>
              </div>
            )}
            
            <div className="mb-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-2">
                Počet
              </label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 disabled:opacity-50 dark:text-dark-text-medium dark:hover:text-dark-primary"
                  aria-label="Snížit množství"
                  disabled={quantity <= 1}
                >
                  <MinusCircle size={24} />
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mx-4 w-16 text-center border border-gray-300 rounded p-2 appearance-none bg-white text-gray-900 dark:border-dark-border dark:rounded dark:p-2 dark:appearance-none dark:bg-dark-background dark:text-dark-on-background"
                  min="1"
                />
                <button
                  onClick={increaseQuantity}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 dark:text-dark-text-medium dark:hover:text-dark-primary"
                  aria-label="Zvýšit množství"
                >
                  <PlusCircle size={24} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary"
            >
              <ShoppingCart size={20} className="mr-2" />
              Přidat do košíku
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-dark-on-background">Detaily díla</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
          {/* This could be a more detailed description or specifications from the product object if available */}
          <p className="text-gray-700 leading-relaxed mb-4 dark:text-dark-text-light">
            {product.description || "Detailní popis tohoto díla momentálně není k dispozici."}
          </p>
          {product.category && <p className="text-sm text-gray-600 dark:text-dark-text-medium">Kategorie: {product.category}</p>}
          {product.created_at && <p className="text-sm text-gray-600 dark:text-dark-text-medium">Přidáno: {new Date(product.created_at).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
