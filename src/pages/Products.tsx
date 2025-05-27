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
    <div className="container mx-auto px-4 py-8 bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-dark-on-background text-center">Naše exkluzivní fotky</h1>
      <p className="text-lg text-gray-600 mb-10 dark:text-dark-text-medium text-center max-w-2xl mx-auto">
        Prohlédněte si naši rozmanitou nabídku profesionálních fotek, pečlivě vybraných pro vaši inspiraci a potřeby.
      </p>

      <button
        className="md:hidden flex items-center justify-center w-full py-3 px-4 mb-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={20} className="mr-2" />
        {showFilters ? 'Skrýt filtry a řazení' : 'Zobrazit filtry a řazení'}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
            <h2 className="font-bold text-xl mb-5 text-gray-800 dark:text-dark-on-surface">Kategorie</h2>
            <div className="space-y-3">
              <button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === null
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                `}
                onClick={() => setSelectedCategory(null)}
              >
                Všechny fotky
              </button>

              {categories.map(category => (
                <button
                  key={category}
                  className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                  `}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
              {/* Add 18+ category */}
              <button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === '18+'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                `}
                onClick={() => setSelectedCategory('18+')}
              >
                18+ Obsah
              </button>
            </div>

            <h2 className="font-bold text-xl mt-8 mb-5 text-gray-800 dark:text-dark-on-surface">Řazení</h2>
            <div className="space-y-3">
              <button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'default'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('default')}
              >
                Výchozí řazení
              </button>
              <button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'price-asc'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('price-asc')}
              >
                Cena: Od nejnižší
              </button>
              <button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'price-desc'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-dark-text-light dark:hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('price-desc')}
              >
                Cena: Od nejvyšší
              </button>
            </div>
          </div>
        </aside>

        <div className="md:w-3/4 lg:w-4/5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
                <p className="text-xl text-gray-600 dark:text-dark-text-medium">Žádné fotky nebyly nalezeny pro vybrané filtry. Zkuste prosím upravit svá kritéria.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
