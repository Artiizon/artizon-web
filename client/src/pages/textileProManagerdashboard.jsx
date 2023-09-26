import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import StandardLayout from "../components/layout/StandardLayout";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Importing icons
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios library

//import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="flex items-center justify-center h-40 w-48 bg-white rounded-lg shadow-lg mx-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-4xl font-bold text-blue-500">{value}</p>
      </div>
    </div>
  );
};

const DashboardCardWithIcon = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-48 w-48 bg-white rounded-lg shadow-lg mx-4">
      <div className="text-center mb-2">{icon}</div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-4xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

const TextileProductionManagerDashboard = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [pendingOrders, setPendingOrders] = useState(0);
  const [acceptedOrders, setAcceptedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [totalStockIdSum, setTotalStockIdSum] = useState(0);

  const [materialTypes, setMaterialTypes] = useState(0);
  const [buttonTypes, setButtonTypes] = useState(0);
  const [threadTypes, setThreadTypes] = useState(0);
  const [inkTypes, setInkTypes] = useState(0);
  const [pData, setPData] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOrders = await axios.get(
          "http://localhost:8080/api/dashboard/orders"
        );
        // Assuming your data structure includes counts for each type of order
        setPendingOrders(responseOrders.data.pendingOrders);
        setAcceptedOrders(responseOrders.data.acceptedOrders);
        setRejectedOrders(responseOrders.data.rejectedOrders);

        const responseStock = await axios.get(
          "http://localhost:8080/api/dashboard/total-stock"
        );
        // Assuming your response includes the total stock cost
        setTotalStockIdSum(responseStock.data.totalStockIdSum);

        const responseTypes = await axios.get(
          "http://localhost:8080/api/dashboard/types"
        );
        // Assuming your response includes the total stock cost
        setMaterialTypes(responseTypes.data.MATERIAL);
        setButtonTypes(responseTypes.data.BUTTON);
        setThreadTypes(responseTypes.data.THREAD);
        setInkTypes(responseTypes.data.INK);

        const responsePData = await axios.get(
          "http://localhost:8080/api/dashboard/pData"
        );

        console.log("responsePData",pData);

        // Assuming your response includes the total stock cost
        setPData(responsePData.data);
        
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = [ "#FFBB28","#00C49F", "#FF8042"];
  const pieChartData = [
    { name: 'Pending Orders', value: pendingOrders },
    { name: 'Accepted Orders', value: acceptedOrders },
    { name: 'Rejected Orders', value: rejectedOrders },
  ];

 

  return (
    <div className="font-sans font-bold container mx-auto px-4 py-2">
      <h1 className=" text-[45px]  text-black mb-[10px] ml-[25px]">
        Dashboard
      </h1>

      {/* New section for cards with icons */}
      <div className="flex justify-center mb-8">
        <DashboardCardWithIcon
          title="Pending Orders"
          value={pendingOrders}
          icon={<FaClock size={60} color="#ffc107" />}
        />

        <DashboardCardWithIcon
          title="Accepted Orders"
          value={acceptedOrders}
          icon={<FaCheckCircle size={60} color="#4caf50" />}
        />

        <DashboardCardWithIcon
          title="Rejected Orders"
          value={rejectedOrders}
          icon={<FaTimesCircle size={60} color="#f44336" />}
        />
      </div>

      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>

      {/* Top Row - Cards */}
      <div className="flex justify-center mb-8">
        <DashboardCard title="Total Stocks" value={totalStockIdSum} />
        <DashboardCard title="Total Material Types" value={materialTypes} />
        <DashboardCard title="Total Button Types" value={buttonTypes} />
        <DashboardCard title="Total Ink Types" value={inkTypes} />
        <DashboardCard title="Total Thread Types" value={threadTypes} />
      </div>

      {/* Bottom Row - Charts */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 ml-[170px]">
            Orders Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
            Material Types Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={pData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-90} textAnchor="end" interval={0} />
              <YAxis label={{ value: 'Meters', angle: -90, position: 'insideLeft', style: { marginLeft: '-20px' } }} />
             <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </div>
  );
};

export default TextileProductionManagerDashboard;
