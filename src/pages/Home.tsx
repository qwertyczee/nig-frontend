import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import { ArrowRight, CheckCircle, Clock, Award, Loader2, AlertTriangle } from 'lucide-react';

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] max-h-[600px] flex items-center bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-dark-primary dark:via-dark-secondary dark:to-blue-500 bg-clip-text text-transparent">
              Unikátní digitální umění - portréty všech etnik
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-dark-text-light">
              Objevte a nakupujte unikátní digitální portréty. Různá etnika, věkové kategorie, styly - včetně sekce 18+.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produkty"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:bg-dark-primary dark:text-dark-on-primary dark:hover:bg-dark-primary-dark transition-colors duration-300 shadow-lg"
              >
                Prohlédnout díla
              </Link>
              <Link
                to="#jak"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary dark:hover:text-dark-on-primary transition-colors duration-300"
              >
                Jak to funguje
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-dark-on-surface">Proč Faces?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mb-4 dark:from-dark-primary dark:to-dark-secondary">
                <CheckCircle className="text-white dark:text-dark-on-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">Rozmanitost & Inspirace</h3>
              <p className="text-gray-600 dark:text-dark-text-medium">Najdete zde tváře všech etnik, věků a stylů, včetně 18+ sekce. Ideální pro projekty, weby i inspiraci.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mb-4 dark:from-dark-primary dark:to-dark-secondary">
                <Award className="text-white dark:text-dark-on-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">100% Originální</h3>
              <p className="text-gray-600 dark:text-dark-text-medium">Každé dílo je originál vytvořený s důrazem na kvalitu a rozmanitost.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full mb-4 dark:from-dark-primary dark:to-dark-secondary">
                <Clock className="text-white dark:text-dark-on-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">Okamžité stažení</h3>
              <p className="text-gray-600 dark:text-dark-text-medium">Po zaplacení ihned obdržíte fotky na e-mail. Bez čekání, bez omezení.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-dark-on-background">Naše díla</h2>
            <Link
              to="/produkty"
              className="text-blue-600 font-medium flex items-center hover:text-blue-700 dark:text-dark-primary dark:hover:text-dark-primary-dark transition-colors duration-200"
            >
              Zobrazit vše <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 size={32} className="animate-spin text-blue-600 dark:text-dark-primary" />
              <p className="ml-4 text-lg text-gray-600 dark:text-dark-text-medium">Načítání děl...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-dark-error">
              <AlertTriangle size={32} className="mx-auto mb-2" />
              <p>{error}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-dark-text-medium">
              <p>Žádná díla k zobrazení.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 dark:bg-dark-primary dark:text-dark-on-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Připraveni začít?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktujte nás ještě dnes a my vám připravíme nabídku na míru vašim potřebám.
          </p>
          <Link
            to="#"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-blue-700 dark:bg-dark-on-primary dark:text-dark-primary dark:hover:bg-dark-surface dark:hover:text-dark-on-surface transition-colors duration-300 inline-block"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
