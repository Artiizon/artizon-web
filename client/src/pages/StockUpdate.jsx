import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StockUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [formData, setFormData] = useState({
    items: [],
  });

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stock/${id}`);
        const stockDetails = response.data;
        if (stockDetails) {
          setStock(stockDetails);
          setFormData(stockDetails);
        }
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchStockDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/stock/${id}`, formData);
      console.log("Stock updated successfully!");
      navigate("/stock");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleQuantityChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: value,
      };
      return {
        ...prevFormData,
        items: updatedItems,
      };
    });
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <div className="px-10 py-10 min-h-screen">
        <h1 className="text-3xl font-semibold">Update Stock</h1>
        <form onSubmit={handleUpdate}>
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-3 text-left">Item Code</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Item Name</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-right">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-200 transition-all ease-in-out">
                  <td className="px-4 py-3">{item.item_id}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.item_name}</td>
                  <td className="px-4 py-3">{item.color}</td>
                  <td className="px-4 py-3 text-right">
                    <input
                      type="text"
                      name={`items[${index}].quantity`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-3"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/stock")}
              className="bg-red-500 text-white px-6 py-2.5 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </StandardLayout>
  );
}

export default StockUpdatePage;
