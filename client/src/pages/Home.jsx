import React, { useState } from "react";
import StandardLayout from "../components/layout/StandardLayout";

const ItemPage = () => {
  // Sample data for item names, types, colors, and quantities
  const itemNames = ["Material", "Button"];
  const itemTypes = {
    Material: ["Silk", "Cotton"],
    Button: ["Type1", "Type2", "Type3"],
  };
  const itemColors = {
    Material: ["Red", "Blue"],
    Button: ["Brown", "Blue"],
  };
  const itemQuantities = {
    Material: {
      Silk: { Red: 20, Blue: 15 },
      Cotton: { Red: 30, Blue: 25 },
    },
    Button: {
      Type1: { Brown: 50, Blue: 40 },
      Type2: { Brown: 60, Blue: 55 },
      Type3: { Brown: 70, Blue: 65 },
    },
  };

  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemType, setSelectedItemType] = useState("");
  const [selectedItemColor, setSelectedItemColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleItemNameChange = (e) => {
    setSelectedItemName(e.target.value);
    setSelectedItemType("");
    setSelectedItemColor("");
    setQuantity(0);
  };

  const handleItemTypeChange = (e) => {
    setSelectedItemType(e.target.value);
    setSelectedItemColor("");
    setQuantity(0);
  };

  const handleItemColorChange = (e) => {
    setSelectedItemColor(e.target.value);
    setQuantity(0);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleUpdateQuantity = () => {
    // Implement the update quantity logic here
    // For now, just log the selected values and quantity
    console.log("Selected Item Name:", selectedItemName);
    console.log("Selected Item Type:", selectedItemType);
    console.log("Selected Item Color:", selectedItemColor);
    console.log("Selected Quantity:", quantity);
  };

  return (
    <StandardLayout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 ">Item Page</h1>
        <div className="px-2">
          <hr className="my-4 border-t-2 border-gray-200" />
        </div>

        <div className="grid grid-raws-1 md:grid-raws-2 lg:grid-raws-3 gap-4 justify-center ">
          {/* Item Name Dropdown */}
          <div >
            <label className="block text-sm font-medium text-gray-700 ">Item Name</label>
            <select
              value={selectedItemName}
              onChange={handleItemNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-60"
            >
              <option value="">Select Item Name</option>
              {itemNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Item Type Dropdown */}
          {selectedItemName && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Type</label>
              <select
                value={selectedItemType}
                onChange={handleItemTypeChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              >
                <option value="">Select Item Type</option>
                {itemTypes[selectedItemName].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Item Color Dropdown */}
          {selectedItemName && selectedItemType && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Color</label>
              <select
                value={selectedItemColor}
                onChange={handleItemColorChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              >
                <option value="">Select Item Color</option>
                {itemColors[selectedItemName].map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Input and Update Button */}
          {selectedItemName && selectedItemType && selectedItemColor && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-60"
              />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-60"
                onClick={handleUpdateQuantity}
              >
                Update Quantity
              </button>
            </div>
          )}
        </div>
      </div>
    </StandardLayout>
  );
};

export default ItemPage;
