import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StandardLayout from "../components/layout/StandardLayout";

const fetchStockById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/stock/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock details:", error);
    return null;
  }
};

function StockDetailsPage() {
  const { id } = useParams();
  const [stock, setStock] = useState(null);

  // Fetch stock details based on the ID from the URL
  useEffect(() => {
    const fetchStockDetails = async () => {
      const stockDetails = await fetchStockById(id);
      setStock(stockDetails);
    };

    fetchStockDetails();
  }, [id]);

  if (!stock) {
    return <div>Loading...</div>;
  }

  console.log(stock);

  return (
    <div className="  min-h-screen font-sans">
      <h1 className="text-[45px] font-bold mb-1 ml-[80px]">Stock Details</h1>

      {/* Display stock details here */}
      <div className="flex gap-[70px]  justify-center">
        <div className="  rounded-lg p-6 shadow-lg  hover:shadow-xl w-[300px]">
          <p className="text-gray-500 text-[20px] font-[700]">Stock ID</p>
          <p className="text-2xl font-semibold">{stock.stock_id}</p>
        </div>

        <div className=" rounded-lg p-6 shadow-lg  hover:shadow-xl w-[300px]">
          <p className="text-gray-500 text-[20px] font-[700]">Date and Time</p>
          <p className="text-2xl font-semibold">
            {new Date(stock.date_and_time).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <div className=" rounded-lg p-6 shadow-lg  hover:shadow-xl w-[300px]">
          <p className="text-gray-500 text-[20px] font-[700]">
            Total Cost (Rs.)
          </p>
          <p className="text-2xl font-semibold">{stock.total_cost}</p>
        </div>
      </div>

      <div className="ml-[240px] shadow-lg  hover:shadow-xl w-[1040px] rounded-lg p-6 mt-4 ">
        <p className="text-gray-500 text-[20px] font-[700]">Description</p>
        <p className="text-2xl font-semibold">{stock.description}</p>
      </div>

      {stock.items && (
        <div className="mt-8 px-[80px]">
          <h2 className="text-3xl font-semibold pb-4">Items</h2>
          <div className="table-container">
            <div className="table-header">
              <table className="w-full table-auto border border-gray-300 ">
                <thead>
                  <tr className="text-white text-[18px] bg-black">
                    <th className="px-2 py-3 text-left w-1/5 ">Item Name</th>
                    <th className="px-2 py-3 text-left w-1/5">Item Type</th>
                    <th className="px-2 py-3 text-left w-1/5">Item Color</th>
                    <th className="px-2 py-3 text-left w-1/5">Quantity</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table-body max-h-96 overflow-y-auto">
              <table className="w-full  table-auto border border-gray-300">
                <tbody>
                  {stock.items.map((item, index) => (
                    <tr key={item.id} 
                    className={index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"}>
                      <td className="px-4 py-3 w-1/5 font-[600] text-[17px]">
                        {item.item_name}
                      </td>
                      <td className="px-4 py-3 w-1/5 font-[600] text-[17px]">
                        {item.item_type}
                      </td>
                      <td className="px-4 py-3 w-1/5 font-[600] text-[17px]">
                        {item.item_color}
                      </td>
                      <td className="px-4 py-3 w-1/5 font-[600] text-[17px]">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockDetailsPage;
