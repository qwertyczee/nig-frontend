import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-100 shadow-lg dark:bg-dark-surface' : 'bg-white dark:bg-dark-background'} border-b border-gray-200 dark:border-dark-border`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-dark-primary dark:via-dark-secondary dark:to-blue-500 bg-clip-text text-transparent tracking-tight">
            SlavesOnline
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors duration-200">Fotky</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 text-gray-600 hover:text-blue-600 dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors duration-200 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center dark:bg-dark-primary dark:text-dark-on-primary">{totalItems}</span>
              )}
            </Link>
            <button className="p-2 text-gray-600 hover:text-blue-600 dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors duration-200 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-200 dark:bg-dark-surface dark:border-dark-border animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-gray-600 hover:text-blue-600 dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors duration-200 py-2">Fotky</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
