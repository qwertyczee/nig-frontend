import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types';
import { 
  ArrowRight, 
  CheckCircle,
  Award, 
  Loader2, 
  AlertTriangle,
  Camera,
  Download,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message || 'Nepodařilo se načíst služby.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const stats = [
    { icon: Camera, label: 'Professional Photos', value: '10,000+' },
    { icon: Users, label: 'Happy Customers', value: '5,000+' },
    { icon: Award, label: 'Award Winning', value: '50+' },
    { icon: Download, label: 'Instant Downloads', value: '24/7' }
  ];

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen dark:bg-background dark:text-on-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-background dark:via-background/80 dark:to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
            Digital Art Photography
          </h1>
          <p className="text-xl md:text-2xl dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover stunning digital art and photography from talented artists worldwide. 
            High-quality, instant downloads for your creative projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-on-secondary"
            >
              Explore Gallery <ArrowRight size={20} />
            </Link>
            <Button variant="outline" className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 border-2 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-300 dark:hover:text-on-secondary">
              Learn More
            </Button>
          </div>
        </div>

        {/* Age Verification Notice */}
        <Card className="absolute bottom-8 left-8 p-4 max-w-sm dark:bg-red-600/20 dark:border dark:border-red-500 rounded-lg">
          <div className="flex items-center gap-2 dark:text-red-400 mb-2">
            <Shield size={20} />
            <span className="font-semibold">18+ Content Available</span>
          </div>
          <CardContent className="p-0 text-sm dark:text-gray-300">
            Some content may be suitable for mature audiences only. Age verification required.
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="py-16 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center dark:bg-gray-800 p-4">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 rounded-full mb-4">
                    <stat.icon size={32} className="dark:text-on-secondary" />
                  </div>
                  <div className="text-3xl font-bold dark:text-on-secondary mb-2">{stat.value}</div>
                  <div className="dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 dark:bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Artwork</h2>
            <p className="text-xl dark:text-gray-400 max-w-2xl mx-auto">
              Handpicked masterpieces from our most talented photographers and digital artists
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20 text-dark-primary">
              <Loader2 className="animate-spin dark:text-blue-500" size={48} />
            </div>
          ) : error ? (
            <Card className="text-center py-20 bg-dark-surface border border-dark-error">
              <CardContent>
                <AlertTriangle className="mx-auto dark:text-red-500 mb-4" size={48} />
                <p className="dark:text-red-400 text-lg">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-on-secondary"
            >
              View All Artwork <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 dark:bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-xl dark:text-gray-400">Premium digital art with unmatched quality and service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 rounded-xl transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:border-blue-500">
              <CardContent className="p-0">
                <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <Download size={32} className="dark:text-on-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Instant Downloads</h3>
                <p className="dark:text-gray-400">
                  Get your purchased artwork immediately after payment. High-resolution files ready for use.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-xl transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:border-blue-500">
              <CardContent className="p-0">
                <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-green-600 dark:to-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="dark:text-on-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Quality Guaranteed</h3>
                <p className="dark:text-gray-400">
                  Every piece is carefully curated and meets our high standards for artistic excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-xl transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:border-blue-500">
              <CardContent className="p-0">
                <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <Shield size={32} className="dark:text-on-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
                <p className="dark:text-gray-400">
                  Your purchases and personal information are protected with enterprise-grade security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
