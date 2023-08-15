import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai';
import des1 from "../images/designs/design1.jpg";
import alert1 from "../images/alerts/No Data.png"
import logoImageFile from "../images/logos/logo1.jpg";
import axios from 'axios';
import { useSnapshot } from "valtio";
import state from "../store";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     width: '50%', // Set width to 50% of viewport width
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     maxHeight: '90vh', // Set maximum height to 80% of viewport height
//     overflowY: 'auto', // Add vertical scroll if content overflows
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
// };
// const OrderViewModal = ({ isOpen, onRequestClose, order }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       style={customStyles}
//       contentLabel="Order Details"
//     >
//       <div className="flex justify-end">
//         <button onClick={onRequestClose} className="text-gray-500 text-2xl">
//           <AiOutlineClose />
//         </button>
//       </div>
//       <div className="flex flex-col items-left justify-center p-4">
//         <h2 className="text-2xl font-semibold mb-4 text-center">{`Order ID: ${order.id}`}</h2>
//         <div className="mb-4 flex justify-center">
//           <img
//             src={order.image}
//             alt={`Order ${order.id} Image`}
//             className="w-48 h-48 object-cover rounded-md shadow-lg"
//           />
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
//           <p className="py-2 text-lg font-medium text-blue-800">Design:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.product}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
//           <p className="py-2 text-lg font-medium text-blue-800">Quantity:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.quantity}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
//           <p className="py-2 text-lg font-medium text-blue-800">Date and Time:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.date}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Material:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.material}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Color Code:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.colorCode}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Special Note:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.specialNote}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Expected Days:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.expectedDays}</p>
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Logo Image:</p>
//           <img
//             src={order.logoImage}
//             alt={`Order ${order.id} Logo`}
//             className="ml-2 max-h-24"
//           />
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">T-Shirt Sizes:</p>
//           {Object.keys(order.tshirtQuantity).map((size) => (
//             <p key={size} className="ml-2 text-lg font-medium text-gray-700">
//               {size.toUpperCase()}: {order.tshirtQuantity[size]}
//             </p>
//           ))}
//         </div>
//         <div className="bg-blue-50 rounded-md p-2 mb-2">
//           <p className="py-2 text-lg font-medium text-blue-800">Total Quantity:</p>
//           <p className="ml-2 text-lg font-medium text-gray-700">{order.totalQuantity}</p>
//         </div>
//       </div>
//     </Modal>
//   );
// };



const ReviewOrderPage = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas"; 
    
  const [torders, setTOrders] = useState([]); 
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/viewOrders')
      .then(response => {
        setTOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching designs:', error);
      });
  }, []);
  
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedViewOrder, setSelectedViewOrder] = useState(null);
  
  let noOrdersMessage = "";
  switch (activeTab) {
    case "Pending":
      noOrdersMessage = "No pending orders";
      break;
    case "Rejected":
      noOrdersMessage = "No rejected orders";
      break;
    case "Accepted":
      noOrdersMessage = "No proceed orders";
      break;
    default:
      noOrdersMessage = "No orders to display";
  }

  // const updateOrderStatus = (orderId, newStatus) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === orderId ? { ...order, status: newStatus } : order
  //     )
  //   );
  // };

  // const openViewModal = (order) => {
  //   setSelectedViewOrder(order);
  //   setViewModalIsOpen(true);
  // };

  // const closeViewModal = () => {
  //   setViewModalIsOpen(false);
  // };

  const filteredOrders = torders.filter((order) => {
    if (activeTab === "Rejected") return order.status === "SRejected";
    if (activeTab === "Accepted") return order.status === "Proceed";
    return order.status === "Pending";
  });

  return (
    <div>
      <div className="font-sans container mx-auto p-8">
        <h1 className="text-[45px] font-bold mb-1">Review Orders</h1>

        


        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("Pending")}
            className={`${
              activeTab === "Pending" ? "bg-blue-500" : "bg-black"
            } text-white px-4 py-2 rounded-md`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("Rejected")}
            className={`${
              activeTab === "Rejected" ? "bg-red-500" : "bg-black"
            } text-white px-4 py-2 rounded-md`}
          >
            Rejected Orders
          </button>
          <button
            onClick={() => setActiveTab("Accepted")}
            className={`${
              activeTab === "Accepted" ? "bg-green-500" : "bg-black"
            } text-white px-4 py-2 rounded-md`}
          >
            Proceed Orders
          </button>
        </div>

        {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-[10px]">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-black font-semibold ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-[15px]  text-white uppercase tracking-wider"
                >
                  Design
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.tshirt_order_id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">{order.tshirt_order_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">
                  {new Date(order.ordered_date_and_time).toLocaleString()}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">{order.total_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">{order.design_name}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm  hover:underline">
                  {order.status === "Pending" ? (
                      <div>
                        <Link to={`/review-an-order/${order.tshirt_order_id}`} className="text-black font-semibold hover:underline cursor-pointer text-decoration-none">
                          Review
                        </Link>
                      </div>
                    ) : null}
                    <div>
                    <button className="text-black font-semibold hover:underline cursor-pointer text-decoration-none">
                      <Link to={`/stylist-view-more//${order.tshirt_order_id}`}>View More</Link>
                    </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
            <div className="text-center mt-8">
            <p className="text-xl font-semibold mb-2 text-gray-700">
              {noOrdersMessage}
            </p>
            <img
              src= {alert1} // You can replace this with the path to your own "no orders" image
              alt="No Orders"
              className="w-48 h-48 mx-auto"
            />
          </div>
        )}
      </div>

      {selectedViewOrder && (
        <OrderViewModal
          isOpen={viewModalIsOpen}
          onRequestClose={closeViewModal}
          order={selectedViewOrder}
        />
      )}
      </div>
  );
};

export default ReviewOrderPage;
