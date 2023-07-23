import React, { useState } from 'react';
import StandardLayout from "../components/layout/StandardLayout";


const orders = [
  {
    id: 1,
    date: "2023-07-01 12:12:00",
    quantity: "1",
    status: "Processing",
  },
  {
    id: 2,
    date: "2023-07-02 12:12:00",
    quantity: "1",
    status: "Sample Processing",
  },
  {
    id: 3,
    date: "2023-07-02 12:12:00",
    quantity: "1",
    status: "Sample Ready",
  },
  {
    id: 4,
    date: "2023-07-02 12:12:00",
    quantity: "99",
    status: "Delivered",
  },
  // Add more orders as needed
];

const getStatusTextColorClass = (status) => {
    switch (status) {
      case "Processing":
        return "text-blue-500"; // Blue color for Processing status
      case "Delivered":
        return "text-green-500"; // Green color for Delivered status
      case "Sample Ready":
        return "text-yellow-400"; // Yellow color for Sample Ready status
      case "Payment Need":
        return "text-red-500"; // Red color for Payment Need status
      case "Processed":
        return "text-purple-500"; // Purple color for Processed status
      case "Completed":
        return "text-indigo-500"; // Indigo color for Completed status
      case "Sample Processing":
        return "text-pink-500"; // Pink color for Sample Processing status
      case "50% of Payment":
        return "text-orange-500"; // Orange color for 50% of Payment status
      case "Final Payment":
        return "text-teal-500"; // Teal color for Final Payment status
        case "Order Ready":
        return "text-blue-700"; // Gray color for Order Ready status
      default:
        return "text-gray-500"; // Default color for other cases
    }
  };
  

  const tabs = [
    "All",
    "Sample Processing",
    "Sample Ready",
    "50% of Payment",
    "Processing",
    "Final Payment",
    "Order Ready",
    "Delivered",
    "Completed",
  ];
  



const OrderCard = ({ order, onUpdateStatus }) => {
  const statusOptions = [
    "Sample Processing",
    "Sample Ready",
    "50% of Payment",
    "Processing",
    "Final Payment",
    "Order Ready",
    "Delivered",
    "Completed",
  ];

  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="p-6 rounded-lg border shadow-lg flex items-center justify-between hover:bg-gray-100">
      <p className="text-lg font-bold">Order #{order.id}</p>
      <p className="text-lg text-gray-600">
        <span className="text-black font-bold">Date & Time:</span>{" "}
        {order.date}
      </p>
      <p className="text-lg text-gray-600">
        <span className="text-black font-bold w-24 inline-block">Quantity:</span>{" "}
        {order.quantity}
      </p>
    
      <div className="mt-4">
      <p className="text-sm">
          <span className="text-black">Status:</span>{" "}
          <span className={`text-sm ${getStatusTextColorClass(order.status)}`}>
            {order.status}
          </span>
        </p>
        <div className="mt-2 flex">
          <select
            className="mr-2 p-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {statusOptions.map(status => ( 
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={() => onUpdateStatus(order.id, selectedStatus)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};



const OrderUpdate = () => {
    const [orderData, setOrderData] = useState(orders);
    const [selectedTab, setSelectedTab] = useState("All");
  
    const handleUpdateStatus = (orderId, newStatus) => {
      const updatedOrders = orderData.map(order => order.id === orderId ? { ...order, status: newStatus } : order);
      setOrderData(updatedOrders);
    };
  
    const handleTabClick = (tab) => {
      setSelectedTab(tab);
    };
  

    const filteredOrders = selectedTab === "All" ? orderData : orderData.filter(order => order.status === selectedTab);
  
    return (
      <StandardLayout>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4 px-3">Order Details</h1>
          <div className="flex items-center mb-4">
            <div className="flex flex-grow px-3">
              {tabs.map(tab => (
                <button
                key={tab}
                className="px-4 py-2 font-semibold focus:outline-none relative"
                style={{
                  borderBottom: selectedTab === tab ? "2px solid #3B82F6" : "2px solid transparent",
                  color: selectedTab === tab ? "#3B82F6" : "#4B5563",
                }}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
                {selectedTab === tab && (
                  <div
                    className="absolute left-0 right-0 bottom-0 h-1 bg-blue-500"
                    style={{ width: "100%" }}
                  />
                )}
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
              filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />
              ))
            )}
          </div>
        </div>
      </StandardLayout>
    );
  };
  
  // OrderCard component and getStatusTextColorClass function remain unchanged...
  
  export default OrderUpdate;


  