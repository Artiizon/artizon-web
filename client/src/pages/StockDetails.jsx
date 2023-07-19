import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";

// Placeholder function for fetching stock details by ID
const fetchStockById = async (id) => {
  // Replace this with your actual API call or data fetching logic
  // For now, let's assume stocks is an array of stock objects
  // and we are finding the stock with the matching ID
  const stocks = [
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
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt",
          color: "Black",
        },
        {
          itemId: 3,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 4,
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt1",
          color: "Black",
        },
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt",
          color: "Black",
        },
        {
          itemId: 3,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 4,
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt1",
          color: "Black",
        },
        {
          itemId: 1,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 2,
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt",
          color: "Black",
        },
        {
          itemId: 3,
          type: "Shirt",
          quantity: 50,
          itemName: "Shirt1",
          color: "White",
        },
        {
          itemId: 4,
          type: "Shirt",
          quantity: 30,
          itemName: "Shirt1",
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
        }
      ]
    }
   
  ];

  // Find the stock with the matching ID
  const stock = stocks.find((stock) => stock.id === parseInt(id, 10));
  return stock || null;
};

function StockDetailsPage() {
  const { id } = useParams();
  const [stock, setStock] = useState(null);

  // Fetch stock details based on the ID from the URL
  useEffect(() => {
    const fetchStockDetails = async () => {
      const stockDetails = await fetchStockById(id);
      setStock(stockDetails);
    };

    fetchStockDetails();
  }, [id]);

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <div className="px-10 py-6 bg-white">
        <h1 className="text-3xl font-semibold pb-6">Stock Details</h1>

        {/* Display stock details here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Stock ID</p>
            <p className="text-2xl font-semibold">{stock.id}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="text-2xl font-semibold">{stock.date}</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Time</p>
            <p className="text-2xl font-semibold">{stock.time}</p>
          </div>
        </div>
        
        {/* Display items details, if available */}
        {stock.items && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold pb-4">Items</h2>
            <div className="max-h-96 overflow-auto">
              <table className="w-full table-auto border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Item ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Item Name</th>
                    <th className="px-4 py-2 text-left">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.items.map((item) => (
                    <tr key={item.itemId} className="border-b border-gray-300">
                      <td className="px-4 py-2">{item.itemId}</td>
                      <td className="px-4 py-2">{item.type}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">{item.color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </StandardLayout>
  );
}

export default StockDetailsPage;
