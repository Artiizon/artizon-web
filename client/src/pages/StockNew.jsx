import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

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

function AddNewStockPage() {
  const [stockData, setStockData] = useState({
    date: new Date(),
    time: "09:00",
    items: [],
  });

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStockData((prevStockData) => ({
      ...prevStockData,
      [name]: value,
    }));
  };

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
      items: [...prevStockData.items, { itemId: "", type: "", quantity: "", itemName: "", color: "" }],
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
    // Handle form submission logic here
    console.log(stockData);
  };

  return (
    <div className="px-10 py-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-semibold">Add New Stock</h1>
        <Link to="/stock" className="text-blue-500">
          Back to Stock Management
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <DatePicker
            name="date"
            selected={stockData.date}
            onChange={(date) => setStockData((prevStockData) => ({ ...prevStockData, date }))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="pb-4">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <TimePicker
            name="time"
            value={stockData.time}
            onChange={(time) => setStockData((prevStockData) => ({ ...prevStockData, time }))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="pb-6">
          <label className="block text-sm font-medium text-gray-700">Items</label>
          {stockData.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 mt-2">
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700">Item ID</label>
                <input
                  type="text"
                  name="itemId"
                  value={item.itemId}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700">Type</label>
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
                  <option value="Shirt">Shirt</option>
                  <option value="Pants">Pants</option>
                  <option value="Shoes">Shoes</option>
                </select>
              </div>
              <div className="w-20">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700">Color</label>
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
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddItem} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Item
          </button>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save Stock
          </button>
          <Link to="/stock" className="ml-4 text-blue-500">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddNewStockPage;
