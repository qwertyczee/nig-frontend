import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { fetchProductById } from '@/services/api';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MinusCircle, 
  PlusCircle, 
  Loader2, 
  AlertTriangle, 
  Download,
  Shield,
  Image as ImageIcon,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

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
        setSelectedImage(data.main_image_url || '');
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
      <div className="min-h-screen dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin dark:text-blue-500 mx-auto mb-4" />
          <p className="text-lg dark:text-gray-300">Načítání detailu díla...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen dark:bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <AlertTriangle size={64} className="mx-auto dark:text-red-400 mb-6" />
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{error || 'Dílo nenalezeno'}</h2>
          <p className="mb-8 dark:text-gray-300 leading-relaxed">
            {error === 'Produkt nenalezen'
              ? 'Omlouváme se, ale hledané dílo neexistuje nebo bylo odstraněno.'
              : 'Došlo k chybě při načítání informací o díle.'}
          </p>
          <Button
            onClick={() => navigate('/products')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Zpět na galerii
          </Button>
        </div>
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

  const allImages = [
    product.main_image_url,
    ...(product.sub_image_urls || [])
  ].filter(Boolean);

  const features = [
    { icon: Download, text: 'Okamžité stažení po nákupu' },
    { icon: ImageIcon, text: 'Vysoké rozlišení' },
    { icon: Shield, text: 'Komerční licence zahrnuta' },
  ];

  return (
    <div className="min-h-screen dark:bg-background dark:text-white">
      {/* Breadcrumbs */}
      <div className="dark:bg-gray-900/50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center space-x-2 text-sm dark:text-gray-300">
            <button
              onClick={() => navigate('/')}
              className="hover:text-blue-400 transition-colors"
            >
              Domů
            </button>
            <ChevronRight size={16} />
            <button
              onClick={() => navigate('/products')}
              className="hover:text-blue-400 transition-colors"
            >
              Galerie
            </button>
            {product.category && (
              <>
                <ChevronRight size={16} />
                <button
                  onClick={() => navigate(`/products?category=${product.category}`)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {product.category}
                </button>
              </>
            )}
            <ChevronRight size={16} />
            <span className="dark:text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900">
              <img
                src={selectedImage || 'https://placehold.co/600x400.png?text=Image+not+available'}
                alt={product.name}
                className="w-full aspect-[4/3] object-contain"
              />
              {product.is_18_plus && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                  18+
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {allImages.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => { if (url) setSelectedImage(url); }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === url
                        ? 'border-blue-500 scale-105'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.name} - náhled ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 dark:text-white">
                {product.name}
              </h1>
              {product.category && (
                <Badge variant="secondary" className="mb-4">
                  {product.category}
                </Badge>
              )}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold dark:text-blue-400">
                  {product.price} Kč
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full dark:bg-green-600/20 flex items-center justify-center">
                    <feature.icon size={16} className="dark:text-green-400" />
                  </div>
                  <span className="dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium dark:text-gray-300">
                Počet licencí
              </label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 p-0"
                >
                  <MinusCircle size={20} />
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border dark:border-gray-600 rounded-lg py-2 dark:bg-gray-800 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseQuantity}
                  className="w-10 h-10 p-0"
                >
                  <PlusCircle size={20} />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full py-4 text-lg font-semibold dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
            >
              <ShoppingCart size={24} className="mr-3" />
              Přidat do košíku Kč
            </Button>

            {/* Age Warning */}
            {product.is_18_plus && (
              <Card className="dark:bg-red-900/20 dark:border-red-500/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 dark:text-red-300">
                    <AlertTriangle size={20} />
                    <div>
                      <div className="font-semibold">Obsah pro dospělé 18+</div>
                      <div className="text-sm">
                        Tento obsah je určen pouze pro dospělé osoby.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16">
          <Card className="dark:bg-gray-800/50 dark:border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <Info size={24} />
                Detaily díla
              </h2>
              
              <div className="space-y-6">
                {product.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Popis</h3>
                    <p className="dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                )}

                {product.likes && product.likes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Vlastnosti</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.likes.map((like, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check size={16} className="dark:text-green-400" />
                          <span className="dark:text-gray-300">{like}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.mail_content && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Co obdržíte</h3>
                    <Card className="dark:bg-gray-700/50">
                      <CardContent className="p-4">
                        <p className="dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {product.mail_content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* License Info */}
        <div className="mt-8">
          <Card className="dark:bg-blue-900/20 dark:border-blue-500/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 dark:text-blue-300 flex items-center gap-2">
                <Shield size={20} />
                Licenční informace
              </h3>
              <div className="space-y-2 dark:text-blue-200 text-sm">
                <p>✓ Komerční použití povoleno</p>
                <p>✓ Modifikace a úpravy povoleny</p>
                <p>✓ Neomezené použití v projektech</p>
                <p>✗ Přeprodej originálu není povolen</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;