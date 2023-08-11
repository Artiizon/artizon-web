import React, { useState } from 'react';
import StandardLayout from "../components/layout/StandardLayout";
import { FaPencilAlt } from 'react-icons/fa';

const orders = [
  { id: 1, date: "2023-07-01 12:12:00", quantity: "1", status: "Processing" },
  { id: 2, date: "2023-07-02 12:12:00", quantity: "1", status: "Sample Processing" },
  { id: 3, date: "2023-07-02 12:12:00", quantity: "1", status: "Sample Ready" },
  { id: 4, date: "2023-07-02 12:12:00", quantity: "99", status: "Delivered" }
];

const tabs = ["All", "Sample Processing", "Sample Ready", "50% of Payment", "Processing", "Final Payment", "Order Ready", "Delivered", "Completed"];

const getStatusTextColorClass = (status) => {
  switch (status) {
    case "Processing": return "text-blue-500";
    case "Delivered": return "text-green-500";
    case "Sample Ready": return "text-yellow-400";
    case "Payment Need": return "text-red-500";
    case "Processed": return "text-purple-500";
    case "Completed": return "text-indigo-500";
    case "Sample Processing": return "text-pink-500";
    case "50% of Payment": return "text-orange-500";
    case "Final Payment": return "text-teal-500";
    case "Order Ready": return "text-blue-700";
    default: return "text-gray-500";
  }
};

const OrderUpdate = () => {
  const [orderData, setOrderData] = useState(orders);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdateStatus = (orderId) => {
    const updatedOrders = orderData.map(order =>
      order.id === orderId ? { ...order, status: selectedStatus } : order
    );
    setOrderData(updatedOrders);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredOrders = selectedTab === "All" ? orderData : orderData.filter(order => order.status === selectedTab);

  return (
    <StandardLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 px-3">Order Details</h1>
        <div className="flex items-center mb-4">
          <div className="flex flex-grow px-3">
            {tabs.map(tab => (
              <button key={tab} className="px-4 py-2 font-semibold focus:outline-none relative" style={{ borderBottom: selectedTab === tab ? "2px solid #3B82F6" : "2px solid transparent", color: selectedTab === tab ? "#3B82F6" : "#4B5563" }} onClick={() => handleTabClick(tab)}>
                {tab}
                {selectedTab === tab && (<div className="absolute left-0 right-0 bottom-0 h-1 bg-blue-500" style={{ width: "100%" }} />)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-2">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48">
              <p className="text-gray-500 text-lg mb-4">No orders {selectedTab !== "All" ? `for ${selectedTab}` : ""}</p>
              <p className="text-gray-500">Please check back later.</p>
            </div>
          ) : (
            <div className="p-6 rounded-lg border shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-center">Order</th>
                    <th className="px-4 py-2 text-center">Date & Time</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-t border-gray-300">
                      <td className="px-4 py-2 text-center">{order.id}</td>
                      <td className="px-4 py-2 text-center">{order.date}</td>
                      <td className="px-4 py-2 text-center">{order.quantity}</td>
                      <td className={`px-4 py-2 ${getStatusTextColorClass(order.status)} text-center`}>{order.status}</td>
                      <td className="px-4 py-2 text-center">
                        <select className="mr-2 p-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none" value={order.status} onChange={handleStatusChange}>
                          {tabs.map(status => (<option key={status} value={status}>{status}</option>))}
                        </select>
                        <button onClick={() => handleUpdateStatus(order.id)} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                          <FaPencilAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </StandardLayout>
  );
};

export default OrderUpdate;
