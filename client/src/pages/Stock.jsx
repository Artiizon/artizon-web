// StockManagementPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

function StockManagementPage() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      date: "2023-07-17",
      time: "09:00 AM",
      items: [
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Pants",
          quantity: 30,
          itemName: "Pants1",
          color: "Black",
        },
      ],
    },
    {
      id: 2,
      date: "2023-07-17",
      time: "09:00 AM",
      items: [
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Pants",
          quantity: 30,
          itemName: "Pants1",
          color: "Black",
        },
      ],
    },

    {
      id: 3,
      date: "2023-07-17",
      time: "09:00 AM",
      items: [
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Pants",
          quantity: 30,
          itemName: "Pants1",
          color: "Black",
        },
      ],
    },

    {
      id: 4,
      date: "2023-07-17",
      time: "09:00 AM",
      items: [
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Pants",
          quantity: 30,
          itemName: "Pants1",
          color: "Black",
        },
      ],
    },

    {
      id: 5,
      date: "2023-07-17",
      time: "09:00 AM",
      items: [
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Pants",
          quantity: 30,
          itemName: "Pants1",
          color: "Black",
        },
      ],
    },
    // Add more sample stocks here...
  ]);

  return (
    <StandardLayout>
      <div className="px-10 bg-white">
        <div className="flex justify-between items-center mb-6 m-5">
          
          <h1 className="text-3xl font-semibold">Stock Management</h1>

          {/* Add New Stock Button */}
          <div>
            <Link
              to="/stock/new" // Replace this with the path to the page where you create a new stock
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Add New Stock
            </Link>
          </div>

        </div>
        



        {/* Table for stocks */}
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left w-[100px]">Stock ID</th>{" "}
              {/* Set a fixed width */}
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr
                key={stock.id}
                className="bg-white hover:bg-gray-200 transition-all ease-in-out"
              >
                <td className="px-4 py-3 w-[100px]">
                  {" "}
                  {/* Set a fixed width */}
                  {stock.id}
                </td>
                <td className="px-4 py-3">{stock.date}</td>
                <td className="px-4 py-3">{stock.time}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {" "}
                    {/* Use justify-end class */}
                    <Link
                      to={`/stock/${stock.id}`}
                      className="text-white bg-black px-4 py-2 rounded-md"
                    >
                      View Details
                    </Link>
                  
                    <Link
                      to={`/stock/${stock.id}/update`}
                      className="text-white bg-gray-500 px-4 py-2 rounded-md"
                    >
                      Update
                    </Link>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StandardLayout>
  );
}

export default StockManagementPage;
