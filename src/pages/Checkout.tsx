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

// Validation functions
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'E-mail je povinný';
  if (!emailRegex.test(email)) return 'Neplatný formát e-mailu';
  return null;
};

const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^(\+420\s?)?[0-9\s]{9,}$/;
  if (!phone.trim()) return 'Telefon je povinný';
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Neplatný formát telefonu';
  return null;
};

const validateZip = (zip: string, country: string): string | null => {
  if (!zip.trim()) return 'PSČ je povinné';
  
  // Czech postal code validation (5 digits, optionally with space after 3rd digit)
  if (country === 'CZ') {
    const czechZipRegex = /^\d{3}\s?\d{2}$/;
    if (!czechZipRegex.test(zip)) return 'PSČ musí být ve formátu 12345 nebo 123 45';
  }
  // Slovak postal code validation (5 digits, optionally with space after 3rd digit)
  else if (country === 'SK') {
    const slovakZipRegex = /^\d{3}\s?\d{2}$/;
    if (!slovakZipRegex.test(zip)) return 'PSČ musí být ve formátu 12345 nebo 123 45';
  }
  // General validation for other countries (at least 3 digits)
  else {
    const generalZipRegex = /^\d{3,}$/;
    if (!generalZipRegex.test(zip.replace(/\s/g, ''))) return 'PSČ musí obsahovat alespoň 3 číslice';
  }
  
  return null;
};

const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} je povinné`;
  return null;
};

const validateName = (name: string, fieldName: string): string | null => {
  if (!name.trim()) return `${fieldName} je povinné`;
  if (name.trim().length < 2) return `${fieldName} musí mít alespoň 2 znaky`;
  if (!/^[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s-]+$/.test(name)) {
    return `${fieldName} může obsahovat pouze písmena, pomlčky a mezery`;
  }
  return null;
};

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  zip?: string;
}

/**
 * Renders a select input for choosing a country, populated with country names in Czech.
 * @param {Object} props - The component props.
 * @param {string} props.value - The currently selected country code.
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange - The change event handler.
 * @returns {JSX.Element} The CountrySelect component.
 */
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

/**
 * Renders the checkout page, allowing users to enter shipping details and proceed to payment.
 * Handles form state, submission, and interaction with the payment gateway.
 * @returns {JSX.Element | null} The Checkout page component or null if cart is empty.
 */
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  /**
   * Handles changes to form input fields, updating the form state.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - The change event.
   */
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'firstName':
        return validateName(value, 'Jméno');
      case 'lastName':
        return validateName(value, 'Příjmení');
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'street':
        return validateRequired(value, 'Ulice a číslo');
      case 'city':
        return validateName(value, 'Město');
      case 'zip':
        return validateZip(value, formState.country);
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    Object.entries(formState).forEach(([key, value]) => {
      if (key !== 'country') { // Country is always selected, no need to validate
        const error = validateField(key, value);
        if (error) {
          errors[key as keyof ValidationErrors] = error;
          isValid = false;
        }
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  /**
   * Handles the form submission for checkout.
   * Creates an order, initiates the checkout process, and handles potential errors.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate all fields before submission
    if (!validateAllFields()) {
      setError('Prosím opravte chyby ve formuláři před odesláním.');
      return;
    }

    setIsSubmitting(true);

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
      customer_email: formState.email,
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
                    className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                      validationErrors.firstName ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                    }`}
                  />
                  {validationErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                  )}
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
                    className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                      validationErrors.lastName ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                    }`}
                  />
                  {validationErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                  )}
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
                    className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                      validationErrors.email ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
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
                    placeholder="např. +420 123 456 789"
                    className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                      validationErrors.phone ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                    }`}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
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
                    className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                      validationErrors.street ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                    }`}
                  />
                  {validationErrors.street && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.street}</p>
                  )}
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
                      className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                        validationErrors.city ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                      }`}
                    />
                    {validationErrors.city && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                    )}
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
                      placeholder="např. 123 45"
                      className={`w-full border rounded-lg p-2.5 focus:ring-dark-primary focus:border-dark-primary bg-dark-background text-dark-on-background ${
                        validationErrors.zip ? 'border-red-500 dark:border-red-500' : 'dark:border-dark-border'
                      }`}
                    />
                    {validationErrors.zip && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.zip}</p>
                    )}
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
              disabled={isSubmitting || cartItems.length === 0 || Object.values(validationErrors).some(error => error !== null)}
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 ${
                (isSubmitting || cartItems.length === 0 || Object.values(validationErrors).some(error => error !== null))
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
