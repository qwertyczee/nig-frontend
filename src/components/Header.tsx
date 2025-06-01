import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from "./ui/button";

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-surface shadow-lg' : 'bg-dark-background'} border-b border-dark-border`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary bg-clip-text text-transparent tracking-tight">
            SlavesOnline
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-dark-on-surface">
            <Link to="/products" className="hover:text-dark-primary transition-colors duration-200">Vše</Link>
            <Link to="/products?category=černí" className="hover:text-dark-primary transition-colors duration-200">Černí</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 text-dark-on-surface hover:text-dark-primary transition-colors duration-200 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark-primary text-dark-on-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </Link>
            <Button variant="ghost" className="p-2 text-dark-on-surface hover:text-dark-primary transition-colors duration-200 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-surface border-t border-dark-border animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 text-dark-on-surface">
              <Link to="/products" className="hover:text-dark-primary transition-colors duration-200 py-2">Shop All</Link>
              <Link to="/products?category=black" className="hover:text-dark-primary transition-colors duration-200 py-2">Black</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
