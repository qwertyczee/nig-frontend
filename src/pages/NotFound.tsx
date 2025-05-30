import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden dark:bg-background dark:text-on-background">
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <h1 className="text-9xl md:text-[150px] font-bold mb-4 dark:bg-gradient-to-r dark:from-red-400 dark:via-pink-500 dark:to-orange-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl md:text-3xl dark:text-gray-300 mb-8">
          Oops! Page Not Found
        </p>
        <Link to="/">
          <Button className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-on-secondary">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 