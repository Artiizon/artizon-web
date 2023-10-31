import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";

function StockLevelPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [itemNameFilter, setItemNameFilter] = useState("");
  const [itemList, setItemList] = useState([]);
  const [tableFilter, setTableFilter] = useState("Material"); // New table filter state
  const [itemNames, setItemNames] = useState([]); // State to store item names

  useEffect(() => {
    fetchStockLevels();
    fetchItemNames(); 
  }, []);

  useEffect(() => {
    // Trigger search whenever itemNameFilter or tableFilter changes
    handleSearch();
  }, [itemNameFilter, tableFilter]);


  const fetchStockLevels = () => {
    axios
      .get("http://localhost:8080/api/stockLevel?itemName=Material")
      .then((response) => {
        setItemList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchItemNames = () => {
    axios
      .get("http://localhost:8080/api/stockLevel/itemNames") // Replace with your API endpoint
      .then((response) => {
        setItemNames(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/stockLevel?search=${itemNameFilter}&itemName=${tableFilter}`)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1 className="text-3xl mt-10 font-bold text-gray-800 ml-10">
        Stock Levels
      </h1>
      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>
      <div className="flex flex-col items-center pl-8 pr-8 pb-8 min-h-screen">
        <div className="mb-4 flex items-center">
          {/* Dropdown filter */} &#9660; Filter by
           <select
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg ml-2 mr-2"
          >
           
            {itemNames.map((itemName) => (
              <option key={itemName} value={itemName}>
                {itemName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by Item type color"
            value={itemNameFilter}
            onChange={(e) => setItemNameFilter(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 w-96 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 ml-2 bg-black hover:bg-gray-800 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        <div className="w-[1200px] overflow-y-auto max-h-[608px] font-sans font-[700] rounded-[10px]">
          <table className="w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-black text-white" style={{ width: "200px" }}>
                  Item Name
                </th>
                <th className="py-2 px-4 bg-black text-white" style={{ width: "200px" }}>
                  Item Type
                </th>
                <th className="py-2 px-4 bg-black text-white" style={{ width: "200px" }}>
                  Item Color
                </th>
                <th className="py-2 px-4 bg-black text-white" style={{ width: "200px" }}>
                  Quantity
                </th>
                 <th className="py-2 px-4 bg-black text-white" style={{ width: "200px" }}>
                  Re order Level
                </th>

              <th className="py-2 px-4  bg-black text-white" style={{ width: "200px" }}>
                  Unit
                </th>
               
              </tr>
            </thead>
            </table>



            <div
            className="table-container"
            style={{ maxHeight: "480px", overflowY: "auto", maxWidth: "100%" }}
          >
            <table className="w-full">
       
            <tbody>
              {itemList.map((item, index) => (
                <tr
                  key={item.itemId}
                  className={index % 2 === 0 ? "bg-[#F1F1F1] text-center" : "bg-[#D9D9D9] text-center"}
                >

                  <td className="py-2.5 px-4" style={{ width: "200px" }}>
                    {item.item_name}
                  </td>
                  <td className="py-2.5 px-4" style={{ width: "200px" }}>
                    {item.item_type}
                  </td>
                  <td className="py-2.5 px-4" style={{ width: "200px" }}>
                    {item.item_color}
                  </td>
                  <td className="py-2.5 px-4" style={{ width: "200px",  backgroundColor: item.color_quantity <= item.color_reorder_level ? '#D30000' : '', }}>
                    {item.color_quantity }
                  </td>
                  <td className="py-2.5 px-4
                  " style={{ width: "200px"}}>
                    {item.color_reorder_level}
                  </td>
                  <td className="py-2.5 px-4" style={{ width: "200px" }}>
                    {item.quantityLabel}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default StockLevelPage;
