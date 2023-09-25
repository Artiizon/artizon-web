import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaClipboardCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import state from "../store";


const blackGradient = (
  <linearGradient id="blackGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
    <stop offset="30%" stopColor="#0a0a0a" stopOpacity="0.8" />
    <stop offset="70%" stopColor="#050505" stopOpacity="0.8" />
    <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
  </linearGradient>
);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Add 1 to make it 1-based

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const getFormattedMonth = (year, month) => `${year}-${month < 10 ? '0' : ''}${month}`;


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
    <div className="w-[100px] md:w-1/5 lg:w-1/5 p-2">
      <Link to={link}>
        <div className="rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl cursor-pointer transition duration-300">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {icon} {title}
            </h2>
            <div className="flex justify-between items-center">
              <div className="text-gray-900 font-bold text-xl">{value}</div>
              <div className="bg-black rounded-[10px] p-3 text-white font-semibold text-sm cursor-pointer hover:bg-gray-800 transition duration-300">
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
  const [acceptedOrders, setAcceptedOrders] = useState(0);
  console.log(acceptedOrders);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [ordersInApproval, setOrdersInApproval] = useState(0);
  const [orders, setOrders] = useState(0);
  const [orderReview, setOrderReview] = useState(0);
  const [monthlyOrderCounts, setMonthlyOrderCounts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/getStylishDashboardData')
      .then(response => {
        console.log(response.data);
        const responseData = response.data; // Use the entire response data
  
        // Total orders data
        const totalOrdersData = responseData.totalOrders;
        setAcceptedOrders(totalOrdersData.tot_proceeded_orders);
        setRejectedOrders(totalOrdersData.tot_rejected_orders);
        setOrdersInApproval(totalOrdersData.tot_pending_orders);
        setOrders(totalOrdersData.total_orders);
        setOrderReview(totalOrdersData.tot_pending_orders);
  
        const monthlyOrdersData = responseData.monthlyOrders;

         // Create an object to track orders for each month
         const ordersByMonth = {};

         // Initialize the object with 0 orders for the current month and the previous 11 months
         for (let i = 0; i < 12; i++) {
           let monthIndex = currentMonth - i;
           let year = currentYear;
           
           // Adjust the year if the month index is less than 1 (e.g., January)
           if (monthIndex < 1) {
             monthIndex += 12; // Wrap around to December
             year--;
           }
           
           const formattedMonth = getFormattedMonth(year, monthIndex);
           ordersByMonth[formattedMonth] = 0;
         }
 
         // Populate the orders for the available months from the backend
         monthlyOrdersData.forEach(item => {
           const formattedMonth = item.order_month; // Assuming the format is 'YYYY-MM'
           ordersByMonth[formattedMonth] = item.total_orders;
         });
 
         // Transform the data to match the format expected by Recharts
         const data = Object.keys(ordersByMonth).map(name => ({
           name,
           orders: ordersByMonth[name],
         }));
 
         // Reverse the order of the data to display the latest month on the right
         const reversedData = data.reverse();
 
         // Do something with the reversed data, e.g., set it in a state variable
         setMonthlyOrderCounts(reversedData);
       })
              .catch(error => {
                console.error('Error fetching orders summary:', error);
              });
          }, []);
          

  return (
    <div className="font-sans font-bold container  px-8 py-2">
      <h1 className="text-[45px]  text-black mb-[10px] ml-[170px">Dashboard</h1>
      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>

      <div className=" justify-center flex gap-[30px] mb-8 mt-6">
        <DashboardLabel title="Proceeded Orders" value={acceptedOrders} color="blue" />
        <DashboardLabel title="Rejected Orders" value={rejectedOrders} color="red" />
        <DashboardLabel title="Pending Orders" value={ordersInApproval} color="yellow" />
      </div>

      <div className="flex flex-wrap justify-center mb-8 gap-4">
        <DashboardCard title="Orders" link="/order-status-update" icon={<FaClipboardCheck className="text-5xl" />} value={orders} />
        <DashboardCard title="Review Orders" link="/review-order" icon={<FaTimesCircle className="text-5xl" />} value={orderReview} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders Past 12 Months</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyOrderCounts}>
            <defs>{blackGradient}</defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              domain={['dataMax', 'dataMin']}
            />
            <YAxis
              allowDecimals={false} // Ensure whole numbers are displayed
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="url(#blackGradient)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
