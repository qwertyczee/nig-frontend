import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { createOrderAndInitiateCheckout, OrderPayload } from '../services/api';
import { ShippingAddress, OrderItemInput } from '../types';
import countries from 'i18n-iso-countries';
import cs from 'i18n-iso-countries/langs/cs.json';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

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
      className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
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
    <div className="container mx-auto px-4 py-12 bg-dark-background text-dark-on-background">
      <h1 className="text-3xl font-bold mb-8 text-dark-on-background">Pokladna</h1>

      <div className="lg:flex lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="bg-dark-surface rounded-lg shadow-sm p-6 border border-dark-border">
            <CardHeader className="p-0 mb-6 pb-2 border-b border-dark-border">
              <CardTitle className="text-xl font-semibold text-dark-on-surface">Kontaktní údaje</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-dark-text-light mb-1">
                    Jméno *
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-dark-text-light mb-1">
                    Příjmení *
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-text-light mb-1">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-text-light mb-1">
                    Telefon *
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                  />
                </div>
              </div>
            </CardContent>

            <CardHeader className="p-0 mb-6 pb-2 border-b border-dark-border mt-8">
              <CardTitle className="text-xl font-semibold text-dark-on-surface">Adresa</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-dark-text-light mb-1">
                    Ulice a číslo *
                  </label>
                  <Input
                    type="text"
                    id="street"
                    name="street"
                    value={formState.street}
                    onChange={handleChange}
                    required
                    className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-dark-text-light mb-1">
                      Město *
                    </label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      value={formState.city}
                      onChange={handleChange}
                      required
                      className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-dark-text-light mb-1">
                      PSČ *
                    </label>
                    <Input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formState.zip}
                      onChange={handleChange}
                      required
                      className="w-full border dark:border-dark-border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-dark-text-light mb-1">
                      Země *
                    </label>
                    <CountrySelect value={formState.country} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </CardContent>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <Card className="bg-dark-surface rounded-lg shadow-sm p-6 sticky top-24 border border-dark-border">
            <CardHeader className="p-0 mb-4 pb-4 border-b border-dark-border">
              <CardTitle className="text-xl font-semibold text-dark-on-surface">Shrnutí objednávky</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {error && (
                <div className="mb-4 p-3 bg-dark-error text-dark-on-error border dark:border-dark-error rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-dark-text-light">
                    <span>
                      {item.product.name} ({item.quantity}x)
                    </span>
                    <span>{item.product.price * item.quantity} Kč</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-0 border-t border-dark-border pt-4 mb-6 flex-col items-stretch">
              <div className="flex justify-between font-bold text-dark-on-surface mb-1">
                <span>Celkem</span>
                <span>{totalPrice} Kč</span>
              </div>
              <p className="text-sm text-dark-text-medium">Včetně DPH</p>
            </CardFooter>

            <Button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${
                (isSubmitting || cartItems.length === 0)
                  ? 'bg-gray-700 cursor-not-allowed text-dark-text-dark'
                  : 'bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary'
              }`}
              form="checkout-form"
            >
              {isSubmitting ? 'Zpracovávám...' : 'Přejít k platbě'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
