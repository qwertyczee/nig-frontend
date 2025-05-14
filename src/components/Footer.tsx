import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PracovníTým</h3>
            <p className="text-blue-100 mb-4">
              Profesionální služby pro firmy i jednotlivce. Kvalita a spolehlivost na prvním místě.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Služby</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produkty" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Úklidové služby
                </Link>
              </li>
              <li>
                <Link to="/produkty" className="text-blue-100 hover:text-white transition-colors duration-200">
                  IT Konzultace
                </Link>
              </li>
              <li>
                <Link to="/produkty" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Zahradnictví
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Informace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Obchodní podmínky
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Ochrana soukromí
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  Kariéra
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="not-italic text-blue-100">
              <p>PracovníTým s.r.o.</p>
              <p>Dlouhá 123</p>
              <p>110 00 Praha 1</p>
              <p className="mt-2">+420 123 456 789</p>
              <p>info@pracovnitym.cz</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-blue-200 text-sm">
          <p>&copy; {currentYear} PracovníTým s.r.o. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
