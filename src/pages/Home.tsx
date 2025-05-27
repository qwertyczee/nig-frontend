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
      <section className="relative h-[80vh] max-h-[700px] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-blue-700 dark:from-dark-primary dark:to-dark-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x900?abstract,art")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              Objevte Svět Digitálního Umění
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Prozkoumejte naši exkluzivní kolekci digitálních portrétů a najděte inspiraci pro vaše projekty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/produkty"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Prohlédnout celou galerii <ArrowRight size={20} className="inline-block ml-2" />
              </Link>
              <Link
                to="#jak"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Jak to funguje?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800 dark:text-dark-on-surface">Proč si vybrat Faces?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full mb-6 shadow-md dark:from-dark-primary dark:to-dark-secondary">
                <CheckCircle className="text-white dark:text-dark-on-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-dark-on-surface">Široká Rozmanitost</h3>
              <p className="text-gray-600 dark:text-dark-text-medium leading-relaxed">Nabízíme tváře všech etnik, věků a stylů, včetně exkluzivní 18+ sekce. Ideální pro jakýkoli projekt.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full mb-6 shadow-md dark:from-dark-primary dark:to-dark-secondary">
                <Award className="text-white dark:text-dark-on-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-dark-on-surface">100% Originalita</h3>
              <p className="text-gray-600 dark:text-dark-text-medium leading-relaxed">Každé digitální dílo je unikátní, vytvořené s precizností a důrazem na nejvyšší kvalitu a detail.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-200 dark:bg-dark-background dark:border-dark-border transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full mb-6 shadow-md dark:from-dark-primary dark:to-dark-secondary">
                <Clock className="text-white dark:text-dark-on-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-dark-on-surface">Okamžité Stažení</h3>
              <p className="text-gray-600 dark:text-dark-text-medium leading-relaxed">Získejte přístup k zakoupeným fotkám ihned po zaplacení. Rychle, bezpečně a bez čekání.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-dark-on-background">Nejnovější díla</h2>
            <Link
              to="/produkty"
              className="text-blue-600 font-bold text-lg flex items-center hover:text-blue-700 dark:text-dark-primary dark:hover:text-dark-primary-dark transition-colors duration-200"
            >
              Zobrazit celou kolekci <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 size={48} className="animate-spin text-blue-600 dark:text-dark-primary" />
              <p className="ml-4 text-xl text-gray-600 dark:text-dark-text-medium">Načítání děl...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-dark-error py-10">
              <AlertTriangle size={48} className="mx-auto mb-4" />
              <p className="text-xl">{error}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-dark-text-medium py-10">
              <p className="text-xl">Žádná díla k zobrazení.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-20 dark:bg-dark-primary dark:text-dark-on-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Máte speciální požadavek?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Pokud potřebujete něco na míru, neváhejte nás kontaktovat. Rádi vám pomůžeme s vaším projektem.
          </p>
          <Link
            to="#"
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:text-blue-700 transition-colors duration-300 inline-block shadow-lg transform hover:scale-105"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
