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
  Download,
  Shield,
  Star,
  Zap,
  Palette,
  Heart,
  Globe
} from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

/**
 * Renders the home page of the application, featuring a hero section,
 * product display, feature highlights, and testimonials.
 * @returns {JSX.Element} The Home page component.
 */
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches products from the API and updates the component state.
   * Handles loading and error states during the data fetching process.
   */
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message || 'Nepodařilo se načíst galerii.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);


  const features = [
    {
      icon: Download,
      title: 'Okamžité stažení',
      description: 'Vaše zakoupené dílo získáte ihned po zaplacení. Soubory ve vysokém rozlišení připravené k použití.'
    },
    {
      icon: Shield,
      title: 'Bezpečnost a kvalita',
      description: 'Každé dílo prochází pečlivým výběrem a splňuje naše vysoké standardy pro uměleckou dokonalost.'
    },
    {
      icon: Palette,
      title: 'Rozmanitost stylů',
      description: 'Od klasických portrétů po moderní konceptuální umění. Najděte přesně to, co hledáte.'
    },
    {
      icon: Globe,
      title: 'Mezinárodní kvalita',
      description: 'Práce od talentovaných umělců z celého světa, připravené pro komerční i osobní použití.'
    },
    {
      icon: Zap,
      title: 'Rychlé zpracování',
      description: 'Automatizované zpracování objednávek zajišťuje okamžité dodání vašich nákupů.'
    },
    {
      icon: Heart,
      title: 'Zákaznická podpora',
      description: 'Náš tým je tu pro vás 24/7. Pomůžeme s výběrem i technickou podporou.'
    }
  ];

  const testimonials = [
    {
      name: 'Anna Nováková',
      role: 'Grafická designérka',
      text: 'Kvalita obrázků je výjimečná. Používám je pravidelně pro své klienty a vždy jsou nadšení.',
      rating: 5
    },
    {
      name: 'Martin Svoboda',
      role: 'Majitel reklamní agentury',
      text: 'Skvělý výběr a profesionální kvalita. Úspora času i peněz oproti tradičnímu focení.',
      rating: 5
    },
    {
      name: 'Klára Dvořáková',
      role: 'Freelance fotografka',
      text: 'Inspirativní kolekce, která mi pomáhá při vlastních projektech. Doporučuji!',
      rating: 5
    }
  ];

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen dark:bg-background dark:text-on-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg"
            alt="Professional Photography Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-background/90 dark:via-background/70 dark:to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 dark:bg-gradient-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent leading-tight">
            Profesionální digitální<br />fotografie & umění
          </h1>
          <p className="text-xl md:text-2xl dark:text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Objevte působivé digitální umění a profesionální fotografii od talentovaných umělců. 
            Vysoká kvalita, okamžité stažení, neomezené možnosti využití.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/products"
              className="group px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-white shadow-2xl hover:shadow-blue-500/25"
            >
              Prozkoumat galerii 
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Button 
              variant="outline" 
              className="px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 border-2 dark:border-gray-300 dark:hover:border-white dark:text-gray-200 dark:hover:text-white dark:hover:bg-white/10 backdrop-blur-sm"
            >
              Jak to funguje
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="dark:text-green-400" />
              <span>Okamžité stažení</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} className="dark:text-blue-400" />
              <span>Bezpečné platby</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="dark:text-yellow-400" />
              <span>Profesionální kvalita</span>
            </div>
          </div>
        </div>

        {/* Age Verification Notice */}
        <Card className="absolute bottom-8 left-8 p-4 max-w-sm dark:bg-red-900/30 dark:border dark:border-red-500/50 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 dark:text-red-300 mb-2">
            <Shield size={20} />
            <span className="font-semibold">Obsah 18+</span>
          </div>
          <CardContent className="p-0 text-sm dark:text-red-200">
            Některý obsah je určen pouze pro dospělé. Vyžaduje ověření věku.
          </CardContent>
        </Card>
      </section>

      {/* Featured Products */}
      <section className="py-20 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Doporučujeme</h2>
            <p className="text-xl dark:text-gray-400 max-w-2xl mx-auto">
              Ručně vybraná mistrovská díla od našich nejtalentovanějších fotografů a digitálních umělců
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin dark:text-blue-500" size={48} />
            </div>
          ) : error ? (
            <Card className="text-center py-20 dark:bg-red-900/20 border border-red-500/50">
              <CardContent>
                <AlertTriangle className="mx-auto dark:text-red-400 mb-4" size={48} />
                <p className="dark:text-red-300 text-lg">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-white shadow-2xl hover:shadow-blue-500/25"
            >
              Zobrazit celou galerii 
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 dark:bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Proč si vybrat nás</h2>
            <p className="text-xl dark:text-gray-400 max-w-2xl mx-auto">
              Prémiové digitální umění s bezkonkurenční kvalitou a servisem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group p-8 rounded-xl transition-all duration-300 dark:bg-gray-800/50 dark:border dark:border-gray-700/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:scale-105 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="w-20 h-20 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <feature.icon size={36} className="dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                  <p className="dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Co říkají naši klienti</h2>
            <p className="text-xl dark:text-gray-400">Přesvědčte se sami o kvalitě našich služeb</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 rounded-xl dark:bg-gray-800/50 backdrop-blur-sm border-0 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="yellow" strokeWidth={0} className="dark:text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold dark:text-white">{testimonial.name}</div>
                    <div className="text-sm dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
            Začněte objevovat už dnes
          </h2>
          <p className="text-xl dark:text-gray-200 mb-8 leading-relaxed">
            Připojte se k tisícům spokojených zákazníků a objevte nekonečné možnosti 
            našeho digitálního umění a profesionální fotografie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 shadow-2xl"
            >
              Procházet galerii
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;