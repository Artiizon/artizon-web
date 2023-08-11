import React, { useState, useEffect } from "react";
import axios from "axios";
import StandardLayout from "../components/layout/StandardLayout";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function ItemColorsPage() {
   
    const { item_type_id } = useParams(['item_type_id']);
    

    const [itemType, setItemType] = useState("");
    const [itemColors, setItemColors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemName = searchParams.get('itemName');

    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/item-typeByID/${item_type_id}`)
        .then((response) => {
          setItemType(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  
      axios
        .get(`http://localhost:8080/api/item-colors/${item_type_id}`)
        .then((response) => {
          setItemColors(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [item_type_id]);
  
    const handleSearch = () => {
      axios
        .get(`http://localhost:8080/api/item-colors/${item_type_id}?search=${searchTerm}`)
        .then((response) => {
          setItemColors(response.data);
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
    <StandardLayout>
        <h1 className="text-3xl mt-10 font-bold text-gray-800  ml-10">Item Colors for {itemName} {itemType}</h1>
         <div className='px-2'>
             <hr className="my-4 border-t-2 border-gray-200" />
          </div>
      <div className="flex flex-col items-center pl-8 pr-8 pb-8  min-h-screen">

     
      <div className="mb-4">
     
     
        <input
          type="text"
          placeholder="Search Item Color"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="px-4  w-96 py-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-black text-white">Item Color</th>
              <th className="py-2 px-4 bg-black text-white">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {itemColors.map((itemColor) => (
              <tr key={itemColor.item_color_id} className="text-center">
                <td className="py-2 px-4">{itemColor.item_color}</td>
                <td className="py-2 px-4">{itemColor.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </StandardLayout>
  );
}

export default ItemColorsPage;
