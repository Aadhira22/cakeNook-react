import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../../context/StateContextProvider';
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const { token } = useStateContext();
  const [orders, setOrders] = useState(null); // initially null for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.orders;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        // toast.error(err.response?.data?.message || 'Failed to fetch orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;

  if (!orders || orders.length === 0)
    return (
      <div className="h-[400px] flex flex-col justify-center items-center mt-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No orders"
          className="mx-auto mb-4 w-32 h-32 opacity-60"
        />
        <h2 className="text-xl text-gray-600">Currently no orders are there</h2>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Items:</strong> {order.items.length}</p>
          <button
            className={`mt-3 px-4 py-2 rounded ${
              order.status === 'delivered'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            onClick={() => markAsDelivered(order._id)}
            disabled={order.status === 'delivered'}
          >
            {order.status === 'delivered' ? 'Delivered' : 'Mark as Delivered'}
          </button>
        </div>
      ))}
    </div>
  );

  async function markAsDelivered(orderId) {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/orders/${orderId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order marked as delivered");
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: 'delivered' } : o
        )
      );
    } catch (err) {
      toast.error("Failed to update order");
    }
  }
};

export default ManageOrders;
