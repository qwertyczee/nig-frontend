import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Define a basic type for order details, adjust based on actual API response
interface OrderDetails {
  id: string;
  amount_total?: number; // Assuming this is in cents from Polar
  currency?: string;
  customer_email?: string;
  status?: string;
  // Add other fields you expect, e.g., line_items or metadata
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
    [key: string]: string | number | boolean | null | undefined; // Be more specific for metadata values
  };
  // Fallback for any other properties
  [key: string]: unknown; // Use unknown for better type safety
}

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
      const fetchOrderDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          // Ensure your backend is running on the correct port or use full URL
          // For local dev, if frontend is on 5173 and backend on 3000, proxy or full URL is needed.
          // Assuming vite proxy is set up or using relative path if on same domain.
          const response = await fetch(`/api/orders/by-session/${token}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
          }
          const data: OrderDetails = await response.json();
          setOrderDetails(data);
        } catch (err: unknown) { // Use unknown for caught errors
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
    <div className="container mx-auto mt-10 p-5 text-center bg-white text-gray-900 dark:bg-dark-background dark:text-dark-on-background min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-dark-secondary mb-4">Platba proběhla úspěšně!</h1>
      <p className="text-lg mb-2 text-gray-700 dark:text-dark-text-light">Děkujeme za vaši objednávku.</p>
      
      {customerSessionToken && !loading && !error && !orderDetails && (
         <p className="text-md mb-4 text-gray-600 dark:text-dark-text-medium">
           Načítání detailů objednávky pro token: <span className="font-semibold">{customerSessionToken}</span>
         </p>
      )}

      {loading && <p className="text-lg text-blue-600 dark:text-dark-primary">Načítání detailů objednávky...</p>}
      
      {error && <p className="text-lg text-red-600 dark:text-dark-error">Chyba: {error}</p>}

      {orderDetails && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white text-left max-w-2xl mx-auto text-gray-800 dark:border-dark-border dark:rounded-lg dark:bg-dark-surface dark:text-left dark:max-w-2xl dark:mx-auto dark:text-dark-text-light">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-dark-on-surface">Potvrzení objednávky</h2>
          <p className="text-gray-700 dark:text-dark-text-light"><strong>ID objednávky (Polar Session):</strong> {orderDetails.id}</p>
          {orderDetails.metadata?.internal_order_id && (
            <p className="text-gray-700 dark:text-dark-text-light"><strong>Interní reference objednávky:</strong> {orderDetails.metadata.internal_order_id}</p>
          )}
          {orderDetails.status && <p className="text-gray-700 dark:text-dark-text-light"><strong>Stav:</strong> <span className="capitalize">{orderDetails.status}</span></p>}
          {orderDetails.customer_email && <p className="text-gray-700 dark:text-dark-text-light"><strong>E-mail:</strong> {orderDetails.customer_email}</p>}
          {typeof orderDetails.amount_total === 'number' && orderDetails.currency && (
            <p className="text-gray-700 dark:text-dark-text-light">
              <strong>Celková částka:</strong> {(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
            </p>
          )}

          {orderDetails.line_items && orderDetails.line_items.data && orderDetails.line_items.data.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-dark-on-surface">Položky objednávky:</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-light">
                {orderDetails.line_items.data.map(item => (
                  <li key={item.id || item.description} className="mb-1">
                    {item.description} - {item.quantity} x {(item.amount_total / 100).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-600 dark:text-dark-text-medium">Potvrzovací e-mail vám byl zaslán (pokud je to relevantní).</p>
        </div>
      )}

      <p className="mt-8 mb-6 text-gray-700 dark:text-dark-text-light">Vaše platba byla přijata a vaše díla jsou připravena ke stažení.</p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out dark:bg-dark-primary dark:hover:bg-dark-primary-dark dark:text-dark-on-primary"
      >
        Pokračovat v nákupu
      </Link>
    </div>
  );
};

export default OrderSuccess;