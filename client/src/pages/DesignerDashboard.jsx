import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdFeedback } from 'react-icons/md';
import { SiAffinitydesigner } from 'react-icons/si';
import {BiSolidNote} from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnapshot } from "valtio";
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

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border p-2 shadow">
          <p className="font-semibold">{`Month: ${label}`}</p>
          <p className="font-semibold">{`Orders: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  const CustomBar = (props) => {
    const { x, y, height, width, fill, value } = props;
  
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        <text x={x + width / 2} y={y} dy="-10" textAnchor="middle" fill="#00000">
          {value}
        </text>
      </g>
    );
  };

const DashboardLabel = ({ title, value, color }) => {
  const getIcon = (color) => {
    switch (color) {
      case 'green':
        return <MdFeedback className="text-5xl icon-custom-size" />;
      case 'blue':
        return <SiAffinitydesigner className="text-5xl" />;
      case 'yellow':
        return <BiSolidNote className="text-5xl" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-gray-200 rounded-lg shadow-lg p-8 flex items-center justify-center text-black w-[190px] h-[150px] ml-[50px]`}>
      {getIcon(color)}
      <div className="ml-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, topic, link, value }) => {
  const getIcon = (value) => {
    switch (value) {
      case 'Add':
        return <AiOutlinePlus className="text-3xl" />;
      case 'View':
        return <AiOutlineEye className="text-3xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 mt-[40px]">
      {/* <Link to={link} className="block">
        <div className="bg-gradient-to-br bg-transparent text-gray-700 p-6 cursor-default">
          <h2 className="text-2xl font-semibold mb-4">{topic}</h2> */}
          {/* <div className="flex items-center justify-end">
            <div className="bg-gray-300 rounded-full p-3 text-blue-600 font-semibold text-sm ">
              {getIcon(value)}
            </div>
          </div>
        </div>
      </Link> */}
      <div className="px-6 py-4 bg-black text-white">
        <Link to={link} className="block">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">{title}</span>
            <BsArrowRightShort className="text-3xl" />
          </div>
        </Link>
      </div>
    </div>
  );
};
  


const DashboardPage = () => {
  const snap = useSnapshot(state);

  state.page = 'no-canvas'

  const [feedbackCount, setFeedbackCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [monthlyOrderCounts, setMonthlyOrderCounts] = useState([]);
  // Define your orders and other data here...

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/getDesignerDashboardData')
      .then(response => {
        console.log(response.data);
        const responseData = response.data; // Use the entire response data
        // console.log(responseData)
        setFeedbackCount(responseData[0].feedback_count);
        setDesignCount(responseData[0].active_design_count);
        setOrderCount(responseData[0].order_count);
     
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
   responseData.forEach(item => {
     const formattedMonth = item.order_month; // Assuming the format is 'YYYY-MM'
     ordersByMonth[formattedMonth] = item.completed_order_count;
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
         
        <div className='px-2'>
        <hr className="my-4 border-t-2 border-gray-200" />
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardLabel title="Total Designs" value={designCount} color="blue" />
    <DashboardLabel title="Total Orders" value={orderCount} color="yellow" />
    <DashboardLabel title="Total Feedbacks" value={feedbackCount} color="green" />
  </div>

  <div className="flex justify-end gap-4">
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <DashboardCard title="Add New Design" topic="New Design" link="/new-design" value="Add" />
      </div>
    </div>
    <div className="flex-1">
      <div className="h-full flex flex-col">
        <DashboardCard title="View My Designs" topic="My Designs" link="/des-design" value="View" />
      </div>
    </div>
    {/* Add more cards for other sections */}
  </div>
</div>











<div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Designs Orders (Past 12 Months)</h2>
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
