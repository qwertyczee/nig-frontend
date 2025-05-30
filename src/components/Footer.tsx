import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-background text-dark-on-background border-t dark:border-dark-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary bg-clip-text text-transparent">SlavesOnline</h3>
            <p className="text-dark-text-medium mb-4">Unikátní fotografie lidí všech etnik a stylů. Vhodné pro projekty, weby i inspiraci.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Facebook size={20} /></a>
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Instagram size={20} /></a>
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Twitter size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-on-surface">Kategorie</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=Afričané" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Afričané</Link></li>
              <li><Link to="/products?category=Asiaté" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Asiaté</Link></li>
              <li><Link to="/products?category=Evropané" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Evropané</Link></li>
              <li><Link to="/products?category=Latino" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Latino</Link></li>
              <li><Link to="/products?type=nsfw" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">18+</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-on-surface">O projektu</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Fotky</Link></li>
              <li><Link to="/about/ethical-rules" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Etická pravidla</Link></li>
              <li><Link to="/about/inspiration" className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200">Inspirace</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark-on-surface">Kontakt</h3>
            <address className="not-italic text-dark-text-medium">
              <p>SlavesOnline</p>
              <p>info@slavesonline.com</p>
            </address>
          </div>
        </div>
        <div className="border-t dark:border-dark-border mt-8 pt-8 text-dark-text-dark text-sm">
          <p>&copy; {currentYear} SlavesOnline. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
