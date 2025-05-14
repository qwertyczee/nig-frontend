import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import OrderSuccessPage from './pages/OrderSuccessPage'; // You'll need to create this
// import OrderCancelledPage from './pages/OrderCancelledPage'; // You'll need to create this
import { CartProvider, useCart } from './context/CartContext'; // Import useCart

// Placeholder components - create actual files for these
const OrderSuccessPage = () => {
  const { clearCart } = useCart(); // Now correctly uses the imported useCart
  React.useEffect(() => {
    // Potentially fetch order details based on URL params from Polar
    // e.g., const queryParams = new URLSearchParams(window.location.search);
    // const polarSessionId = queryParams.get('polar_session_id');
    // if (polarSessionId) { /* fetch order by polarSessionId or your internal ID */ }
    clearCart(); // Clear the cart on successful order
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Objednávka úspěšně zaplacena!</h1>
      <p>Děkujeme za váš nákup.</p>
      <button onClick={() => window.location.href='/'} className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">
        Zpět na domovskou stránku
      </button>
    </div>
  );
};

const OrderCancelledPage = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-2xl font-bold mb-4">Platba byla zrušena</h1>
    <p>Vaše objednávka nebyla dokončena. Můžete se vrátit do košíku a zkusit to znovu.</p>
    <button onClick={() => window.location.href='/kosik'} className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">
      Zpět do košíku
    </button>
  </div>
);


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produkty" element={<Products />} />
              <Route path="/produkt/:id" element={<ProductDetail />} />
              <Route path="/kosik" element={<Cart />} />
              <Route path="/pokladna" element={<Checkout />} />
              <Route path="/order/success" element={<OrderSuccessPage />} />
              <Route path="/order/cancelled" element={<OrderCancelledPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

// Removed the local incorrect useCart definition

export default App;
