import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCheckCircle, FaTimesCircle, FaClipboardCheck } from 'react-icons/fa';
import StandardLayout from '../components/layout/StandardLayout';

const data = [
  { name: 'Jan', orders: 20 },
  { name: 'Feb', orders: 30 },
  { name: 'Mar', orders: 25 },
  { name: 'Apr', orders: 40 },
  { name: 'May', orders: 35 },
  { name: 'Jun', orders: 50 },
  { name: 'Jul', orders: 45 },
  { name: 'Aug', orders: 55 },
  { name: 'Sep', orders: 60 },
  { name: 'Oct', orders: 70 },
  { name: 'Nov', orders: 65 },
  { name: 'Dec', orders: 80 },
];

const DashboardLabel = ({ title, value, color }) => {
  const getIcon = (color) => {
    switch (color) {
      case 'blue':
        return <FaCheckCircle className="text-5xl text-blue-500" />;
      case 'red':
        return <FaTimesCircle className="text-5xl text-red-500" />;
      case 'yellow':
        return <FaClipboardCheck className="text-5xl text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-${color}-100 rounded-lg shadow-lg p-4 flex items-center justify-center border border-${color}-300`}>
      {getIcon(color)}
      <div className="ml-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, link, icon, value }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
      <Link to={link}>
        <div className="rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl cursor-pointer transition duration-300">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {icon} {title}
            </h2>
            <div className="flex justify-between items-center">
              <div className="text-gray-900 font-bold text-xl">{value}</div>
              <div className="bg-blue-500 rounded-full p-3 text-white font-semibold text-sm cursor-pointer hover:bg-blue-600 transition duration-300">
                View Details
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const DashboardPage = () => {
  // Define your orders and other data here...
  const acceptedOrders = 25;
  const rejectedOrders = 5;
  const ordersInApproval = 10;
  const orders = 32;
  const orderReview = 5;

  return (
    <StandardLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <div className="px-2">
          <hr className="my-4 border-t-2 border-gray-200" />
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mb-8 mt-6">
          
          <DashboardLabel title="Accepted Orders" value={acceptedOrders} color="blue" />
          <DashboardLabel title="Rejected Orders" value={rejectedOrders} color="red" />
          <DashboardLabel title="Orders in Approval" value={ordersInApproval} color="yellow" />
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-4">
          <DashboardCard title="Orders" link="/order-status-update" icon={<FaClipboardCheck className="text-5xl" />} value={orders} />
          <DashboardCard title="Review Orders" link="/review-order" icon={<FaTimesCircle className="text-5xl" />} value={orderReview} />
          {/* Add more cards for other sections */}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders Past 12 Months</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </StandardLayout>
  );
};

export default DashboardPage;
