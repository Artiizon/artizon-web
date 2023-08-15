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
    console.log("item_name_id",item_name_id);
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
        .get(`http://localhost:8080/api/item-types/${item_name_id}?search=${searchTerm}`)
        .then((response) => {
          setItemTypes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto pl-4 py-8 font-sans">
        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">Item Types for {itemName}</h1>
         
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
          className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <div className="w-[1300px] ml-[-90px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-black text-white">Item Type</th>
              <th className="py-2 px-4 bg-black text-white">Total Quantity</th>
              <th className="py-2 px-4 bg-black text-white"></th>
            </tr>
          </thead>
          <tbody>
            {itemTypes.map((itemType,index) => (
              <tr key={itemType.item_type_id} className={index % 2 === 0 ? "bg-[#F1F1F1] text-center" : "bg-[#D9D9D9] text-center"}>
                <td className="py-2 px-4">{itemType.item_type}</td>
                <td className="py-2 px-4">{itemType.total_quantity}</td>
                <td className="py-2 px-4">
                <Link
                        to={`/item-colors/${itemType.item_type_id}?itemName=${encodeURIComponent(itemName)}`}
                        
                        className="bg-black text-white px-4 py-2 rounded-md text-bold"
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
  );
}

export default ItemTypesPage;
