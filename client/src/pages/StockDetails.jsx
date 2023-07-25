import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StandardLayout from "../components/layout/StandardLayout";

const fetchStockById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/stock/${id}`);
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
    <StandardLayout>
      <div className="px-10 py-6 bg-white  min-h-screen">
        <h1 className="text-3xl font-semibold pb-6">Stock Details</h1>

        {/* Display stock details here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Stock ID</p>
            <p className="text-2xl font-semibold">{stock.id}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="text-2xl font-semibold">{new Date(stock.date).toISOString().slice(0, 10)}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Time</p>
            <p className="text-2xl font-semibold">{stock.time}</p>
          </div>
        </div>
        
      {stock.items && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold pb-4">Items</h2>
            <div className="table-container">
              <div className="table-header">
                <table className="w-full table-auto border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-3 text-left w-1/5">Item Code</th>
                      <th className="px-2 py-3 text-left w-1/5">Type</th>
                      <th className="px-2 py-3 text-left w-1/5">Quantity</th>
                      <th className="px-2 py-3 text-left w-1/5">Item Name</th>
                      <th className="px-2 py-3 text-left w-1/5">Color</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="table-body max-h-96 overflow-y-auto">
                <table className="w-full  table-auto border border-gray-300">
                  <tbody>
                    {stock.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-300">
                        <td className="px-4 py-3 w-1/5">{item.item_id}</td>
                        <td className="px-4 py-3 w-1/5">{item.type}</td>
                        <td className="px-4 py-3 w-1/5">{item.quantity}</td>
                        <td className="px-4 py-3 w-1/5">{item.item_name}</td>
                        <td className="px-4 py-3 w-1/5">{item.color}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </StandardLayout>
  );
}

export default StockDetailsPage;
