import React from 'react';
import StandardLayout from '../components/layout/StandardLayout';

const PendingOrdersPage = () => {
  // Dummy data for pending orders (replace this with actual data from your backend)
  const pendingOrders = [
    { id: 1, customer: 'John Doe', product: 'T-Shirt', quantity: 5, total: 100 },
    { id: 2, customer: 'Jane Smith', product: 'Jeans', quantity: 2, total: 80 },
    { id: 3, customer: 'Bob Johnson', product: 'Jacket', quantity: 3, total: 150 },
    // Add more pending orders as needed
  ];

  
  return (
    <StandardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pending Orders</h1>
        <div className="px-2">
          <hr className="my-4 border-t-2 border-gray-200" />
        </div>

        {pendingOrders.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-xl text-gray-600">No pending orders at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">${order.total}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors"
                        onClick={() => {
                          // Handle action when the pending order is processed or clicked
                        }}
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StandardLayout>
  );
};

export default PendingOrdersPage;
