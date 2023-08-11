import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from 'react-icons/ai';
import des1 from "../images/designs/design1.jpg";
import alert1 from "../images/alerts/No Data.png"
import logoImageFile from "../images/logos/logo1.jpg";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '50%', // Set width to 50% of viewport width
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh', // Set maximum height to 80% of viewport height
    overflowY: 'auto', // Add vertical scroll if content overflows
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
const OrderViewModal = ({ isOpen, onRequestClose, order }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Order Details"
    >
      <div className="flex justify-end">
        <button onClick={onRequestClose} className="text-gray-500 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <div className="flex flex-col items-left justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">{`Order ID: ${order.id}`}</h2>
        <div className="mb-4 flex justify-center">
          <img
            src={order.image}
            alt={`Order ${order.id} Image`}
            className="w-48 h-48 object-cover rounded-md shadow-lg"
          />
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-800">Design:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.product}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-800">Quantity:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.quantity}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-800">Date and Time:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.date}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Material:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.material}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Color Code:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.colorCode}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Special Note:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.specialNote}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Expected Days:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.expectedDays}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Logo Image:</p>
          <img
            src={order.logoImage}
            alt={`Order ${order.id} Logo`}
            className="ml-2 max-h-24"
          />
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">T-Shirt Sizes:</p>
          {Object.keys(order.tshirtQuantity).map((size) => (
            <p key={size} className="ml-2 text-lg font-medium text-gray-700">
              {size.toUpperCase()}: {order.tshirtQuantity[size]}
            </p>
          ))}
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2">
          <p className="py-2 text-lg font-medium text-blue-800">Total Quantity:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.totalQuantity}</p>
        </div>
      </div>
    </Modal>
  );
};



const ReviewOrderPage = () => {
     
    
    
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-07-01 12:12:00",
      quantity: 2,
      product: "Sample Design 1",
      status: "Pending",
      image: des1,
      material: "Cotton",
      colorCode: "#FF5733",
      specialNote: "Handle with care",
      expectedDays: "5 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 10,
        s: 20,
        m: 15,
        l: 12,
        xl: 8,
      },
      totalQuantity: 65,
    },
    {
      id: 2,
      date: "2023-07-02 12:12:00",
      quantity: 1,
      product: "Sample Design 2",
      status: "Rejected",
      image: des1,
      material: "Polyester",
      colorCode: "#00BFFF",
      specialNote: "Avoid direct sunlight",
      expectedDays: "3 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 5,
        s: 10,
        m: 8,
        l: 6,
        xl: 4,
      },
      totalQuantity: 33,
    },
    {
      id: 3,
      date: "2023-07-01 12:12:00",
      quantity: 2,
      product: "Sample Design 1",
      status: "Accepted",
      image: des1,
      material: "Silk",
      colorCode: "#8A2BE2",
      specialNote: "Dry clean only",
      expectedDays: "7 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 12,
        s: 18,
        m: 14,
        l: 10,
        xl: 6,
      },
      totalQuantity: 60,
    },
    {
      id: 4,
      date: "2023-07-02 12:12:00",
      quantity: 8,
      product: "Sample Design 2",
      status: "Pending",
      image: des1,
      material: "Denim",
      colorCode: "#228B22",
      specialNote: "Machine washable",
      expectedDays: "4 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 8,
        s: 16,
        m: 12,
        l: 9,
        xl: 5,
      },
      totalQuantity: 50,
    },
    {
      id: 5,
      date: "2023-07-01 12:12:00",
      quantity: 10,
      product: "Sample Design 1",
      status: "Accepted",
      image: des1,
      material: "Linen",
      colorCode: "#FF4500",
      specialNote: "Gentle cycle wash",
      expectedDays: "6 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 15,
        s: 25,
        m: 20,
        l: 15,
        xl: 10,
      },
      totalQuantity: 85,
    },
    {
      id: 6,
      date: "2023-07-02 12:12:00",
      quantity: 1,
      product: "Sample Design 2",
      status: "Pending",
      image: des1,
      material: "Wool",
      colorCode: "#FF6347",
      specialNote: "Hand wash only",
      expectedDays: "5 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 3,
        s: 6,
        m: 4,
        l: 3,
        xl: 2,
      },
      totalQuantity: 18,
    },
    {
      id: 7,
      date: "2023-07-02 12:12:00",
      quantity: 100,
      product: "Sample Design 2",
      status: "Accepted",
      image: des1,
      material: "Rayon",
      colorCode: "#9400D3",
      specialNote: "Hang to dry",
      expectedDays: "8 days",
      logoImage: logoImageFile, // Replace logoImageFile with the actual logo image file
      tshirtQuantity: {
        xs: 50,
        s: 30,
        m: 20,
        l: 10,
        xl: 10,
      },
      totalQuantity: 120,
    },
    // Add more orders as needed
  ]);

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
      noOrdersMessage = "No accepted orders";
      break;
    default:
      noOrdersMessage = "No orders to display";
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const openViewModal = (order) => {
    setSelectedViewOrder(order);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setViewModalIsOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Rejected") return order.status === "Rejected";
    if (activeTab === "Accepted") return order.status === "Accepted";
    return order.status === "Pending";
  });

  return (
    <StandardLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-1">Review Orders</h1>

        <div className='px-1'>
        <hr className="my-4 border-t-2 border-gray-300" />
       </div>


        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("Pending")}
            className={`${
              activeTab === "Pending" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 rounded-md`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("Rejected")}
            className={`${
              activeTab === "Rejected" ? "bg-red-500" : "bg-gray-500"
            } text-white px-4 py-2 rounded-md`}
          >
            Rejected Orders
          </button>
          <button
            onClick={() => setActiveTab("Accepted")}
            className={`${
              activeTab === "Accepted" ? "bg-green-500" : "bg-gray-500"
            } text-white px-4 py-2 rounded-md`}
          >
            Accepted Orders
          </button>
        </div>

        {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Design
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                  {order.status === "Pending" ? (
                      <div>
                        <Link to={`/review-an-order`} className="text-blue-500 hover:underline cursor-pointer text-decoration-none">
                          Review
                        </Link>
                      </div>
                    ) : null}
                    <div>
                      <button
                        onClick={() => openViewModal(order)}
                        className="text-blue-500 hover:underline cursor-pointer text-decoration-none"
                      >
                        View More
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
    </StandardLayout>
  );
};

export default ReviewOrderPage;
