import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StandardLayout from '../components/layout/StandardLayout';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';
import { useSnapshot } from "valtio";
import state from "../store";


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
        <p className="text-4xl font-bold text-blue-500">{value}</p>
      </div>
    </div>
  );
};

const TextileProductionManagerDashboard = () => {
  
  const snap = useSnapshot(state);
  state.page = "no-canvas";
   

  const totalStocks = 1500;
  const totalMaterials = 800;
  const totalButtons = 500;
  const totalInks = 300;
  const totalThreads = 200;

  const stockData = [
    { name: 'Materials', value: totalMaterials },
    { name: 'Buttons', value: totalButtons },
    { name: 'Inks', value: totalInks },
    { name: 'Threads', value: totalThreads },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const productionData = [
    { category: 'Materials', quantity: 800 },
    { category: 'Buttons', quantity: 600 },
    { category: 'Inks', quantity: 400 },
    { category: 'Threads', quantity: 700 },
  ];

  

  
  

  return (
    <StandardLayout>
    <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>

        <div className='px-2'>
         <hr className="my-4 border-t-2 border-gray-200" />
        </div>

       {/* New section for cards with icons */}
        <div className="flex justify-center mb-8">

              <DashboardCardWithIcon title="Pending Orders" value={20} icon={<FaClock size={60} color="#ffc107" />} />
        
              <DashboardCardWithIcon title="Accepted Orders" value={50} icon={<FaCheckCircle size={60} color="#4caf50" />}/>
        
              <DashboardCardWithIcon title="Rejected Orders" value={10} icon={<FaTimesCircle size={60} color="#f44336" />} />
        
      
       
        </div>


         <div className='px-2'>
         <hr className="my-4 border-t-2 border-gray-200" />
        </div>

        
      {/* Top Row - Cards */}
      <div className="flex justify-center mb-8">
        <DashboardCard title="Total Stocks" value={totalStocks} />
        <DashboardCard title="Total Materials" value={totalMaterials} />
        <DashboardCard title="Total Buttons" value={totalButtons} />
        <DashboardCard title="Total Inks" value={totalInks} />
        <DashboardCard title="Total Threads" value={totalThreads} />
      </div>

      {/* Bottom Row - Charts */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-4">
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

        <div className="bg-white rounded-lg shadow-lg p-4">
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
    </StandardLayout>
  );
};

export default TextileProductionManagerDashboard;