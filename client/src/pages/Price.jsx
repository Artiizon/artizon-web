import React, { useState, useEffect } from "react";
import axios from "axios";

function PricePage() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch prices from backend API
    axios.get(`http://localhost:8080/api/prices?search=${searchTerm}`).then((response) => {
      setPrices(response.data);
    });
  }, [searchTerm]);

  const handleUpdatePrice = (priceId) => {
    // Implement the logic to update the price here
    // You can show a modal or a form for updating the price
    console.log(`Update price with ID ${priceId}`);
  };

  const handleAddPrice = (itemId, itemType, itemColor) => {
    // Implement the logic to add a new price here
    // You can show a modal or a form for adding a new price
    console.log(`Add price for Item: ${itemId}, Type: ${itemType}, Color: ${itemColor}`);
  };

  return (
    <div>
      <h1 className="text-3xl mt-10 font-bold text-gray-800 ml-10">Price </h1>
      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>
      <div className="flex flex-col items-center pl-8 pr-8 pb-8  min-h-screen">
      <div className="mb-4  ">
          <input
            type="text"
            placeholder="Search Item "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 w-96 py-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)} // You can add your search logic here
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
          >
            Search
          </button>
        </div>
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-black text-white">Item Name</th>
              <th className="py-2 px-4 bg-black text-white">Item Type</th>
              <th className="py-2 px-4 bg-black text-white">Item Color</th>
              <th className="py-2 px-4 bg-black text-white">Price</th>
              <th className="py-2 px-4 bg-black text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price.id}>
                <td className="py-2 px-4">{price.item_name}</td>
                <td className="py-2 px-4">{price.item_type}</td>
                <td className="py-2 px-4">{price.item_color}</td>
                <td className="py-2 px-4">{price.price}</td>
                <td className="py-2 px-4">
                  {price.price === 0 ? (
                    <button
                      onClick={() => handleAddPrice(price.itemId, price.itemType, price.itemColor)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdatePrice(price.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PricePage;
