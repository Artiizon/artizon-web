import React, { useState, useEffect } from "react";
import axios from "axios";
import StandardLayout from "../components/layout/StandardLayout";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";

function ItemTypesPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const { item_name_id } = useParams();
  console.log("item_name_id", item_name_id);
  const [itemName, setItemName] = useState("");
  const [itemTypes, setItemTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/item-nameByID/${item_name_id}`)
      .then((response) => {
        setItemName(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8080/api/item-types/${item_name_id}`)
      .then((response) => {
        setItemTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [item_name_id]);

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:8080/api/item-types/${item_name_id}?search=${searchTerm}`
      )
      .then((response) => {
        setItemTypes(response.data);
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
      <h1 className="text-3xl mt-10 font-bold text-gray-800  ml-10">
        Item Types for {itemName}
      </h1>
      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>
      <div className="flex flex-col items-center pl-8 pr-8 pb-8  min-h-screen">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Item Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4  w-96 py-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        <div className="w-[1200px] overflow-y-auto max-h-[608px] font-sans font-[700] rounded-[10px]">
  <table className="w-full table-auto bg-white shadow-md rounded-lg">
    <thead>
      <tr>
        <th className="py-2 px-12 bg-black text-white">Item Type</th>
        <th className="py-2 pr-48 bg-black text-white">
          Total Quantity
        </th>
        <th className="py-2 px-20 bg-black text-white"></th>
      </tr>
    </thead>
  </table>

  <div className="table-container" style={{ maxHeight: "480px", overflowY: "auto", maxWidth: "100%" }}>
    <table className="w-full">
      <tbody>
        {itemTypes.map((itemType, index) => (
          <tr
            key={itemType.item_type_id}
            className={index % 2 === 0 ? "bg-[#F1F1F1] text-center" : "bg-[#D9D9D9] text-center"}
          >
            <td className="py-2.5 px-4">{itemType.item_type}</td>
            <td className="py-2.5 px-4">{itemType.total_quantity}</td>
            <td className="py-2.5 px-4">
              <Link
                to={`/item-colors/${itemType.item_type_id}?itemName=${encodeURIComponent(itemName)}`}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                View Colors
              </Link>
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

export default ItemTypesPage;
