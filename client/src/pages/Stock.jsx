// StockManagementPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { useSnapshot } from "valtio";
import state from "../store";


function StockManagementPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

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
    <div className="px-10 bg-white min-h-screen">
      
      <div className="flex justify-between items-center mb-6 m-5 font-sans">
        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">Stock Management</h1>

        {/* Add New Stock Button */}
        <div className="mt-40px]">
          <Link
            to="/stock/new" // Replace this with the path to the page where you create a new stock
            className="text-white bg-black font-semibold px-4 pb-[10px] pt-[7px] rounded-md"
          >
            Add New Stock
          </Link>
        </div>
      
      </div>

      <div className="ml-[50px] w-[1200px] overflow-hidden max-h-[508px] font-sans font-[700] rounded-[10px]">
  <div className="table-header bg-black text-white">
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left w-[100px]">Stock ID</th>
          <th className="px-4 py-3 text-left">Date and Time</th>
          <th className="px-4 py-3  text-left ">Supplier Name</th>
          <th className="px-4 pr-10 py-3 text-left">Total Cost (Rs.)</th>
          <th className="px-4 py-3  text-right"></th>
        </tr>
      </thead>
    </table>
  </div>
  
  <div className="table-body overflow-y-auto max-h-[434px]">
    <table className="w-full">
      <tbody>
        {stockData.map((value, index) => (
          <tr key={value.id} className={index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"}>
            <td className="px-4 py-3 w-[100px] font-sans">{value.stock_id}</td>
            <td className="px-3 py-3 font-sans">
              {new Date(value.date_and_time).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </td>
            <td className="px-[20px] pr-20 py-3">{value.supplier_name}</td>
            <td className="px-[40px] py-3">{value.total_cost}</td>
            <td className="px-4 py-3  text-right">
              <div className="flex justify-end gap-2 font-sans">
                <Link
                  to={`/stock/${value.stock_id}`}
                  className="bg-black font-sans text-white py-2 px-4 rounded-md"
                >
                  <p className="font-sans">View Details</p>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default StockManagementPage;
