import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddNewItemForm = () => {
  const navigate = useNavigate();

  const [itemExistError, setItemExistError] = useState(false);
  const [itemExistError2, setItemExistError2] = useState(false);

  const handleItemExistErrorClose = () => {
    setItemExistError(false);
    setItemExistError2(false);
  };

  const [errors, setErrors] = useState({
    item_name: "",
    item_type: "",
    item_color: "",
    quantity_label: "",
    quantity_type: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!itemInfo.item_name) {
      isValid = false;
      newErrors.item_name = "Item Name is required";
    }

    if (!itemInfo.item_type) {
      isValid = false;
      newErrors.item_type = "Item Type is required";
    }

    if (!itemInfo.item_color) {
      isValid = false;
      newErrors.item_color = "Item Color is required";
    }

    if (!itemInfo.quantity_label) {
      isValid = false;
      newErrors.quantity_label = "Quantity Label is required";
    }

    if (!itemInfo.quantity_type) {
      isValid = false;
      newErrors.quantity_type = "Quantity Type is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const [itemInfo, setItemInfo] = useState({
    item_name: "",
    item_type: "",
    item_color: "",
    quantity_label: "",
    quantity_type: "", // Default value for quantity type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  
  const handleQuantityTypeChange = (selectedOption) => {
    setItemInfo((prevInfo) => ({
      ...prevInfo,
      quantity_type: selectedOption.value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/item/check`,
          {
            params: {
              item_name: itemInfo.item_name,
              item_type: itemInfo.item_type,
              item_color: itemInfo.item_color,
            },
          }
        );

        const response2 = await axios.get(
          `http://localhost:8080/api/item/checkItemType`,
          {
            params: {
              item_name: itemInfo.item_name,
              item_type: itemInfo.item_type,
            },
          }
        );

        if (response.data.exists) {
          setItemExistError(true);
        } else if (response2.data.match == false) {
          setItemExistError2(true);
        } else {
          navigate("/stock/new");
          const postResponse = await axios.post(
            "http://localhost:8080/api/item",
            itemInfo
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mt-10 mb-10 max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-4">Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="item_name">
            Item Name
          </label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            placeholder="Material"
            value={itemInfo.item_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500">{errors.item_name}</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="item_type">
            Item Type
          </label>
          <input
            type="text"
            id="item_type"
            placeholder="Silk"
            name="item_type"
            value={itemInfo.item_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500">{errors.item_type}</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="item_color">
            Item Color
          </label>
          <input
            type="text"
            id="item_color"
            placeholder="#ff0002"
            name="item_color"
            value={itemInfo.item_color}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500">{errors.item_color}</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="quantity_label">
            Quantity Label
          </label>
          <input
            type="text"
            id="quantity_label"
            name="quantity_label"
            placeholder="Meters"
            value={itemInfo.quantity_label}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500">{errors.quantity_label}</div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="quantity_type">
            Quantity Type
          </label>
          <Select
            id="quantity_type"
            name="quantity_type"
            options={[
              { value: "", label: "Select a quantity type", disabled: true },
              { value: "number", label: "number" },
              { value: "text", label: "text" },
            ]}
            value={{
              value: itemInfo.quantity_type,
              label: itemInfo.quantity_type,
            }}
            onChange={handleQuantityTypeChange}
            className="w-full"
            classNamePrefix="react-select"
            isSearchable={true}
            placeholder="Select a quantity type"
          />
          <div className="text-red-500">{errors.quantity_type}</div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 mr-3 rounded-md"
          >
            Create Item
          </button>
        </div>

        {itemExistError && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black opacity-30 z-40"
              onClick={handleItemExistErrorClose}
            ></div>

            {/* Popup */}
            <div className="bg-white p-10 rounded-lg shadow-xl relative z-50">
              <p className="text-red-500 text-2xl font-semibold mb-2">
                Item already exists.
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleItemExistErrorClose}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {itemExistError2 && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black opacity-30 z-40"
              onClick={handleItemExistErrorClose}
            ></div>

            {/* Popup */}
            <div className="bg-white p-10 rounded-lg shadow-xl relative z-50">
              <p className="text-red-500 text-2xl font-semibold mb-2">
                {itemInfo.item_type} Exist in another Item Name
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleItemExistErrorClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewItemForm;
