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
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh] bg-dark-background text-dark-on-background">
        <Loader2 size={48} className="animate-spin text-dark-primary" />
        <p className="ml-4 text-lg text-dark-text-medium">Načítání detailu fotky...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-dark-background text-dark-on-background">
        <AlertTriangle size={48} className="mx-auto text-dark-error mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-dark-error">{error || 'Fotka nenalezena'}</h2>
        <p className="mb-8 text-dark-text-medium">
          {error === 'Produkt nenalezen'
            ? 'Omlouváme se, ale hledaná fotka neexistuje nebo byla odstraněna.'
            : 'Došlo k chybě při načítání informací o fotce.'}
        </p>
        <button
          onClick={() => navigate('/produkty')}
          className="text-dark-primary flex items-center mx-auto hover:text-dark-primary-dark transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Zpět na seznam fotek
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/kosik');
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
    <div className="container mx-auto px-4 py-12 bg-dark-background text-dark-on-background">
      <button
        onClick={() => navigate('/produkty')}
        className="text-dark-primary flex items-center mb-8 hover:text-dark-primary-dark transition-colors duration-200"
      >
        <ArrowLeft size={16} className="mr-2" /> Zpět na seznam fotek
      </button>

      <div className="bg-dark-surface rounded-lg shadow-sm overflow-hidden border border-dark-border">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.main_image_url || 'https://placehold.co/600x400.png?text=Image+not+available'}
              alt={product.name}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            />
            {product.sub_image_urls && product.sub_image_urls.length > 0 && (
              <div className="mt-4 p-4 bg-dark-background/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-dark-on-surface">Další fotky:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {product.sub_image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} - Sub Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md shadow-sm border border-dark-border"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-dark-on-surface">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-2xl font-bold text-dark-primary">{product.price} Kč</p>
              <p className="text-sm text-dark-text-medium">Cena včetně DPH</p>
            </div>
            
            <div className="mb-6">
              <p className="text-dark-text-light leading-relaxed">{product.description}</p>
            </div>

            {product.likes && product.likes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-dark-on-surface">Co má ráda:</h3>
                <ul className="list-disc list-inside text-dark-text-light">
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
              <div className="mb-6 p-4 bg-dark-background/50 rounded-lg border border-dark-border">
                <h3 className="text-lg font-semibold mb-2 text-dark-on-surface">Co obdržíte v mailu:</h3>
                <p className="text-dark-text-light leading-relaxed whitespace-pre-wrap">{product.mail_content}</p>
              </div>
            )}
            
            <div className="mb-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-dark-text-light mb-2">
                Počet
              </label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200 p-1 disabled:opacity-50"
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
                  className="mx-4 w-16 text-center border border-dark-border rounded p-2 appearance-none bg-dark-background text-dark-on-background"
                  min="1"
                />
                <button
                  onClick={increaseQuantity}
                  className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200 p-1"
                  aria-label="Zvýšit množství"
                >
                  <PlusCircle size={24} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              <ShoppingCart size={20} className="mr-2" />
              Přidat do košíku
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-dark-on-background">Detaily fotky</h2>
        <div className="bg-dark-surface rounded-lg shadow-sm p-6 border border-dark-border">
          {/* This could be a more detailed description or specifications from the product object if available */}
          <p className="text-dark-text-light leading-relaxed mb-4">
            {product.description || "Detailní popis této fotky momentálně není k dispozici."}
          </p>
          {product.category && <p className="text-sm text-dark-text-medium">Kategorie: {product.category}</p>}
          {product.created_at && <p className="text-sm text-dark-text-medium">Přidáno: {new Date(product.created_at).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
