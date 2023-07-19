import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useNavigate } from "react-router-dom";

// Placeholder function for fetching stock details by ID
const fetchStockById = async (id) => {
  // Replace this with your actual API call or data fetching logic
  // For now, let's assume stocks is an array of stock objects
  // and we are finding the stock with the matching ID
    const stocks = [
        {
          id: 1,
          date: "2023-07-17",
          time: "09:00 AM",
          items: [
            {
              itemId: 1,
              type: "Shirt",
              quantity: 50,
              itemName: "Shirt1",
              color: "White",
            },
            {
              itemId: 2,
              type: "Pants",
              quantity: 30,
              itemName: "Pants1",
              color: "Black",
            },
          ],
        },
        {
          id: 2,
          date: "2023-07-17",
          time: "09:00 AM",
          items: [
            {
              itemId: 1,
              type: "Shirt",
              quantity: 50,
              itemName: "Shirt1",
              color: "White",
            },
            {
              itemId: 2,
              type: "Pants",
              quantity: 30,
              itemName: "Pants1",
              color: "Black",
            },
          ],
        },
    
        {
          id: 3,
          date: "2023-07-17",
          time: "09:00 AM",
          items: [
            {
              itemId: 1,
              type: "Shirt",
              quantity: 50,
              itemName: "Shirt1",
              color: "White",
            },
            {
              itemId: 2,
              type: "Pants",
              quantity: 30,
              itemName: "Pants1",
              color: "Black",
            },
          ],
        },
    
        {
          id: 4,
          date: "2023-07-17",
          time: "09:00 AM",
          items: [
            {
              itemId: 1,
              type: "Shirt",
              quantity: 50,
              itemName: "Shirt1",
              color: "White",
            },
            {
              itemId: 2,
              type: "Pants",
              quantity: 30,
              itemName: "Pants1",
              color: "Black",
            },
          ],
        },
    
        {
          id: 5,
          date: "2023-07-17",
          time: "09:00 AM",
          items: [
            {
              itemId: 1,
              type: "Shirt",
              quantity: 50,
              itemName: "Shirt1",
              color: "White",
            },
            {
              itemId: 2,
              type: "Pants",
              quantity: 30,
              itemName: "Pants1",
              color: "Black",
            },
          ],
        }
        
        // Add more sample stocks here...
      ];
  

  // Find the stock with the matching ID
  const stock = stocks.find((stock) => stock.id === parseInt(id, 10));
  return stock || null;
};

function StockUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [formData, setFormData] = useState({
    // Initialize form data with empty values or default values for the stock fields
    date: "",
    time: "",
    items: [],
  });

  // Fetch stock details based on the ID from the URL
  useEffect(() => {
    const fetchStockDetails = async () => {
      const stockDetails = await fetchStockById(id);
      if (stockDetails) {
        setStock(stockDetails);
        setFormData(stockDetails); // Set form data with the fetched stock details
      }
    };

    fetchStockDetails();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Perform the update logic here, such as sending the updated stock data to the server
    // or updating the data locally (depending on your setup)
    console.log("Updated stock data:", formData);
    // After successful update, you can navigate the user back to the StockManagementPage
    navigate("/stock");
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <div className="px-10 bg-white">
        <h1 className="text-3xl font-semibold pb-6">Update Stock</h1>
        <form onSubmit={handleUpdate}>
          {/* Input fields for updating stock data */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
              className="border rounded-md py-2 px-3 w-full"
            />
          </div>

          {/* Add input fields for other stock properties */}
          {/* For example, for each item in the items array */}
          {formData.items.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Item ID:</label>
              <input
                type="text"
                name={`items[${index}].itemId`}
                value={item.itemId}
                onChange={handleFormChange}
                className="border rounded-md py-2 px-3 w-full"
              />
              {/* Add other input fields for item properties (type, quantity, item name, color) */}
              {/* For example: */}
              <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
              <input
                type="text"
                name={`items[${index}].type`}
                value={item.type}
                onChange={handleFormChange}
                className="border rounded-md py-2 px-3 w-full"
              />
              {/* Add other input fields for item properties */}
              {/* For example: */}
              {/* Quantity, Item Name, Color */}
            </div>
          ))}

          {/* Submit and Cancel buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/stock")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
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
