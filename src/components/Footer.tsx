import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background border-t border-gray-200 dark:border-dark-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-primary">SlavesOnline</h3>
            <p className="text-gray-600 mb-4 dark:text-dark-text-medium">Unikátní generované fotografie lidí všech etnik a stylů. Vhodné pro projekty, weby i inspiraci.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-dark-primary dark:hover:text-dark-secondary"><Facebook size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-dark-primary dark:hover:text-dark-secondary"><Instagram size={20} /></a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 dark:text-dark-primary dark:hover:text-dark-secondary"><Twitter size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-on-surface">Kategorie</h3>
            <ul className="space-y-2 text-gray-700 dark:text-dark-text-medium">
              <li><span>Afričané</span></li>
              <li><span>Asiaté</span></li>
              <li><span>Evropané</span></li>
              <li><span>Latino</span></li>
              <li><span>18+</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-on-surface">O projektu</h3>
            <ul className="space-y-2 text-gray-700 dark:text-dark-text-medium">
              <li><span>Generované fotky</span></li>
              <li><span>Etická pravidla</span></li>
              <li><span>Inspirace</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-on-surface">Kontakt</h3>
            <address className="not-italic text-gray-700 dark:text-dark-text-medium">
              <p>SlavesOnline</p>
              <p>Virtuální svět</p>
              <p>info@slavesonline.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-gray-500 text-sm dark:border-dark-border dark:mt-8 dark:pt-8 dark:text-dark-text-dark dark:text-sm">
          <p>&copy; {currentYear} SlavesOnline. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
