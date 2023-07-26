import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineUpload } from 'react-icons/ai';
import StandardLayout from '../components/layout/StandardLayout';

const AddNewDesignPage = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).slice(0, 3);

    Promise.all(
      fileArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then((results) => {
      setImagePreviews((prevPreviews) => [...prevPreviews, ...results]);
    });
  };

  const handleImageDelete = (index) => {
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <StandardLayout>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Add New Design</h1>

      <div className='px-1'>
        <hr className="my-4 border-t-2 border-gray-300" />
      </div>


      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="designName" className="block text-gray-800 font-semibold mb-2">
              Design Name
            </label>
            <input
              type="text"
              id="designName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter design name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="designDescription" className="block text-gray-800 font-semibold mb-2">
              Design Description
            </label>
            <textarea
              id="designDescription"
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Enter design description"
            ></textarea>
          </div>

          {/* Add other relevant data inputs for the design form */}

          <div className="text-gray-800 font-semibold mb-2">
          Upload Images (Up to 3)
        </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt={`Design Preview ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white rounded-full p-2"
              onClick={() => handleImageDelete(index)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}

        {imagePreviews.length < 3 && (
          <div className="bg-gray-100 flex items-center justify-center rounded-lg">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlineUpload className="text-4xl text-gray-400" />
              <input
                type="file"
                id="upload"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}
      </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mt-3"
              type="submit"
            >
              Submit Design
            </button>
          </div>
        </form>
      </div>
    </div>
    </StandardLayout>
  );
};

export default AddNewDesignPage;
