import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { fetchProducts } from '@/services/api';
import { Filter, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh] bg-dark-background text-dark-on-background">
        <Card className="flex flex-col items-center justify-center p-8 bg-dark-surface border border-dark-border">
          <CardContent className="flex items-center p-0">
            <Loader2 size={48} className="animate-spin text-dark-primary" />
            <p className="ml-4 text-lg text-dark-text-medium">Načítání fotek...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-dark-background text-dark-on-background min-h-[60vh]">
        <Card className="w-full max-w-md mx-auto p-8 text-center bg-dark-surface border border-dark-error">
          <CardContent className="p-0">
            <AlertTriangle size={48} className="mx-auto text-dark-error mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-dark-error">Chyba</h2>
            <p className="text-dark-text-medium mb-6">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary py-2 px-4 rounded-lg"
            >
              Zkusit znovu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-dark-background text-dark-on-background">
      <h1 className="text-4xl font-extrabold mb-4 text-dark-on-background text-center">Naše exkluzivní fotky</h1>
      <p className="text-lg text-dark-text-medium mb-10 text-center max-w-2xl mx-auto">
        Prohlédněte si naši rozmanitou nabídku profesionálních fotek, pečlivě vybraných pro vaši inspiraci a potřeby.
      </p>

      <Button
        className="md:hidden flex items-center justify-center w-full py-3 px-4 mb-6 bg-dark-primary text-dark-on-primary rounded-lg shadow hover:bg-dark-primary-dark transition-colors duration-200"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={20} className="mr-2" />
        {showFilters ? 'Skrýt filtry a řazení' : 'Zobrazit filtry a řazení'}
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <Card className="rounded-xl shadow-lg p-6 border border-dark-border bg-dark-surface">
            <CardHeader className="p-0 mb-5">
              <CardTitle className="font-bold text-xl text-dark-on-surface">Kategorie</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <Button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === null
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-dark-text-light hover:bg-dark-hover'}
                `}
                onClick={() => setSelectedCategory(null)}
              >
                Všechny fotky
              </Button>

              {categories.map(category => (
                <Button
                  key={category}
                  className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                      : 'text-dark-text-light hover:bg-dark-hover'}
                  `}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
              {/* Add 18+ category */}
              <Button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${selectedCategory === '18+'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-dark-text-light hover:bg-dark-hover'}
                `}
                onClick={() => setSelectedCategory('18+')}
              >
                18+ Obsah
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg p-6 border border-dark-border bg-dark-surface mt-8">
            <CardHeader className="p-0 mb-5">
              <CardTitle className="font-bold text-xl text-dark-on-surface">Řazení</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <Button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'default'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-dark-text-light hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('default')}
              >
                Výchozí řazení
              </Button>
              <Button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'price-asc'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-dark-text-light hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('price-asc')}
              >
                Cena: Od nejnižší
              </Button>
              <Button
                className={`block w-full text-left py-2.5 px-4 rounded-lg transition-colors duration-200 ${sortBy === 'price-desc'
                    ? 'bg-blue-600 text-white shadow-md dark:bg-dark-primary dark:text-dark-on-primary'
                    : 'text-dark-text-light hover:bg-dark-hover'}
                `}
                onClick={() => setSortBy('price-desc')}
              >
                Cena: Od nejvyšší
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="md:w-3/4 lg:w-4/5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
              <Card className="rounded-xl shadow-lg p-8 text-center border border-dark-border bg-dark-surface">
                <CardContent>
                  <p className="text-xl text-dark-text-medium">Žádné fotky nebyly nalezeny pro vybrané filtry. Zkuste prosím upravit svá kritéria.</p>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
