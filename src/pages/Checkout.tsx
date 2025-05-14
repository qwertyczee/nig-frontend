import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrderAndInitiateCheckout, OrderPayload } from '../services/api'; // Import the API function
import { ShippingAddress, OrderItemInput } from '../types'; // Import necessary types
// import { Check } from 'lucide-react'; // 'Check' is no longer used

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
    country: 'Česká republika', // Assuming a default or add a field for it
    paymentMethod: 'card', // This will be handled by Polar, but keep for now if UI depends on it
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // isComplete state will be handled by redirecting to a success/failure page from Polar
  // For now, we can remove the local 'isComplete' logic or adapt it for the success page.
  // Let's remove the local 'isComplete' for now as Polar handles the post-payment flow.

  if (cartItems.length === 0) { // Removed !isComplete as it's handled by Polar redirects
    navigate('/produkty');
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

    if (formState.paymentMethod !== 'card') {
        // If you want to support other methods directly without Polar, handle them here.
        // For now, assuming 'card' means proceed to Polar.
        // You might want to disable other payment methods or clarify they are not processed via Polar.
        // alert('Pro platbu bankovním převodem vás budeme kontaktovat.');
        // setIsSubmitting(false);
        // return;
        // For this integration, we assume 'card' payment will go to Polar.
        // If other methods are selected, you might want to prevent submission to Polar.
        // However, the backend currently creates a Polar session regardless.
        // This part of the UI/UX might need refinement based on how you want to handle non-Polar payments.
    }

    const shippingAddress: ShippingAddress = {
      full_name: `${formState.firstName} ${formState.lastName}`,
      street: formState.street,
      city: formState.city,
      postal_code: formState.zip,
      country: formState.country, // Make sure 'country' is part of your formState or hardcoded
      phone: formState.phone,
    };

    const orderItems: OrderItemInput[] = cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const orderPayload: OrderPayload = {
      items: orderItems,
      shipping_address: shippingAddress,
      // billing_address: shippingAddress, // Set if different
      customer_email: formState.email, // Add customer email to the payload
    };

    try {
      const response = await createOrderAndInitiateCheckout(orderPayload);
      if (response.checkoutUrl) {
        // Clear cart before redirecting, or on the success page after payment.
        // Clearing here means if user cancels on Polar, cart is empty.
        // Consider clearing on the success page instead.
        // clearCart();
        window.location.href = response.checkoutUrl; // Redirect to Polar
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

  // The 'isComplete' block is removed as success is handled by redirect from Polar.
  // You will create separate /order/success and /order/cancel pages.
  // if (isComplete) {

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
              Doručovací Adresa
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                 <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Země *
                  </label>
                  <input // Or a select dropdown
                    type="text"
                    id="country"
                    name="country"
                    value={formState.country}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment method selection might be simplified if Polar is the only card option */}
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b mt-8 text-gray-800">
              Způsob platby (Přesměrování na Polar)
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
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                {error}
              </div>
            )}

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
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              {isSubmitting ? 'Zpracovávám...' : 'Přejít k platbě (Polar)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
