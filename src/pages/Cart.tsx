import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, MinusCircle, PlusCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Váš košík</h1>
        <p className="mb-8 text-gray-600">Váš košík je prázdný.</p>
        <Link
          to="/produkty"
          className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold inline-flex items-center transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Prohlédnout služby
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Váš košík</h1>

      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.product.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 sm:mb-0">
                          {item.product.name}
                        </h3>
                        
                        <p className="text-blue-900 font-semibold">
                          {item.product.price} Kč
                        </p>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {item.product.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
                            aria-label="Snížit množství"
                          >
                            <MinusCircle size={16} />
                          </button>
                          <span className="mx-3">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
                            aria-label="Zvýšit množství"
                          >
                            <PlusCircle size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          <span className="hidden sm:inline">Odstranit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              onClick={() => navigate('/produkty')}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium inline-flex items-center justify-center transition-colors duration-300"
            >
              <ArrowLeft size={16} className="mr-2" />
              Pokračovat v nákupu
            </button>
          </div>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 pb-4 border-b text-gray-800">
              Shrnutí objednávky
            </h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-gray-700">
                  <span>
                    {item.product.name} ({item.quantity}x)
                  </span>
                  <span>{item.product.price * item.quantity} Kč</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Celkem</span>
                <span>{totalPrice} Kč</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Včetně DPH</p>
            </div>
            
            <button
              onClick={() => navigate('/pokladna')}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              Pokračovat k platbě
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
