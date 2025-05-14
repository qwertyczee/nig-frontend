import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-bold text-xl md:text-2xl text-blue-900 transition-colors duration-300">
            PracovníTým
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition-colors duration-200">
              Domů
            </Link>
            <Link to="/produkty" className="text-gray-700 hover:text-blue-700 transition-colors duration-200">
              Služby
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-700 transition-colors duration-200">
              O nás
            </Link>
            <Link to="#" className="text-gray-700 hover:text-blue-700 transition-colors duration-200">
              Kontakt
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-700 transition-colors duration-200">
              <Search size={20} />
            </button>
            <Link to="/kosik" className="p-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="p-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-700 transition-colors duration-200 py-2">
                Domů
              </Link>
              <Link to="/produkty" className="text-gray-700 hover:text-blue-700 transition-colors duration-200 py-2">
                Služby
              </Link>
              <Link to="#" className="text-gray-700 hover:text-blue-700 transition-colors duration-200 py-2">
                O nás
              </Link>
              <Link to="#" className="text-gray-700 hover:text-blue-700 transition-colors duration-200 py-2">
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
