import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import des1 from "../images/designs/design1.jpg";

const DesignerDesignPage = () => {
  // Sample data for the designs table
  const [designs, setDesigns] = useState([
    {
        id: 1,
        image: des1,
        name: 'Design 1',
        description: 'This is the first design.',
      },
      {
        id: 2,
        image: des1,
        name: 'Design 2',
        description: 'This is the second design.',
      },
      {
          id: 3,
          image: des1,
          name: 'Design 3',
          description: 'This is the third design.',
        },
      // Add more sample data as needed
    ]);

  // Function to handle delete action for a design
  const handleDelete = (designId) => {
    // Implement your delete logic here
  };

  // Custom function to determine row color
  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-gray-100' : 'bg-white';
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Designs</h1>

      <div className='px-1'>
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 flex items-center rounded-md">
          <AiOutlinePlus className="mr-2" />New Design
        </button>
      </div>

      {designs.length === 0 ? (
        <p className="text-xl text-gray-600">No designs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
          <thead className='bg-gray-700 text-white'>
              <tr>
                <th className="px-6 py-3 text-left">Main Image</th>
                <th className="px-6 py-3 text-left">Design Name</th>
                <th className="px-6 py-3 text-left">Design Description</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design, index) => (
                <tr key={design.id} className={`border-t border-gray-200 ${getRowColor(index)}`}>
                  <td className="px-6 py-4">
                    <img src={design.image} alt={`Design ${design.id}`} className="w-20 h-20 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4">{design.name}</td>
                  <td className="px-6 py-4">{design.description}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => console.log(`View design ${design.id}`)}
                    >
                      View More
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => console.log(`Update design ${design.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => handleDelete(design.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DesignerDesignPage;
