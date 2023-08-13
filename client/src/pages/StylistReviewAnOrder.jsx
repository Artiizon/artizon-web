import React, { useState } from 'react';
import StandardLayout from '../components/layout/StandardLayout';
import des1 from '../images/designs/design1.jpg';
import logo1 from '../images/logos/logo1.jpg';

const StylistReviewOrderForm = () => {
  const [formData, setFormData] = useState({
    designImage: des1,
    material: 'Cotton',
    colorCode: '#FF0000',
    tshirtQuantity: {
        xs: 10,
        s: 20,
        m: 30,
        l: 40,
        xl: 50,
        xxl: 60,
      },
    specialNote: 'No special notes',
    logoFile: logo1,
    expectedDays: '3 days',
    additionalNote: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tshirtQuantity: {
        ...prevFormData.tshirtQuantity,
        [name]: parseInt(value, 10),
      },
    }));
  };

  const calculateTotalQuantity = () => {
    const quantities = Object.values(formData.tshirtQuantity);
    return quantities.reduce((total, quantity) => total + quantity, 0);
  };

  const totalQuantity = calculateTotalQuantity();

 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log(formData);
  };


  return (
      <div className="flex justify-center items-center mt-[40px] ">
        <div className="w-1/2 p-6 bg-white font-sans  ">
          <h2 className="ml-[-100px] mt-[-20px] text-[45px] font-bold mb-4">Stylist Review Order Form</h2>
          <div className="">
            <form onSubmit={handleSubmit} >
            <div className="mb-4">
            <label htmlFor="designImage" className="block text-[20px] font-medium">
                Design Image
            </label>
            {formData.designImage && (
                <img src={formData.designImage} alt="Design" className="mt-2 max-h-40" />
            )}
            </div>
            <div className="flex gap-[20px]">
              <div className="mb-4">
                <label htmlFor="material" className="block  font-medium">
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-[300px] border rounded"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="colorCode" className="block  font-medium">
                  Color Code
                </label>
                <input
                  type="text"
                  id="colorCode"
                  name="colorCode"
                  value={formData.colorCode}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-[300px] border rounded"
                  readOnly
                />
              </div>
              </div>
              <div className="mb-4">
            <label htmlFor="tshirtQuantity" className="block  font-medium">
                T-Shirt Quantity
            </label>
            <div className="w-1/2 grid grid-cols-2 gap-5">
                {Object.keys(formData.tshirtQuantity).map((size) => (
                <div
                    key={size}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
                    <label htmlFor={size} className="uppercase w-1/2">
                    {size}:
                    </label>
                    <span className="w-1/2 text-right">
                    {formData.tshirtQuantity[size]}
                    </span>
                </div>
                ))}
            </div>
            <div className="mt-2 font-semibold">
                Total Quantity: {totalQuantity}
            </div>
            </div>
            <div className="mb-4 w-[300px]">
                <label htmlFor="expectedDays" className="block  font-medium">
                  Expected Days
                </label>
                <input
                  type="text"
                  id="expectedDays"
                  name="expectedDays"
                  value={formData.expectedDays}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label htmlFor="specialNote" className="block  font-medium">
                  Special Note
                </label>
                <textarea
                  id="specialNote"
                  name="specialNote"
                  value={formData.specialNote}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div>
              
              <div className="mb-4">
              <label htmlFor="logoFile" className="block  font-medium">
                Logo File
              </label>
              {formData.logoFile && (
                <img src={formData.logoFile} alt="Logo" className="mt-2 max-h-40" />
              )}
            </div>
              <div className="mb-4">
                <label htmlFor="additionalNote" className="block  font-medium">
                  Additional Note
                </label>
                <textarea
                  id="additionalNote"
                  name="additionalNote"
                  value={formData.additionalNote}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default StylistReviewOrderForm;
