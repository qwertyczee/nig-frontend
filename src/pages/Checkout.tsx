import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (cartItems.length === 0 && !isComplete) {
    navigate('/produkty');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      clearCart();
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="text-green-600" size={36} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Objednávka dokončena</h1>
          <p className="mb-8 text-gray-600">
            Děkujeme za vaši objednávku. Potvrzení bylo odesláno na váš e-mail.
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
          >
            Zpět na domovskou stránku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Pokladna</h1>

      <div className="lg:flex lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b text-gray-800">
              Kontaktní údaje
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Jméno *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Příjmení *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 pb-2 border-b mt-8 text-gray-800">
              Adresa
            </h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Ulice a číslo *
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formState.street}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Město *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    PSČ *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formState.zip}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 pb-2 border-b mt-8 text-gray-800">
              Způsob platby
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formState.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-700 focus:ring-blue-500"
                />
                <label htmlFor="card" className="ml-2 text-gray-700">
                  Platba kartou
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={formState.paymentMethod === 'bank'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-700 focus:ring-blue-500"
                />
                <label htmlFor="bank" className="ml-2 text-gray-700">
                  Bankovní převod
                </label>
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Poznámka k objednávce
              </label>
              <textarea
                id="note"
                name="note"
                value={formState.note}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
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
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              {isSubmitting ? 'Zpracovávám...' : 'Dokončit objednávku'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
