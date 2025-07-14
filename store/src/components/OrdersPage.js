import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContextProvider';

const OrdersPage = () => {
  const { user,token} = useStateContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current user:", user);
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/user/${user?.id}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Could not load orders. Please try again later.');
      }
    };

    if (user?.id) fetchOrders();
  }, [user,token]);

  if (!user) return <div className="p-6 text-center">Please log in to view your orders.</div>;

  return (
    <section className="max-w-4xl mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {orders.length === 0 && !error ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
  <div key={order._id || order.id} className="border p-4 rounded shadow">
    <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold">Order #{order._id || order.id}</h3>
        <p className="text-sm text-gray-500">Status: <span className="capitalize">{order.status}</span></p>
      </div>
      <span className="text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleDateString()}
      </span>
    </div>

    <div>
      {order.items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm border-b py-1">
          <span>{item.cakeId} x {item.quantity}</span>
          <span>Rs.{Number(item.price || 0).toFixed(2)}</span>
        </div>
      ))}
    </div>

    <div className="text-right font-semibold mt-2">
      Total: Rs{typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : '0.00'}
    </div>
  </div>
))}

        </div>
      )}
    </section>
  );
};

export default OrdersPage;
