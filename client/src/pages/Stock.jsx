// StockManagementPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import axios from "axios"; // Import Axios library
import { useSnapshot } from "valtio";
import state from "../store";

function StockManagementPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  // Rename the stocks variable used by Axios to avoid conflicts
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDateError, setFromDateError] = useState("");
  const [toDateError, setToDateError] = useState("");


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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/stocks?search=${searchTerm}`
      );
      setStockData(response.data);
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  const handleGenerateReport = () => {
    // Validate the input fields
    if (!fromDate ) {
      setFromDateError("Please select a From date.");
    } else {
      setFromDateError("");
    }

    if (!toDate) {
      setToDateError("Please select a To date.");
    } else {
      setToDateError("");
    }

    // If both dates are selected, proceed with report generation
    if (fromDate && toDate) {
      // Generate the report logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="px-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-1 mt-5 font-sans">
        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">
          Stock Management
        </h1>

        {/* Add New Stock Button */}
        <div className="mt-40px]">
          <Link
            to="/stock/new" // Replace this with the path to the page where you create a new stock
            className="text-white bg-black font-semibold px-4 pb-[10px] pt-[7px] rounded-md"
          >
            Add New Stock
          </Link>

          <button
            onClick={() => setShowPopup(true)} // Show the popup on button click
            className="text-white bg-black font-semibold px-4 pb-[10px] pt-[7px] ml-5 rounded-md"
          >
            Generate Report
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h2 className="text-center mb-5 text-lg">Generate Report</h2>
            <label className="mt-4">
              From:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border rounded-md p-2 ml-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
              />
                  <p className="text-red-500 text-sm">{fromDateError}</p>
        
            </label>
            <label className="mt-4">
              To:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-500"
              />
               <p className="text-red-500 text-sm">{toDateError}</p>
            </label>

            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleGenerateReport}
              >
                Generate Report
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search Stock by Supplier Name , Date and Time, Stock ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="px-4 w-[500px] py-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="ml-[50px] w-[1200px] overflow-hidden max-h-[428px] font-sans font-[700] rounded-[10px]">
        <div className="table-header bg-black text-white">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left w-[100px]">Stock ID</th>
                <th className="px-4 py-3 text-left">Date and Time</th>
                <th className="px-4 pr-25 py-3  text-left ">Supplier Name</th>
                <th className="px-6 pr-10 py-3 text-left">Total Cost (Rs.)</th>
                <th className="px-4 py-3  text-right"></th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="table-body overflow-y-auto max-h-[434px]">
          <table className="w-full">
            <tbody>
              {stockData.map((value, index) => (
                <tr
                  key={value.id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"}
                >
                  <td className="px-4 py-3 w-[100px] font-sans">
                    {value.stock_id}
                  </td>
                  <td className="px-3 py-3 font-sans">
                    {new Date(value.date_and_time).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-[20px] pr-20 py-3">
                    {value.supplier_name}
                  </td>
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
