import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

const colorOptions = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
  { value: "silver", label: "Silver" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
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
    items: [{ itemId: "", type: "", quantity: "", itemName: "", color: "" }],
  });

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setStockData((prevStockData) => {
      const updatedItems = [...prevStockData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      };
      return {
        ...prevStockData,
        items: updatedItems,
      };
    });
  };

  const handleAddItem = () => {
    setStockData((prevStockData) => ({
      ...prevStockData,
      items: [
        ...prevStockData.items,
        { itemId: "", type: "", quantity: "", itemName: "", color: "" },
      ],
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

    if (stockData.items[0].itemId === "" && 
    stockData.items[0].type === "" && 
    stockData.items[0].quantity === "" && 
    stockData.items[0].itemName === "" && 
    stockData.items[0].color === "") {
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
                  <div className="w-1/5">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Code
                    </label>
                    <input
                      type="text"
                      name="itemId"
                      value={item.itemId}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="w-1/5">
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      value={item.type}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      <option value="Material">Material</option>
                      <option value="Button">Button</option>
                      <option value="Ink">Ink</option>
                      <option value="Thread">Thread</option>
                    </select>
                  </div>
                  <div className="w-1/5">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="w-1/5">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="w-1/5">
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <select
                      name="color"
                      value={item.color}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    >
                      <option value="" disabled>
                        Select a color
                      </option>
                      {colorOptions.map((colorOption) => (
                        <option key={colorOption.value} value={colorOption.value}>
                          {colorOption.label}
                        </option>
                      ))}
                    </select>
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
