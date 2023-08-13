import React from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import des1 from "../images/designs/design1.jpg";
import alert1 from "../images/alerts/No Data.png";

const orders = [
  {
    id: 1,
    date: "2023-07-01 12:12:00",
    quantity: 2,
    product: "Sample Design 1",
    status: "Pending",
    image: des1,
  },
  {
    id: 2,
    date: "2023-07-02 12:12:00",
    quantity: 1,
    product: "Sample Design 2",
    status: "Rejected",
    image: des1,
  },
  {
    id: 3,
    date: "2023-07-01 12:12:00",
    quantity: 2,
    product: "Sample Design 1",
    status: "Accepted",
    image: des1,
  },
  {
    id: 4,
    date: "2023-07-02 12:12:00",
    quantity: 8,
    product: "Sample Design 2",
    status: "Pending",
    image: des1,
  },
  {
    id: 5,
    date: "2023-07-01 12:12:00",
    quantity: 10,
    product: "Sample Design 1",
    status: "Accepted",
    image: des1,
  },
  {
    id: 6,
    date: "2023-07-02 12:12:00",
    quantity: 1,
    product: "Sample Design 2",
    status: "Pending",
    image: des1,
  },
  {
    id: 7,
    date: "2023-07-02 12:12:00",
    quantity: 100,
    product: "Sample Design 2",
    status: "Accepted",
    image: des1,
  },
  // Add more orders as needed
];

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    maxWidth: "400px",
    width: "90%",
    padding: "24px",
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
        <button
          onClick={onRequestClose}
          className="text-gray-900 font-[700] text-2xl"
        >
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
          <p className="ml-2 text-lg font-medium text-gray-700">
            {order.product}
          </p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-800">Quantity:</p>
          <p className="ml-2 text-lg font-medium text-gray-700">
            {order.quantity}
          </p>
        </div>
        <div className="bg-blue-50 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-800">
            Date and Time:
          </p>
          <p className="ml-2 text-lg font-medium text-gray-700">{order.date}</p>
        </div>
      </div>
    </Modal>
  );
};

const OrderModal = ({ isOpen, onRequestClose, order, updateOrderStatus }) => {
  const acceptOrder = () => {
    updateOrderStatus(order.id, "Accepted");
    onRequestClose();
  };

  const rejectOrder = () => {
    updateOrderStatus(order.id, "Rejected");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Order Details"
    >
      <div className="flex justify-end">
        <button
          onClick={onRequestClose}
          className="text-gray-900 font-[700] text-lg"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="flex flex-col items-left justify-center">
        <h2 className="text-2xl text-center font-semibold mb-4">{`Order ID: ${order.id}`}</h2>
        <div className="flex mb-4 justify-center">
          <img
            src={order.image}
            alt={`Order ${order.id} Image`}
            className="w-48 h-48 object-cover rounded-md"
          />
        </div>
        <div className="bg-gray-100 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-600">Quantity:</p>
          <p className="ml-2 text-lg font-medium">{order.quantity}</p>
        </div>
        <div className="bg-gray-100 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-600">
            Date and Time:
          </p>
          <p className="ml-2 text-lg font-medium">{order.date}</p>
        </div>
        <div className="bg-gray-100 rounded-md p-2 mb-2 flex items-center">
          <p className="py-2 text-lg font-medium text-blue-600">Design:</p>
          <p className="ml-2 text-lg font-medium">{order.product}</p>
        </div>
        <div className="flex space-x-4 mt-4 justify-center">
          <button
            onClick={acceptOrder}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Accept
          </button>
          <button
            onClick={rejectOrder}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reject
          </button>
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
    },
    {
      id: 2,
      date: "2023-07-02 12:12:00",
      quantity: 1,
      product: "Sample Design 2",
      status: "Rejected",
      image: des1,
    },
    {
      id: 3,
      date: "2023-07-01 12:12:00",
      quantity: 2,
      product: "Sample Design 1",
      status: "Accepted",
      image: des1,
    },
    {
      id: 4,
      date: "2023-07-02 12:12:00",
      quantity: 8,
      product: "Sample Design 2",
      status: "Pending",
      image: des1,
    },
    {
      id: 5,
      date: "2023-07-01 12:12:00",
      quantity: 10,
      product: "Sample Design 1",
      status: "Accepted",
      image: des1,
    },
    {
      id: 6,
      date: "2023-07-02 12:12:00",
      quantity: 1,
      product: "Sample Design 2",
      status: "Pending",
      image: des1,
    },
    {
      id: 7,
      date: "2023-07-02 12:12:00",
      quantity: 100,
      product: "Sample Design 2",
      status: "Accepted",
      image: des1,
    },
    // Add more orders as needed
  ]);

  const [activeTab, setActiveTab] = useState("Pending");
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
            Accepted Orders
          </button>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto rounded-[10px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-black font-semibold">
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
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-[15px]  text-white uppercase tracking-wider"
                  >
                    Design
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-[15px] text-white uppercase tracking-wider"
                  >
                    Status
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
                    key={order.id}
                    className={
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-[700]">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${
                          order.status === "Rejected"
                            ? "text-red-600"
                            : order.status === "Accepted"
                            ? "text-green-600"
                            : "text-gray-600"
                        } font-medium uppercase`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                      {order.status === "Pending" ? (
                        <div>
                          <button
                            onClick={() => openModal(order)}
                            className="text-black font-semibold hover:underline cursor-pointer text-decoration-none"
                          >
                            Review
                          </button>
                        </div>
                      ) : null}
                      <div>
                        <button
                          onClick={() => openViewModal(order)}
                          className="text-black font-semibold hover:underline cursor-pointer text-decoration-none"
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
              src={alert1} // You can replace this with the path to your own "no orders" image
              alt="No Orders"
              className="w-48 h-48 mx-auto"
            />
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          order={selectedOrder}
          updateOrderStatus={updateOrderStatus}
        />
      )}

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
