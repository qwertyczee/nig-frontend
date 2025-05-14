import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { ArrowRight, CheckCircle, Clock, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] max-h-[600px] flex items-center bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Profesionální služby pro váš úspěch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Dodáváme kvalitní pracovníky a služby pro firmy i domácnosti
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produkty"
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Prohlédnout služby
              </Link>
              <Link
                to="#"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                Více informací
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Proč zvolit naše služby?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <CheckCircle className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ověřená kvalita</h3>
              <p className="text-gray-600">
                Všechny naše služby procházejí přísným výběrovým řízením a kontrolou kvality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Clock className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Flexibilní řešení</h3>
              <p className="text-gray-600">
                Přizpůsobíme se vašim požadavkům a časovým možnostem.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Award className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Záruka spokojenosti</h3>
              <p className="text-gray-600">
                Garantujeme 100% spokojenost s našimi službami nebo vrátíme peníze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Naše služby</h2>
            <Link 
              to="/produkty" 
              className="text-blue-700 font-medium flex items-center hover:text-blue-800 transition-colors duration-200"
            >
              Zobrazit vše <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Připraveni začít?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktujte nás ještě dnes a my vám připravíme nabídku na míru vašim potřebám.
          </p>
          <Link
            to="#"
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-block"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
