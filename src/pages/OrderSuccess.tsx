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
    <div className="container mx-auto mt-10 p-5 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg mb-2">Thank you for your order.</p>
      
      {customerSessionToken && !loading && !error && !orderDetails && (
         <p className="text-md mb-4">
           Attempting to load order details for token: <span className="font-semibold">{customerSessionToken}</span>
         </p>
      )}

      {loading && <p className="text-lg text-blue-500">Loading order details...</p>}
      
      {error && <p className="text-lg text-red-500">Error: {error}</p>}

      {orderDetails && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100 text-left max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Order Confirmation</h2>
          <p><strong>Order ID (Polar Session):</strong> {orderDetails.id}</p>
          {orderDetails.metadata?.internal_order_id && (
            <p><strong>Internal Order Ref:</strong> {orderDetails.metadata.internal_order_id}</p>
          )}
          {orderDetails.status && <p><strong>Status:</strong> <span className="capitalize">{orderDetails.status}</span></p>}
          {orderDetails.customer_email && <p><strong>Email:</strong> {orderDetails.customer_email}</p>}
          {typeof orderDetails.amount_total === 'number' && orderDetails.currency && (
            <p>
              <strong>Total Amount:</strong> {(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
            </p>
          )}

          {orderDetails.line_items && orderDetails.line_items.data && orderDetails.line_items.data.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Items:</h3>
              <ul className="list-disc list-inside">
                {orderDetails.line_items.data.map(item => (
                  <li key={item.id || item.description} className="mb-1">
                    {item.description} - {item.quantity} x {(item.amount_total / 100).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-600">A confirmation email has been sent to you (if applicable).</p>
        </div>
      )}

      <p className="mt-8 mb-6">We have received your payment and your order is being processed.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;