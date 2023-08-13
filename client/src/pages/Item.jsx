import React, { useState, useEffect } from "react";
import axios from "axios";
import StandardLayout from "../components/layout/StandardLayout";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";

function ItemNamePage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [searchTerm, setSearchTerm] = useState("");
  const [itemNames, setItemNames] = useState([]);

  useEffect(() => {
    // Fetch item names from backend API
    axios.get("http://localhost:8080/api/item-names").then((response) => {
      setItemNames(response.data);
    });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/item-names?search=${searchTerm}`)
      .then((response) => {
        setItemNames(response.data);
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
    <div className="container mx-auto pl-4 py-8 font-sans">
      <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">
        Item Name
      </h1>

      <div className="flex flex-col items-center pl-8 pr-8 pb-8  min-h-screen">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4  w-96 py-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-black hover:bg-gray-700 text-white rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-black text-white">Item Name</th>
                <th className="py-2 px-4 bg-black text-white">
                  Total Quantity
                </th>
                <th className="py-2 px-4 bg-black text-white"></th>
              </tr>
            </thead>
            <tbody>
              {itemNames.map((item) => (
                <tr key={item.item_name_id} className="text-center">
                  <td className="py-2 px-4">{item.item_name}</td>
                  <td className="py-2 px-4">{item.total_quantity}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/item-types/${item.item_name_id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      View Types
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemNamePage;
