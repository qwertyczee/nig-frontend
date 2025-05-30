import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { fetchProductById } from '@/services/api';
import { ArrowLeft, ShoppingCart, MinusCircle, PlusCircle, Loader2, AlertTriangle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
        <Loader2 size={48} className="animate-spin text-blue-600 dark:text-dark-primary" />
        <p className="ml-4 text-lg text-dark-text-light">Načítání detailu díla...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-dark-background text-dark-on-background">
        <AlertTriangle size={48} className="mx-auto text-red-600 dark:text-dark-error mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-dark-error">{error || 'Dílo nenalezeno'}</h2>
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
    <div className="container mx-auto px-4 py-12 bg-dark-background text-dark-on-background">
      <div className="text-sm text-dark-text-light mb-6">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span>{' '}
        {'/'}{' '}
        {product.category && (
          <>
            <span className="hover:underline cursor-pointer" onClick={() => navigate(`/products?category=${product.category}`)}>{product.category}</span>{' '}
            {'/'}{' '}
          </>
        )}
        <span className="text-dark-on-surface font-semibold">{product.name}</span>
      </div>

      <Card className="rounded-lg shadow-sm overflow-hidden border dark:border-dark-border bg-dark-surface">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.main_image_url || 'https://placehold.co/600x400.png?text=Image+not+available'}
              alt={product.name}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            />
            {product.sub_image_urls && product.sub_image_urls.length > 0 && (
              <div className="mt-4 p-4 bg-dark-background/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">Další obrázky:</h3>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.sub_image_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} - Sub Image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md shadow-sm border dark:border-dark-border flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-dark-on-surface">{product.name}</h1>
            </div>
            
            <div className="mb-6 flex items-center">
              <p className="text-3xl font-bold text-dark-primary mr-3">{product.price} Kč</p>
            </div>

            <div className="flex items-center mb-6 text-dark-on-background">
                <div className="flex items-center mr-4">
                    <Star size={18} className="text-yellow-500 fill-current mr-1"/>
                    <span className="font-semibold">4.8</span>
                </div>
                <span className="mr-4">67 Reviews</span>
                <span>93% of buyers recommended this.</span>
            </div>
            
            <div className="mb-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-dark-text-light mb-2">
                Počet
              </label>
              <div className="flex items-center">
                <Button
                  onClick={decreaseQuantity}
                  className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200 p-1 disabled:opacity-50"
                  aria-label="Snížit množství"
                  disabled={quantity <= 1}
                >
                  <MinusCircle size={24} />
                </Button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mx-4 w-16 text-center border dark:border-dark-border rounded p-2 appearance-none bg-dark-background text-dark-on-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                />
                <Button
                  onClick={increaseQuantity}
                  className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200 p-1"
                  aria-label="Zvýšit množství"
                >
                  <PlusCircle size={24} />
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="w-full bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              <ShoppingCart size={20} className="mr-2" />
              Přidat do košíku
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Product Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card className="mt-6 bg-dark-surface rounded-lg shadow-sm p-6 border dark:border-dark-border">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 text-dark-on-surface">Product Description</h3>
                <p className="text-dark-text-light leading-relaxed whitespace-pre-wrap mb-4">
                    {product.description || "Detailní popis tohoto díla momentálně není k dispozici."}
                </p>
                {product.likes && product.likes.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-dark-on-surface">Co má ráda:</h3>
                      <ul className="list-disc list-inside text-dark-text-light">
                        {product.likes.map((like, index) => (
                          <li key={index}>{like}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.is_18_plus && (
                    <div className="mb-4 p-3 bg-dark-red-600/20 text-dark-red-400 rounded-md flex items-center">
                      <AlertTriangle size={20} className="mr-2" />
                      <span className="font-semibold">Obsah pro dospělé 18+</span>
                    </div>
                  )}

                  {product.mail_content && (
                    <div className="mb-4 p-4 bg-dark-background/50 rounded-lg border dark:border-dark-border">
                      <h3 className="text-lg font-semibold mb-2 text-dark-on-surface">Co obdržíte v mailu:</h3>
                      <p className="text-dark-text-light leading-relaxed whitespace-pre-wrap">{product.mail_content}</p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card className="mt-6 bg-dark-surface rounded-lg shadow-sm p-6 border dark:border-dark-border">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 text-dark-on-surface">Customer Reviews</h3>
                <p className="text-dark-text-medium">Reviews will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
};

export default ProductDetail;
