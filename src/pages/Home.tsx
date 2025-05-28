import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
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
  Eye,
  Search,
  Grid,
  List
} from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const categories = ['all', 'Portrait', 'Urban', 'Nature', 'Abstract', 'Fashion', 'Architecture'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              className="dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-on-secondary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Explore Gallery <ArrowRight size={20} />
            </Link>
            <button className="border-2 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-300 dark:hover:text-on-secondary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Age Verification Notice */}
        <div className="absolute bottom-8 left-8 dark:bg-red-600/20 dark:border dark:border-red-500 rounded-lg p-4 max-w-sm">
          <div className="flex items-center gap-2 dark:text-red-400 mb-2">
            <Shield size={20} />
            <span className="font-semibold">18+ Content Available</span>
          </div>
          <p className="text-sm dark:text-gray-300">
            Some content may be suitable for mature audiences only. Age verification required.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 rounded-full mb-4">
                  <stat.icon size={32} className="dark:text-on-secondary" />
                </div>
                <div className="text-3xl font-bold dark:text-on-secondary mb-2">{stat.value}</div>
                <div className="dark:text-gray-400">{stat.label}</div>
              </div>
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
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin dark:text-blue-500" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <AlertTriangle className="mx-auto dark:text-red-500 mb-4" size={48} />
              <p className="dark:text-red-400 text-lg">{error}</p>
            </div>
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
              className="inline-flex items-center gap-2 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-on-secondary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Artwork <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Browse Categories</h2>
            <p className="text-xl dark:text-gray-400">Find the perfect style for your project</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:text-on-secondary'
                    : 'dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artwork..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 dark:bg-gray-700 dark:border dark:border-gray-600 rounded-lg dark:text-on-secondary dark:placeholder-gray-400 focus:outline-none focus:ring-2 dark:focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'dark:bg-blue-600 dark:text-on-secondary' : 'dark:bg-gray-700 dark:text-gray-400 hover:dark:bg-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'dark:bg-blue-600 dark:text-on-secondary' : 'dark:bg-gray-700 dark:text-gray-400 hover:dark:bg-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <Eye className="mx-auto dark:text-gray-500 mb-4" size={48} />
              <p className="dark:text-gray-400 text-lg">No artwork found matching your criteria</p>
            </div>
          )}
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
            <div className="dark:bg-gray-800 p-8 rounded-xl dark:border dark:border-gray-700 dark:hover:border-blue-500 transition-colors">
              <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Download size={32} className="dark:text-on-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Downloads</h3>
              <p className="dark:text-gray-400">
                Get your purchased artwork immediately after payment. High-resolution files ready for use.
              </p>
            </div>

            <div className="dark:bg-gray-800 p-8 rounded-xl dark:border dark:border-gray-700 dark:hover:border-blue-500 transition-colors">
              <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-green-600 dark:to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle size={32} className="dark:text-on-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality Guaranteed</h3>
              <p className="dark:text-gray-400">
                Every piece is carefully curated and meets our high standards for artistic excellence.
              </p>
            </div>

            <div className="dark:bg-gray-800 p-8 rounded-xl dark:border dark:border-gray-700 dark:hover:border-blue-500 transition-colors">
              <div className="w-16 h-16 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 rounded-lg flex items-center justify-center mb-6">
                <Shield size={32} className="dark:text-on-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
              <p className="dark:text-gray-400">
                Your purchases and personal information are protected with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Inspired</h2>
          <p className="text-xl dark:text-gray-300 mb-8">
            Get notified about new artwork, exclusive collections, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg dark:bg-on-secondary/10 dark:border dark:border-on-secondary/20 dark:text-on-secondary dark:placeholder-gray-300 focus:outline-none focus:ring-2 dark:focus:ring-on-secondary/50"
            />
            <button className="dark:bg-on-secondary dark:text-background px-8 py-4 rounded-lg font-semibold dark:hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
