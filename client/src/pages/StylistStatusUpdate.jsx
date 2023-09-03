import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import { useSnapshot } from "valtio";
import state from "../store";

const tabs = ["All", "Accepted", "Sample Processing", "Sample Ready", "Half Payment", "Processing", "Final Payment","Completed"];

const getStatusText = (status) => {
  switch (status) {
    case "Processing": return "Processing";
    case "Accepted": return "Accepted";
    case "SampleReady": return "Sample Ready"; // Format "SampleReady" as "Sample Ready"
    case "Completed": return "Completed";
    case "SampleProcessing": return "Sample Processing"; // Format "SampleProcessing" as "Sample Processing"
    case "HalfPayment": return "Half Payment"; // Format "50%ofPayment" as "50% of Payment"
    case "FinalPayment": return "Final Payment"; // Format "FinalPayment" as "Final Payment"
    default: return "Unknown";
  }
};

const getStatusTextColorClass = (status) => {
  switch (status) {
    case "Processing": return "text-blue-500";
    case "Accepted": return "text-blue-500";
    case "SampleReady": return "text-yellow-400";
    case "Processed": return "text-purple-500";
    case "Completed": return "text-indigo-500";
    case "SampleProcessing": return "text-pink-500";
    case "HalfPayment": return "text-orange-500";
    case "FinalPayment": return "text-teal-500";
    default: return "text-gray-500";
  }
};
const OrderUpdate = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [orderData, setOrderData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");


  useEffect(() => {
    axios.get('http://localhost:8080/stylistViewOrders')
      .then(response => {
        setOrderData(response.data);
        console.log('Fetched orders data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  
  const handleUpdateStatus = (orderId) => {
    const updatedOrders = orderData.map(order =>
      order.id === orderId ? { ...order, status: selectedStatus } : order
    );
    setOrderData(updatedOrders);
    setUpdatingOrderId(null);
    setSelectedStatus("");
  };

  const handleTabClick = (tab) => {
    console.log("Selected Tab:", tab);
    setSelectedTab(tab);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredOrders = selectedTab === "All"
  ? orderData
  : orderData.filter(order => order.status.replace(/\s/g, '').toLowerCase() === selectedTab.replace(/\s/g, '').toLowerCase());



  console.log("Filtered Orders:", filteredOrders);

  return (
      <div className="container mx-auto p-8 font-sans min-h-screen">
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
              <p className="text-gray-500 text-lg mb-4">No orders for {selectedTab === "All" ? "All" : selectedTab}</p>
              <p className="text-gray-500">Please check back later.</p>
            </div>
          ) : (
            <div className="p-6 rounded-lg border shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-center">Order Id</th>
                    <th className="px-4 py-2 text-center">Main Image</th>
                    <th className="px-4 py-2 text-center">Date & Time</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.tshirt_order_id} className="border-t border-gray-300">
                      <td className="px-4 py-2 text-center">{order.tshirt_order_id}</td>
                      <td className="px-4 py-2 flex justify-center">
                        <img src={`http://127.0.0.1:8080/uploads/company_designs/${order.image}`} alt={`Design ${order.tshirt_order_id}`} className="w-16 h-16 object-cover rounded-lg" />
                      </td>
                      <td className="px-4 py-2 text-center">{new Date(order.ordered_date_and_time).toLocaleString()}</td>

                      <td className="px-4 py-2 text-center">{order.total_quantity}</td>
                      <td className={`px-4 py-2 ${getStatusTextColorClass(order.status)} text-center`}>{getStatusText(order.status)}</td>
                      <td className="px-4 py-2 text-center">
                        {updatingOrderId === order.tshirt_order_id ? (
                          <>
                            <select className="mr-2 p-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none" value={selectedStatus} onChange={handleStatusChange}>
                              {tabs.slice(1).map(status => (<option key={status} value={status}>{status}</option>))}
                            </select>
                            <button onClick={() => handleUpdateStatus(order.tshirt_order_id)} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                              <FaPencilAlt />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setUpdatingOrderId(order.tshirt_order_id)} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                            <FaPencilAlt />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
};

export default OrderUpdate;
