import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

function AddNewStockPage() {
  const navigate = useNavigate();

  const [itemNames, setItemNames] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [itemColors, setItemColors] = useState([]);

  useEffect(() => {
    // Fetch item names
    axios.get("http://localhost:3001/api/item-names").then((response) => {
    console.log("Response",response.data);  
    setItemNames(response.data);

    });
  }, []);
  

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
      const updatedItem = { ...updatedItems[index] };

      if (field === 'itemName') {
        const selectedNameId = value;
        axios.get(`http://localhost:3001/api/item-types/${selectedNameId}`).then((response) => {
          updatedItem.itemName = value;
          updatedItem.type = ''; // Reset type when item name changes
          updatedItem.color = ''; // Reset color when item name changes
          setItemTypes(response.data);
          setItemColors([]);
        });
      } else if (field === 'type') {
        const selectedTypeId = value;
        axios.get(`http://localhost:3001/api/item-colors/${selectedTypeId}`).then((response) => {
          updatedItem.type = value;
          updatedItem.color = ''; // Reset color when type changes
          setItemColors(response.data);
        });
      } else if (field === 'color') {
        updatedItem.color = value;
      } else if (field === 'quantity') {
        updatedItem.quantity = value;
      }

      updatedItems[index] = updatedItem;
      
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
                      {itemNames.map((item) => (
                          <option key={item.item_name_id} value={item.item_name_id}>
                             {item.item_name}
                          </option>
                      ))}


                      
                    </select>
                  </div>
                  
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Type
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
                     {itemTypes.map((type) => (
                  <option key={type.item_type_id} value={type.item_type_id}>
                    {type.item_type}
                  </option>
                ))}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Color
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
                      {itemColors.map((color) => (
                        <option key={color.item_color_id} value={color.item_color_id}>
                          {color.item_color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Item Quantity
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