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
          <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
            <Loader2 size={48} className="animate-spin text-blue-700" />
            <p className="ml-4 text-lg text-gray-600">Načítání detailu služby...</p>
          </div>
        );
      }

      if (error || !product) {
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4">{error || 'Produkt nenalezen'}</h2>
            <p className="mb-8 text-gray-700">
              {error === 'Produkt nenalezen' 
                ? 'Omlouváme se, ale hledaný produkt neexistuje nebo byl odstraněn.' 
                : 'Došlo k chybě při načítání informací o produktu.'}
            </p>
            <button
              onClick={() => navigate('/produkty')}
              className="text-blue-700 flex items-center mx-auto hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Zpět na seznam služeb
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
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/produkty')}
            className="text-blue-700 flex items-center mb-8 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-2" /> Zpět na seznam služeb
          </button>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={product.image_url || 'https://placehold.co/600x400.png?text=Obrázek+není+k+dispozici'} 
                  alt={product.name} 
                  className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                />
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
                
                <div className="mb-6">
                  <p className="text-2xl font-bold text-blue-900">{product.price} Kč</p>
                  <p className="text-sm text-gray-500">Cena včetně DPH</p>
                </div>
                
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Počet
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={decreaseQuantity}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 p-1 disabled:opacity-50"
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
                      className="mx-4 w-16 text-center border border-gray-300 rounded p-2 appearance-none"
                      min="1"
                    />
                    <button 
                      onClick={increaseQuantity}
                      className="text-gray-500 hover:text-blue-700 transition-colors duration-200 p-1"
                      aria-label="Zvýšit množství"
                    >
                      <PlusCircle size={24} />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Přidat do košíku
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Detaily služby</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* This could be a more detailed description or specifications from the product object if available */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description || "Detailní popis této služby momentálně není k dispozici."}
              </p>
              {product.category && <p className="text-sm text-gray-500">Kategorie: {product.category}</p>}
              {product.created_at && <p className="text-sm text-gray-500">Přidáno: {new Date(product.created_at).toLocaleDateString()}</p>}
            </div>
          </div>
        </div>
      );
    };

    export default ProductDetail;
