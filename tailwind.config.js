/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    colors: {
      'background': '#121212',
      'surface': '#1E1E1E',
      'primary': '#3B82F6',
      'primary-dark': '#2563EB',
      'secondary': '#047857',
      'error': '#CF6679',
      'on-primary': '#FFFFFF',
      'on-secondary': '#FFFFFF',
      'on-background': '#E0E0E0',
      'on-surface': '#E0E0E0',
      'on-error': '#000000',
      'gray': {
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      'blue': {
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
      'purple': {
        500: '#A855F7',
        600: '#9333EA',
        700: '#7E22CE',
        900: '#581C87',
      },
      'pink': {
        500: '#EC4899',
        600: '#DB2777',
      },
      'red': {
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#b91c1c',
      },
      'green': {
        600: '#059669',
      },
    },
    extend: {
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
