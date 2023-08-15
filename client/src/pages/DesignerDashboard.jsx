import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdFeedback } from 'react-icons/md';
import { SiAffinitydesigner } from 'react-icons/si';
import {BiSolidNote} from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineEye } from 'react-icons/ai';
import StandardLayout from '../components/layout/StandardLayout';
import { BsArrowRightShort } from 'react-icons/bs';

import { useSnapshot } from "valtio";
import state from "../store";

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
  { name: 'Dec', orders: 72 },
];

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
  // Define your orders and other data here...
  const acceptedOrders = 25;
  const rejectedOrders = 5;
  const ordersInApproval = 10;


  return (
      <div className="font-sans font-bold container  px-8 py-2">
        <h1 className="text-[45px]  text-black mb-[10px] ml-[170px">Dashboard</h1>
         
        <div className='px-2'>
        <hr className="my-4 border-t-2 border-gray-200" />
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardLabel title="Total Designs" value={rejectedOrders} color="blue" />
    <DashboardLabel title="Total Orders" value={ordersInApproval} color="yellow" />
    <DashboardLabel title="Total Feedbacks" value={acceptedOrders} color="green" />
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
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#3B82F6" barSize={30} radius={[10, 10, 0, 0]} shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
  );
};

export default DashboardPage;
