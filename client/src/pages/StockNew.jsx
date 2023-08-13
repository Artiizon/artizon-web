import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

const quantityInputTypes = [
  { itemvalue: "Material", quantityType: "number", quantitylabel: "Meters" },
  { itemvalue: "Button", quantityType: "number", quantitylabel: "Count" },
];

function AddNewStockPage() {
  const navigate = useNavigate();

  const [colorOptions, setColorOptions] = useState({});
  const [typeOptions, setTypeOptions] = useState({});
  const [itemOptions, setItemOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/color_options").then((response) => {
      setColorOptions(response.data);
    });

    axios.get("http://localhost:8080/api/type_options").then((response) => {
      setTypeOptions(response.data);
    });

    axios.get("http://localhost:8080/api/item_options").then((response) => {
      setItemOptions(response.data);
    });
  }, []);

  console.log("Success", itemOptions);

  const [stockData, setStockData] = useState({
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
      items: [
        ...prevStockData.items,
        { itemName: "", type: "", color: "", quantity: "" },
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

    if (stockData.items.length === 0) {
      setShowPopup(true);
      return;
    }

    axios
      .post("http://localhost:8080/api/stock", stockData)
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
    <div className="px-10 py-6 mt-3 bg-white rounded-lg shadow-md min-h-screen">
      <div className="flex items-center justify-between pb-1">
        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[1px] font-sans">
          Add New Stock
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-[20px] mt-[-25px]">
          {stockData.items.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 my-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[25px] font-bold font-sans">
                  Item {index + 1}
                </h2>
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
                  <label className="block  font-medium text-black">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(index, "itemName", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    required
                  >
                    <option value="" disabled>
                      Select Item Name
                    </option>
                    {itemOptions.map((itemOption) => (
                      <option key={itemOption.value} value={itemOption.value}>
                        {itemOption.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-1/3">
                  <label className="block  font-medium text-black">
                    Item Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={item.type}
                    onChange={(e) =>
                      handleItemChange(index, "type", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
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
                  <label className="block  font-medium text-black">
                    Item Color <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="color"
                    value={item.color}
                    onChange={(e) =>
                      handleItemChange(index, "color", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    required
                  >
                    <option value="" disabled>
                      Select a color
                    </option>
                    {colorOptions[item.itemName]?.[item.type]?.map(
                      (colorOption) => (
                        <option
                          key={colorOption.value}
                          value={colorOption.value}
                        >
                          {colorOption.value}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="w-1/3">
                  <label className="block  font-medium text-black">
                    Item Quantity{" "}
                    {quantityInputTypes.find(
                      (itemObj) => itemObj.itemvalue === item.itemName
                    )?.quantitylabel || ""}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={
                      quantityInputTypes.find(
                        (itemObj) => itemObj.itemvalue === item.itemName
                      )?.quantityType || "text"
                    }
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-2 bg-black text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>
        </div>

        <div className="px-4 py-2">
          <label className="block  font-medium text-black">
            Special Note <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={stockData.description}
            onChange={(e) =>
              setStockData({ ...stockData, description: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="px-4 py-2">
          <label className="block   font-medium text-black">
            Total Cost (Rs.) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="totalCost"
            value={stockData.totalCost}
            onChange={(e) =>
              setStockData({ ...stockData, totalCost: e.target.value })
            }
            className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="px-4 py-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-md"
            disabled={
              stockData.items.length === 0 ||
              stockData.items.some(
                (item) =>
                  !item.itemName || !item.type || !item.color || !item.quantity
              ) ||
              !stockData.description ||
              !stockData.totalCost
            }
          >
            Add Stock
          </button>
          <Link
            to="/stock"
            className="bg-red-600 text-white px-6 py-2.5 ml-3 rounded-md"
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
  );
}

export default AddNewStockPage;
