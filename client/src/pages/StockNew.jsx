import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

const colorOptions = {
  Material: {
    Silk: [
      { value: "#FFFF00", label: "Yellow (#FFFF00)" },
      { value: "#FF0002", label: "Red (#FF0002)" },
    ],
    Cotton: [
      { value: "#00FF00", label: "Green (#00FF00)" },
      { value: "#0000FF", label: "Blue (#0000FF)" },
    ],
  },
  Button: {
    Type1: [
      { value: "#FFFFFF", label: "White (#FFFFFF)" },
      { value: "#000000", label: "Black (#000000)" },
    ],
    Type2: [
      { value: "#FFA500", label: "Orange (#FFA500)" },
      { value: "#800080", label: "Purple (#800080)" },
    ],
    Type3: [
      { value: "#FFC0CB", label: "Pink (#FFC0CB)" },
      { value: "#FFD700", label: "Gold (#FFD700)" },
    ],
  },
  // ... Add more color options for other item names and types as needed ...
};

const typeOptions = {
  Material: [
    { value: "Silk", label: "Silk" },
    { value: "Cotton", label: "Cotton" },
  ],
  Button: [
    { value: "Type1", label: "Type1" },
    { value: "Type2", label: "Type2" },
    { value: "Type3", label: "Type3" },
  ],
  Ink: [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
  ],
  Thread: [
    { value: "White", label: "White" },
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
  ],
};
const itemOptions = [
  { value: "Material", label: "Material" },
  { value: "Button", label: "Button" },
  { value: "Ink", label: "Ink" },
  { value: "Thread", label: "Thread" },
];

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

function AddNewStockPage() {
  const navigate = useNavigate();

  

  const [stockData, setStockData] = useState({
    date: new Date(),
    time: getCurrentTime(),
    items: [],
    description: "",
    totalCost: "",
  });

  const handleItemChange = (index, field, value) => {
    setStockData((prevStockData) => {
      const updatedItems = [...prevStockData.items];
      updatedItems[index][field] = value;
      return {
        ...prevStockData,
        items: updatedItems,
      };
    });
  };

  const handleAddItem = () => {
    setStockData((prevStockData) => ({
      ...prevStockData,
      items: [...prevStockData.items, { itemName: "", type: "", color: "", quantity: "" }],
    }));
  };

  const handleRemoveItem = (index) => {
    setStockData((prevStockData) => {
      const updatedItems = [...prevStockData.items];
      updatedItems.splice(index, 1);
      return {
        ...prevStockData,
        items: updatedItems,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (stockData.items.length === 0) {
      setShowPopup(true);
      return;
    }

    axios
      .post("http://localhost:3001/api/stock", stockData)
      .then((response) => {
        console.log(response.data);
        navigate("/stock");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const titleOptions = ["Mr", "Mrs"];
  const [showPopup, setShowPopup] = useState(false);

  // Check if there are no items, then add one item by default
  useEffect(() => {
    if (stockData.items.length === 0) {
      handleAddItem();
    }
  }, [stockData.items]);




  return (
    <StandardLayout>
      <div className="px-10 py-6 bg-white rounded-lg shadow-md min-h-screen">
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-3xl font-semibold">Add New Stock</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pb-6">
            {stockData.items.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 my-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Item {index + 1}</h2>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="flex gap-4 mt-4">
                  
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Name
                    </label>
                    <select
                      name="itemName"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Item Name
                      </option>
                      {itemOptions.map((itemOption) => (
                        <option key={itemOption.value} value={itemOption.value}>
                          {itemOption.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      value={item.type}
                      onChange={(e) => handleItemChange(index, "type", e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      {typeOptions[item.itemName]?.map((typeOption) => (
                        <option key={typeOption.value} value={typeOption.value}>
                          {typeOption.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <select
                      name="color"
                      value={item.color}
                      onChange={(e) => handleItemChange(index, "color", e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="" disabled>
                        Select a color
                      </option>
                      {colorOptions[item.itemName]?.[item.type]?.map((colorOption) => (
                        <option key={colorOption.value} value={colorOption.value}>
                          {colorOption.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Item
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Special Note
            </label>
            <textarea
              name="description"
              value={stockData.description}
              onChange={(e) => setStockData({ ...stockData, description: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm  font-medium text-gray-700">
              Total Cost (Rs.)
            </label>
            <input
              type="text"
              name="totalCost"
              value={stockData.totalCost}
              onChange={(e) => setStockData({ ...stockData, totalCost: e.target.value })}
              className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={stockData.items.length === 0}
            >
              Add Stock
            </button>
            <Link
              to="/stock"
              className="bg-red-500 text-white px-6 py-2.5 ml-3 rounded-md"
            >
              Cancel
            </Link>
          </div>
        </form>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
              <p className="text-xl font-semibold mb-4">
                Please add at least one item to save the stock.
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </StandardLayout>
  );
}

export default AddNewStockPage;
