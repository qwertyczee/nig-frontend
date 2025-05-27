import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-background text-dark-on-background border-t border-dark-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-dark-primary via-dark-secondary to-blue-500 bg-clip-text text-transparent">Faces</h3>
            <p className="text-dark-text-medium mb-4">Unikátní generované fotografie lidí všech etnik a stylů. Vhodné pro projekty, weby i inspiraci.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Facebook size={20} /></a>
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Instagram size={20} /></a>
              <a href="#" className="text-dark-primary hover:text-dark-secondary transition-colors duration-200"><Twitter size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategorie</h3>
            <ul className="space-y-2">
              <li><span className="text-dark-text-medium">Afričané</span></li>
              <li><span className="text-dark-text-medium">Asiaté</span></li>
              <li><span className="text-dark-text-medium">Evropané</span></li>
              <li><span className="text-dark-text-medium">Latino</span></li>
              <li><span className="text-dark-text-medium">18+</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">O projektu</h3>
            <ul className="space-y-2">
              <li><span className="text-dark-text-medium">Generované fotky</span></li>
              <li><span className="text-dark-text-medium">Etická pravidla</span></li>
              <li><span className="text-dark-text-medium">Inspirace</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <address className="not-italic text-dark-text-medium">
              <p>Faces</p>
              <p>Virtuální svět</p>
              <p>info@faces.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-dark-border mt-8 pt-8 text-dark-text-dark text-sm">
          <p>&copy; {currentYear} Faces. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
