import React, { useState, useEffect } from "react";
import axios from "axios";

function PricePage() {
  const [prices, setPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Selected item details
  const [showAddPopup, setShowAddPopup] = useState(false); // State for showing the Add Popup
  const [newPrice, setNewPrice] = useState(""); // Input field for new price
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [addButtonClicked, setAddButtonClicked] = useState(false); // Add button clicked state

  const [updatedPrice, setUpdatedPrice] = useState(""); // Updated price value
  const [updateErrorMessage, setUpdateErrorMessage] = useState(""); // Error message for update
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); // State for showing the Update Popup
  const [selectedPriceId, setSelectedPriceId] = useState(null); // Selected price ID to update
  const [selectedItemDetails, setSelectedItemDetails] = useState(null); // Selected item details
  
  useEffect(() => {
    // Fetch prices from backend API
    axios
      .get(`http://localhost:8080/api/prices?search=${searchTerm}`)
      .then((response) => {
        setPrices(response.data);
      });
  }, [searchTerm, addButtonClicked]);

  const handleUpdatePrice = (priceId,itemName, itemType, itemColor,quantityLabel, currentPrice) => {
    // Set the selected price ID when the "Update Price" button is clicked
    setSelectedPriceId(priceId);
    setUpdatedPrice(currentPrice.toString()); // Clear the updated price input field
    setUpdateErrorMessage(""); // Clear the update error message
    setShowUpdatePopup(true); // Show the Update Popup
    setSelectedItemDetails({
      itemName,
      itemType,
      itemColor,
    });
  };

  

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedPriceId(null);
  };

  const handleUpdatedPriceInputChange = (e) => {
    setUpdatedPrice(e.target.value);
  };

  const handleUpdatePriceSubmit = () => {
    if (updatedPrice === "") {
      // If the updated price is empty, set an error message
      setUpdateErrorMessage("Please enter an updated price.");
    } else if (isNaN(updatedPrice)) {
      // If the entered updated price is not a valid number, set an error message
      setUpdateErrorMessage("Please enter a valid number.");
    } else {
      // If an updated price is entered, proceed with updating it
      setUpdateErrorMessage(""); // Clear the update error message

      // Ensure that selectedPriceId contains the necessary price ID
      if (selectedPriceId) {
        // Construct the data to be sent to the server
        console.log("Creating new");
        const data = {
          item_id: selectedPriceId,
          price: updatedPrice,
        };
       
        
        // Send a request to update the price
        axios
          .patch("http://localhost:8080/api/add-price", data)
          .then((response) => {
            console.log("Price updated successfully:", response.data);
            // Optionally, you can update the UI with the updated price
            // Reload the prices by changing addButtonClicked state
            setAddButtonClicked(!addButtonClicked);
            closeUpdatePopup();
          })
          .catch((error) => {
            console.error("Error updating price:", error);
          });

        // Close the popup after successfully updating the price
        closeUpdatePopup();
      } else {
        console.error("Missing price_id in selectedPriceId");
      }
    }
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}.${month}.${day}`;
  }

  const handleAddPrice = (itemId,itemName, itemType, itemColor,quantityLabel) => {
    // Set the selected item details when the "Add" button is clicked
    setSelectedItem({
      itemId,
      itemName,
      itemType,
      itemColor,
      quantityLabel
    });
    setNewPrice(""); // Clear the input field
    setShowAddPopup(true); // Show the Add Popup
  };

  const closeAddPopup = () => {
    setShowAddPopup(false);
    setSelectedItem(null); 
    setErrorMessage("");
  };

  const handlePriceInputChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleAddPriceSubmit = () => {
    if (newPrice === "") {
      // If the price is empty, set an error message
      setErrorMessage("Please enter a price.");

    } else if (isNaN(newPrice)) {
      // If the entered price is not a valid number, set an error message
      setErrorMessage("Please enter a valid number ");

    } else {
      // If a price is entered, proceed with adding it
      setErrorMessage(""); // Clear the error message

      // Ensure that selectedItem contains the necessary item_id
      if (selectedItem && selectedItem.itemId) {
        // Construct the data to be sent to the server
        const data = {
          item_id: selectedItem.itemId,
          price: newPrice,
          last_update: new Date().toISOString(),
        };

        // Send a request to add the price
        axios
          .patch("http://localhost:8080/api/add-price", data)
          .then((response) => {
            console.log("Price added successfully:", response.data);
            // Optionally, you can update the UI with the new price
            setAddButtonClicked(!addButtonClicked);
          })
          .catch((error) => {
            console.error("Error adding price:", error);
          });

        // Close the popup after successfully adding the price
        closeAddPopup();
      } else {
        console.error("Missing item_id in selectedItem");
      }
    }
  };

  return (
    <div>
      {/* Add Popup */}
      {showAddPopup && selectedItem && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Add Price</h2>
            <p className="mb-2">Item Name: {selectedItem.itemName}</p>
            <p className="mb-2">Item Type: {selectedItem.itemType}</p>
            <p className="mb-2">Item Color: {selectedItem.itemColor}</p>
            <input
              type="text"
              placeholder={`Enter Price per 1 ${selectedItem.quantityLabel}`}
              value={newPrice}
              onChange={handlePriceInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg mb-2 mx-auto block"
            />
             {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
           
            <button
              onClick={handleAddPriceSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Add
            </button>
            <button
              onClick={closeAddPopup}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


 {/* Update Popup */}
 {showUpdatePopup && selectedPriceId !== null && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Update Price</h2>
            <p className="mb-2">Item Name: {selectedItemDetails.itemName}</p>
            <p className="mb-2">Item Type: {selectedItemDetails.itemType}</p>
            <p className="mb-2">Item Color: {selectedItemDetails.itemColor}</p>
     
            <input
              type="text"
              placeholder="Enter Updated Price"
              value={updatedPrice}
              onChange={handleUpdatedPriceInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg mb-2 mx-auto block"
            />
            {updateErrorMessage && (
              <p className="text-red-500 mb-3">{updateErrorMessage}</p>
            )}
            <button
              onClick={handleUpdatePriceSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Update
            </button>
            <button
              onClick={closeUpdatePopup}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}



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
        <div className="w-[1200px] overflow-y-auto max-h-[608px] font-sans font-[700] rounded-[10px]">
          <table className="w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "170px" }}
                >
                  Item Name
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "170px" }}
                >
                  Item Type
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "180px" }}
                >
                  Item Color
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "170px" }}
                >
                  Last Update Date
                </th>

               <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "170px" }}
                >
                  Price (Rs.)
                </th>

                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "180px" }}
                >
                 Unit
                </th>

                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "170px" }}
                ></th>
              </tr>
            </thead>
          </table>

          <div
            className="table-container"
            style={{ maxHeight: "480px", overflowY: "auto", maxWidth: "100%" }}
          >
            <table className="w-full">
              <tbody>
                {prices.map((price, index) => (
                  <tr
                    key={price.id}
                    className={
                      index % 2 === 0
                        ? "bg-[#F1F1F1] text-center"
                        : "bg-[#D9D9D9] text-center"
                    }
                  >
                    <td className="py-2 px-4 " style={{ width: "170px" }}>
                      {price.item_name}
                    </td>
                    <td className="py-2 px-4" style={{ width: "170px" }}>
                      {price.item_type}
                    </td>
                    <td className="py-2 px-4" style={{ width: "180px" }}>
                      {price.item_color}
                    </td>

                    <td className="py-2 px-4" style={{ width: "170px" }}>
                      {price.price === 0 ? "-" : formatDate(price.last_update)}
                    </td>

                  
                    <td className="py-2 px-4" style={{ width: "170px" }}>
                      {price.price === 0 ? "-" : price.price}
                    </td>

                    <td className="py-2 px-4" style={{ width: "170px" }}>
                      per 1 {price.quantityLabel}
                    </td>
                    
                    <td className="py-2 px-4" style={{ width: "170px" }}>
                      {price.price === 0 ? (
                        <button
                          onClick={() =>
                            handleAddPrice(
                              price.item_id,
                              price.item_name,
                              price.item_type,
                              price.item_color,
                              price.quantityLabel
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                        >
                          Add Price
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdatePrice(
                                price.item_id,
                                price.item_name,
                                price.item_type,
                                price.item_color,
                                price.quantityLabel, 
                                price.price
                               
                             )
                          }

                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                        >
                          Update Price
                        </button>
                      )}
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

export default PricePage;
