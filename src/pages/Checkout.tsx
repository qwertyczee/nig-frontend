import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrderAndInitiateCheckout, OrderPayload } from '../services/api'; // Import the API function
import { ShippingAddress, OrderItemInput } from '../types'; // Import necessary types
import countries from 'i18n-iso-countries';
import cs from 'i18n-iso-countries/langs/cs.json';

declare global {
  interface Window {
    Lemon?: { open: (url: string) => void };
  }
}

countries.registerLocale(cs);

function CountrySelect({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  const countryOptions = Object.entries(countries.getNames('cs', { select: 'official' }))
    .map(([code, name]) => ({ code, name }));
  return (
    <select
      id="country"
      name="country"
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
    >
      {countryOptions.map((c) => (
        <option key={c.code} value={c.code}>{c.name}</option>
      ))}
    </select>
  );
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice /* clearCart */ } = useCart(); // clearCart removed as it's not used here
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    country: 'CZ',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const shippingAddress: ShippingAddress = {
      full_name: `${formState.firstName} ${formState.lastName}`,
      street: formState.street,
      city: formState.city,
      postal_code: formState.zip,
      country: formState.country,
      phone: formState.phone,
    };

    const orderItems: OrderItemInput[] = cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const orderPayload: OrderPayload = {
      items: orderItems,
      shipping_address: shippingAddress,
      billing_address: shippingAddress,
      customer_email: formState.email, // Add customer email to the payload
    };

    try {
      const response = await createOrderAndInitiateCheckout(orderPayload);
      if (response.checkoutUrl) {
        // Try to open LemonSqueezy overlay
        if (window.Lemon && typeof window.Lemon.open === 'function') {
          window.Lemon.open(response.checkoutUrl);
        } else {
          window.location.href = response.checkoutUrl;
        }
      } else {
        setError('Nepodařilo se získat odkaz pro platbu. Zkuste to prosím znovu.');
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Došlo k neznámé chybě při vytváření objednávky. Zkuste to prosím znovu.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-dark-on-background">Pokladna</h1>

      <div className="lg:flex lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-gray-800 dark:border-dark-border dark:text-dark-on-surface">
              Kontaktní údaje
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                  Jméno *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                  Příjmení *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 mt-8 text-gray-800 dark:border-dark-border dark:mt-8 dark:text-dark-on-surface">
              Adresa
            </h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                  Ulice a číslo *
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formState.street}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                    Město *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                    PSČ *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formState.zip}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 dark:border-dark-border dark:rounded-lg dark:p-2.5 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-background dark:text-dark-on-background"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-dark-text-light mb-1">
                    Země *
                  </label>
                  <CountrySelect value={formState.country} onChange={handleChange} />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 border border-gray-200 dark:bg-dark-surface dark:border-dark-border">
            <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200 text-gray-800 dark:border-dark-border dark:text-dark-on-surface">
              Shrnutí objednávky
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-600 text-white border border-red-600 rounded-lg dark:bg-dark-error dark:text-dark-on-error dark:border-dark-error dark:rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-gray-700 dark:text-dark-text-light">
                  <span>
                    {item.product.name} ({item.quantity}x)
                  </span>
                  <span>{item.product.price * item.quantity} Kč</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6 dark:border-dark-border dark:pt-4 dark:mb-6">
              <div className="flex justify-between font-bold text-gray-800 dark:text-dark-on-surface">
                <span>Celkem</span>
                <span>{totalPrice} Kč</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 dark:text-dark-text-medium">Včetně DPH</p>
            </div>
            
            {/* The button inside the form will trigger the form's onSubmit */}
            {/* So, this button should ideally be part of the form or trigger the form's submit programmatically */}
            {/* For simplicity, if this button is outside the <form> tag, ensure its onClick calls the same handleSubmit */}
            {/* Or, better, make it a submit button for the form if it's meant to submit the form. */}
            {/* The current structure has the button outside the <form> but its onClick calls the same handleSubmit. */}
            {/* Let's assume the main button is the one in the form summary section */}
            <button
              // type="submit" // If this button is intended to submit the form, it should be inside the <form> or form.submit() should be called
              onClick={handleSubmit} // This works because handleSubmit is defined in the component scope
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${
                (isSubmitting || cartItems.length === 0)
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:cursor-not-allowed dark:text-dark-text-dark'
                  : 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary'
              }`}
            >
              {isSubmitting ? 'Zpracovávám...' : 'Přejít k platbě'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
