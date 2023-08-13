import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StandardLayout from '../components/layout/StandardLayout';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="flex items-center justify-center h-[110px] w-48 bg-gray-100  rounded-lg shadow-lg mx-4">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">{title}</p>
        <div className="bg-black"></div>
        <p className="text-4xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

const TextileProductionManagerDashboard = () => {
  const totalStocks = 1500;
  const totalMaterials = 800;
  const totalButtons = 500;
  const totalLinks = 300;
  const totalThreads = 200;

  const stockData = [
    { name: 'Materials', value: totalMaterials },
    { name: 'Buttons', value: totalButtons },
    { name: 'Links', value: totalLinks },
    { name: 'Threads', value: totalThreads },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const productionData = [
    { category: 'Materials', quantity: 800 },
    { category: 'Buttons', quantity: 600 },
    { category: 'Links', quantity: 400 },
    { category: 'Threads', quantity: 700 },
  ];

  return (
    <div className="container mx-auto pl-4 py-8 font-sans">

        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">Dashboard</h1>
         
         
      {/* Top Row - Cards */}
      <div className="flex justify-center mb-8">
        <DashboardCard title="Total Stocks" value={totalStocks} />
        <DashboardCard title="Total Materials" value={totalMaterials} />
        <DashboardCard title="Total Buttons" value={totalButtons} />
        <DashboardCard title="Total Links" value={totalLinks} />
        <DashboardCard title="Total Threads" value={totalThreads} />
      </div>

      {/* Bottom Row - Charts */}
      <div className="flex gap-8  justify-center ">
        <div className="bg-white rounded-lg shadow-lg p-4 w-[45%]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stock Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stockData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 w-[45%]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Production Quantities</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
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
