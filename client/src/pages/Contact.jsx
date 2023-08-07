import React, { useState, useEffect } from "react";
import axios from "axios";

function AddNewStockPage() {
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

  const handleItemNameChange = (event) => {
    console.log("Item Name Change",);
    const selectedNameId = event.target.value;
    axios.get(`http://localhost:3001/api/item-types/${selectedNameId}`).then((response) => {
      console.log("response Item type",response);
      setItemTypes(response.data);
      setItemColors([]);
    });
  };

  const handleItemTypeChange = (event) => {
    const selectedTypeId = event.target.value;
    axios.get(`http://localhost:3001/api/item-colors/${selectedTypeId}`).then((response) => {
      setItemColors(response.data);
    });
  };

  return (
    <div>
      <h2>Select Item Name</h2>
      <select onChange={handleItemNameChange}>
        <option value="">Select Item Name</option>
        {itemNames.map((item) => (
          <option key={item.item_name_id} value={item.item_name_id}>
            {item.item_name}
          </option>
        ))}
      </select>

      <h2>Select Item Type</h2>
      <select onChange={handleItemTypeChange}>
        <option value="">Select Item Type</option>
        {itemTypes.map((type) => (
          <option key={type.item_type_id} value={type.item_type_id}>
            {type.item_type}
          </option>
        ))}
      </select>

      <h2>Select Item Color</h2>
      <select>
        <option value="">Select Item Color</option>
        {itemColors.map((color) => (
          <option key={color.item_color_id} value={color.item_color_id}>
            {color.item_color}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddNewStockPage;
