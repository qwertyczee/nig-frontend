import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import { Filter, Loader2, AlertTriangle } from 'lucide-react';

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (err: unknown) {
        setError((err as Error).message || 'Nepodařilo se načíst fotky.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = [...new Set(allProducts.map(product => product.category).filter(Boolean))] as string[];

  useEffect(() => {
    const productsToProcess = selectedCategory
      ? allProducts.filter(product => product.category === selectedCategory)
      : allProducts;

    const sorted = [...productsToProcess].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // For 'default', maintain original fetched order or sort by ID/name if needed
    });
    setFilteredProducts(sorted);
  }, [selectedCategory, sortBy, allProducts]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh] bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
        <Loader2 size={48} className="animate-spin text-blue-600 dark:text-dark-primary" />
        <p className="ml-4 text-lg text-gray-600 dark:text-dark-text-medium">Načítání fotek...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
        <AlertTriangle size={48} className="mx-auto text-red-600 dark:text-dark-error mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-red-600 dark:text-dark-error">Chyba</h2>
        <p className="text-gray-600 dark:text-dark-text-medium">{error}</p>
        <button
          onClick={() => window.location.reload()} // Simple reload, or implement retry logic
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary"
        >
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-dark-on-background">Naše fotky</h1>
      <p className="text-gray-600 mb-8 dark:text-dark-text-medium">
        Prohlédněte si naši nabídku profesionálních fotek
      </p>

      <button
        className="md:hidden flex items-center mb-4 text-blue-600 dark:text-dark-primary"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={18} className="mr-2" />
        {showFilters ? 'Skrýt filtry' : 'Zobrazit filtry'}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
            <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-dark-on-surface">Kategorie</h2>
            <div className="space-y-2">
              <button
                className={`block w-full text-left py-2 px-3 rounded ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                } transition-colors duration-200`}
                onClick={() => setSelectedCategory(null)}
              >
                Všechny
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  className={`block w-full text-left py-2 px-3 rounded ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                  } transition-colors duration-200`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
              {/* Add 18+ category */}
              <button
                className={`block w-full text-left py-2 px-3 rounded ${
                  selectedCategory === '18+'
                    ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                } transition-colors duration-200`}
                onClick={() => setSelectedCategory('18+')}
              >
                18+
              </button>
            </div>

            <h2 className="font-semibold text-lg mt-6 mb-4 text-gray-800 dark:text-dark-on-surface">Řazení</h2>
            <div className="space-y-2">
              <button
                className={`block w-full text-left py-2 px-3 rounded ${
                  sortBy === 'default'
                    ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                } transition-colors duration-200`}
                onClick={() => setSortBy('default')}
              >
                Základní
              </button>
              <button
                className={`block w-full text-left py-2 px-3 rounded ${
                  sortBy === 'price-asc'
                    ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                } transition-colors duration-200`}
                onClick={() => setSortBy('price-asc')}
              >
                Cena: nejnižší
              </button>
              <button
                className={`block w-full text-left py-2 px-3 rounded ${
                  sortBy === 'price-desc'
                    ? 'bg-blue-600 text-white dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'
                } transition-colors duration-200`}
                onClick={() => setSortBy('price-desc')}
              >
                Cena: nejvyšší
              </button>
            </div>
          </div>
        </aside>

        <div className="md:w-3/4 lg:w-4/5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
                <p className="text-gray-600 dark:text-dark-text-medium">Žádné fotky nenalezeny pro vybrané filtry.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
