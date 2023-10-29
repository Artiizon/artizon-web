import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useSnapshot } from "valtio";
import state from "../store";
import Select from "react-select";

function AddNewStockPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const navigate = useNavigate();

  const [colorOptions, setColorOptions] = useState({}); 
  const [typeOptions, setTypeOptions] = useState({});
  const [itemOptions, setItemOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [quantityInputTypes, setQuantityInputTypes] = useState([]);

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

    axios.get("http://localhost:8080/api/supplier_options").then((response) => {
      setSupplierOptions(response.data);
    });

    axios
      .get("http://localhost:8080/api/quantityInputTypes")
      .then((response) => {
        setQuantityInputTypes(response.data);
      });
  }, []);

  const [stockData, setStockData] = useState({
    items: [],
    description: "",
    supplier_id: "",
    totalCost: "",
  });

  // Inside the handleItemChange function
  const handleItemChange = (index, field, value) => {
    // Clear selected type and color when item name changes
    if (field === "itemName") {
      value = value || ""; // Ensure value is not null or undefined
      setStockData((prevStockData) => ({
        ...prevStockData,
        items: prevStockData.items.map((item, idx) =>
          idx === index
            ? { ...item, [field]: value, type: "", color: "" }
            : item
        ),
      }));
    } else if (field === "type") {
      setStockData((prevStockData) => {
        const updatedItems = [...prevStockData.items];
        // Clear the color when type changes
        updatedItems[index] = {
          ...updatedItems[index],
          [field]: value,
          color: "",
        };
        return {
          ...prevStockData,
          items: updatedItems,
        };
      });
    } else {
      setStockData((prevStockData) => {
        const updatedItems = [...prevStockData.items];
        updatedItems[index][field] = value;
        return {
          ...prevStockData,
          items: updatedItems,
        };
      });
    }
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
  
    // if (stockData.items.length === 0) {
    //   setShowPopup("Please add at least one item.");
    //   return;
    // }
  
    const hasEmptyItems = stockData.items.some(
      (item) =>
        !item.itemName || !item.type || !item.color || !item.quantity
    );
    if (hasEmptyItems) {
      setShowPopup("Please fill in all item details.");
      return;
    }
  
    if (!stockData.description) {
      setShowPopup("Please insert a Note.");
      return;
    }
  
    if (!stockData.totalCost) {
      setShowPopup("Please insert the total cost.");
      return;
    }

    if (!stockData.supplier_id) {
      setShowPopup("Please select the supplier.");
      return;
    }

  
    // All validations passed, proceed with submitting the form
    setShowPopup(null);
  
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
      <div className="flex items-center justify-between pb-3">
        <h1 className="text-3xl font-semibold">Add New Stock</h1>

        <div className="">
          {/* Add New Supplier Button */}
          <Link
            to="/supplier/view"
            className="bg-black text-white px-4 py-2 mr-3  rounded-md"
          >
            View Suppliers
          </Link>
          
          <Link
            to="/supplier/new"
            className="bg-black text-white px-4 py-2 mr-3  rounded-md"
          >
            Add New Supplier
          </Link>

          <Link
            to="/Item/new"
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Create New Item
          </Link>
        </div>
      </div>

      <div className="px-2">
        <hr className=" border-t-2 border-gray-200" />
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
                  <label className="block font-medium text-black">
                    Item Name <span className="text-red-500">*</span>
                  </label>

                  <Select
                    options={[
                      { value: "", label: "Select Item Name", disabled: true },
                      ...itemOptions.map((itemOption) => ({
                        value: itemOption.value,
                        label: itemOption.value,
                      })),
                    ]}
                    value={{
                      value: item.itemName,
                      label: item.itemName,
                    }}
                    onChange={(selectedOption) =>
                      handleItemChange(index, "itemName", selectedOption.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    isSearchable={true}
                    placeholder="Select Item Name"
                    required
                  />
                </div>

                <div className="w-1/3">
                  <label className="block font-medium text-black">
                    Item Type <span className="text-red-500">*</span>
                  </label>

                  <Select
                    options={[
                      { value: "", label: "Select Item Type", disabled: true }, // Added disabled option
                      ...(typeOptions[item.itemName] || []).map(
                        (typeOption) => ({
                          value: typeOption.value,
                          label: typeOption.label,
                        })
                      ),
                    ]}
                    value={{
                      value: item.type,
                      label: item.type,
                    }}
                    onChange={(selectedOption) =>
                      handleItemChange(index, "type", selectedOption.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    isSearchable={true}
                    placeholder="Select Type"
                    required
                  />
                </div>

                <div className="w-1/3">
                  <label className="block font-medium text-black">
                    Item Color <span className="text-red-500">*</span>
                  </label>

                  <Select
                    options={[
                      { value: "", label: "Select a color", disabled: true },
                      ...(colorOptions[item.itemName]?.[item.type] || []).map(
                        (colorOption) => ({
                          value: colorOption.value,
                          label: colorOption.value,
                        })
                      ),
                    ]}
                    value={{
                      value: item.color,
                      label: item.color,
                    }}
                    onChange={(selectedOption) =>
                      handleItemChange(index, "color", selectedOption.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-80"
                    isSearchable={true}
                    placeholder="Select a color"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="w-1/3">
                  <label className="block  font-medium text-black">Item Quantity{" "} <span className="text-red-500">*</span>
                    {quantityInputTypes.map(
                      (itemObj) =>
                        itemObj.itemValue === item.itemName && (
                          <span key={itemObj.itemValue}>
                            
                            ({" "}
                            {itemObj.quantityLabel} )
                          </span>
                        )
                    )}
                  </label>

                  <input
                    type={
                      quantityInputTypes.find(
                        (itemObj) => itemObj.itemValue === item.itemName
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
          <label className="block  font-medium text-black"> Note<span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={stockData.description}
            onChange={(e) =>
              setStockData({ ...stockData, description: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            style={{ height: "75px", resize: "none" }} // Disable resizing
            required
          />
        </div>





        <div className="px-4 py-2">
          <label className="block font-medium text-black">
            Select Supplier <span className="text-red-500">*</span>
          </label>

          <Select
            options={[
              { value: "", label: "Select Supplier", disabled: true },
              ...supplierOptions.map((option) => ({
                value: option.id,
                label: option.value, // Display supplier name
              })),
            ]}
            value={{
              value: stockData.supplier_id,
              label:
                supplierOptions.find(
                  (option) => option.id === stockData.supplier_id
                )?.value || "Select Supplier",
            }}
            onChange={(selectedOption) =>
              setStockData({
                ...stockData,
                supplier_id: selectedOption.value,
              })
            }
            className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"
            isSearchable={true}
            placeholder="Select Supplier"
            maxMenuHeight={170}
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
            // disabled={
            //   stockData.items.length === 0 ||
            //   stockData.items.some(
            //     (item) =>
            //       !item.itemName || !item.type || !item.color || !item.quantity
            //   ) ||
            //   !stockData.description ||
            //   !stockData.totalCost
            // }
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
            <p className="text-2xl font-semibold mb-4">
                {showPopup}
            </p>
            <button
              className="bg-blue-500 text-white px-4  py-2 rounded-md"
              onClick={() => setShowPopup(null)}
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
