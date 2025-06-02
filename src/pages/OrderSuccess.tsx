import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderDetails {
  id: string;
  amount_total?: number;
  currency?: string;
  customer_email?: string;
  status?: string;
  line_items?: {
    data: Array<{
      id: string;
      description: string;
      quantity: number;
      amount_total: number; // in cents
    }>;
  };
  metadata?: {
    internal_order_id?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  [key: string]: unknown;
}

/**
 * Renders the order success page, displaying details of a successful order
 * fetched using a customer session token from the URL.
 * @returns {JSX.Element} The OrderSuccess page component.
 */
const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const [customerSessionToken, setCustomerSessionToken] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('customer_session_token');
    setCustomerSessionToken(token);

    if (token) {
      /**
       * Fetches order details from the backend using the customer session token.
       * Handles loading, error states, and updates the order details state.
       */
      const fetchOrderDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/orders/by-session/${token}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
          }
          const data: OrderDetails = await response.json();
          setOrderDetails(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred while fetching order details.');
          }
          console.error("Fetch order details error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [location.search]);

  return (
    <div className="container mx-auto mt-10 p-5 text-center bg-dark-background text-dark-on-background min-h-screen">
      <Card className="w-full max-w-2xl mx-auto bg-dark-surface border border-dark-border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-dark-secondary mb-4 text-center">Platba proběhla úspěšně!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2 text-dark-text-light">Děkujeme za vaši objednávku.</p>
          
          {customerSessionToken && !loading && !error && !orderDetails && (
            <p className="text-md mb-4 text-dark-text-medium">
              Načítání detailů objednávky pro token: <span className="font-semibold">{customerSessionToken}</span>
            </p>
          )}

          {loading && <p className="text-lg text-dark-primary">Načítání detailů objednávky...</p>}
          
          {error && <p className="text-lg text-dark-error">Chyba: {error}</p>}

          {orderDetails && (
            <div className="mt-6 p-4 border border-dark-border rounded-lg bg-dark-background/50 text-left dark:text-dark-text-light">
              <h2 className="text-2xl font-semibold mb-3 text-dark-on-surface">Potvrzení objednávky</h2>
              <p className="text-dark-text-light"><strong>ID objednávky:</strong> {orderDetails.id}</p>
              {orderDetails.metadata?.internal_order_id && (
                <p className="text-dark-text-light"><strong>Interní reference objednávky:</strong> {orderDetails.metadata.internal_order_id}</p>
              )}
              {orderDetails.status && <p className="text-dark-text-light"><strong>Stav:</strong> <span className="capitalize">{orderDetails.status}</span></p>}
              {orderDetails.customer_email && <p className="text-dark-text-light"><strong>E-mail:</strong> {orderDetails.customer_email}</p>}
              {typeof orderDetails.amount_total === 'number' && orderDetails.currency && (
                <p className="text-dark-text-light">
                  <strong>Celková částka:</strong> {(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
                </p>
              )}

              {orderDetails.line_items && orderDetails.line_items.data && orderDetails.line_items.data.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-dark-on-surface">Položky objednávky:</h3>
                  <ul className="list-disc list-inside text-dark-text-light">
                    {orderDetails.line_items.data.map(item => (
                      <li key={item.id || item.description} className="mb-1">
                        {item.description} - {item.quantity} x {(item.amount_total / 100).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-4 text-sm text-dark-text-medium">Potvrzovací e-mail vám byl zaslán (pokud je to relevantní).</p>
            </div>
          )}

          <p className="mt-8 mb-6 text-dark-text-light">Vaše platba byla přijata a vaše díla jsou připravena ke stažení.</p>
          <Link to="/" className="inline-block">
            <Button
              className="font-bold py-2 px-4 rounded transition duration-150 ease-in-out bg-dark-primary hover:bg-dark-primary-dark text-dark-on-primary"
            >
              Pokračovat v nákupu
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;