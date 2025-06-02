import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Trash2, MinusCircle, PlusCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders the shopping cart page, displaying items in the cart,
 * allowing quantity updates, item removal, and navigation to checkout.
 * @returns {JSX.Element} The Cart page component.
 */
const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-dark-background text-dark-on-background min-h-[60vh]">
        <Card className="w-full max-w-md mx-auto bg-dark-surface border border-dark-border">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-dark-on-surface">Váš košík</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-8 text-dark-text-medium">Váš košík je prázdný.</p>
            <Link
              to="/products"
              className="inline-flex items-center font-semibold transition-colors duration-300 bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary py-2 px-4 rounded-md"
            >
              <ArrowLeft size={16} className="mr-2" />
              Prohlédnout díla
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-dark-background text-dark-on-background">
      <h1 className="text-3xl font-bold mb-8 text-dark-on-background">Váš košík</h1>

      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3">
          <Card className="rounded-lg shadow-sm overflow-hidden mb-6 border border-dark-border bg-dark-surface">
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200 dark:divide-dark-border">
                {cartItems.map(item => (
                  <li key={item.product.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                        <img
                          src={item.product.main_image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="sm:ml-6 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="text-lg font-medium text-dark-on-surface mb-2 sm:mb-0">
                            {item.product.name}
                          </h3>
                          
                          <p className="text-dark-primary font-semibold">
                            {item.product.price} Kč
                          </p>
                        </div>
                        
                        <p className="text-dark-text-medium text-sm mb-4">
                          Dílo: {item.product.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200"
                              aria-label="Snížit množství"
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle size={16} />
                            </Button>
                            <span className="mx-3 text-dark-on-surface">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-dark-text-medium hover:text-dark-primary transition-colors duration-200"
                              aria-label="Zvýšit množství"
                            >
                              <PlusCircle size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-dark-error hover:text-red-700 transition-colors duration-200 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            <span className="hidden sm:inline">Odstranit</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/products')}
              className="border dark:border-dark-border hover:bg-dark-hover text-dark-text-light py-2 px-4 rounded-lg font-medium inline-flex items-center justify-center transition-colors duration-300"
            >
              <ArrowLeft size={16} className="mr-2" />
              Pokračovat v nákupu
            </Button>
          </div>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <Card className="rounded-lg shadow-sm p-6 sticky top-24 border border-dark-border bg-dark-surface">
            <CardHeader className="p-0 mb-4 pb-4 border-b border-dark-border">
              <CardTitle className="text-xl font-semibold text-dark-on-surface">Shrnutí objednávky</CardTitle>
            </CardHeader>
            
            <CardContent className="p-0 space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-dark-text-light">
                  <span>
                    {item.product.name} ({item.quantity}x)
                  </span>
                  <span>{item.product.price * item.quantity} Kč</span>
                </div>
              ))}
            </CardContent>
            
            <CardFooter className="p-0 border-t border-dark-border pt-4 mb-6 flex-col items-stretch">
              <div className="flex justify-between font-bold text-dark-on-surface mb-1">
                <span>Celkem</span>
                <span>{totalPrice} Kč</span>
              </div>
              <p className="text-sm text-dark-text-medium">Včetně DPH</p>
            </CardFooter>
            
            <Button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300 bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary"
            >
              Pokračovat k platbě
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
