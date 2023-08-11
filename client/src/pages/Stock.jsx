// StockManagementPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import axios from "axios"; // Import Axios library

function StockManagementPage() {
  // Rename the stocks variable used by Axios to avoid conflicts
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/stocks");
        setStockData(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);


  

  return (
    <StandardLayout>
      <div className="px-10 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6 m-5">
          
          <h1 className="text-3xl font-semibold ">Stock  Management</h1>

          {/* Add New Stock Button */}
          <div className="mt-5">
            <Link
              to="/stock/new" // Replace this with the path to the page where you create a new stock
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Add New Stock 
            </Link>
          </div>

        </div>
        



                {/* Table for stocks */}
        <div className="w-full overflow-hidden max-h-[508px] overflow-y-scroll">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left w-[100px]">Stock ID</th>
              <th className="px-4 py-3 text-left">Date and Time</th>
              <th className="px-4 py-3 text-left">Total Cost (Rs.)</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>

          <tbody className="">
          {stockData.map((value) => {
            
            return(
            <tr key={value.id} className="bg-white hover:bg-gray-200 transition-all ease-in-out">
              <td className="px-4 py-3 w-[100px]">{value.stock_id}</td>
              <td className="px-4 py-3">
                  {new Date(value.date_and_time).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
              </td>

              <td className="px-4 py-3">{value.total_cost}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/stock/${value.stock_id}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    View Details
                  </Link>
                
                </div>
              </td>
            </tr>
          )})}

          
          </tbody>



        </table>
      </div>
      </div>
    </StandardLayout>
  );
}

export default StockManagementPage;
