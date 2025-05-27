/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Dark theme palette
        dark: {
          'background': '#121212',
          'surface': '#1E1E1E',
          'primary': '#3B82F6',
          'primary-dark': '#2563EB',
          'secondary': '#047857',
          'error': '#CF6679',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-background': '#FFFFFF',
          'on-surface': '#FFFFFF',
          'on-error': '#000000',
          'text-light': '#E0E0E0',
          'text-medium': '#B0B0B0',
          'text-dark': '#808080',
          'border': '#404040',
          'hover': '#2A2A2A',
          'active': '#3A3A3A',
        },
        // Existing colors (can be adapted or removed if not needed for dark theme)
        blue: {
          50: '#f1f5f9',
          100: '#e2e8f0',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        red: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
};
