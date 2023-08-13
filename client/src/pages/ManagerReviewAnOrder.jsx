import { useState, useEffect } from 'react';
import StandardLayout from '../components/layout/StandardLayout';
import des1 from '../images/designs/design1.jpg';
import logo1 from '../images/logos/logo1.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnapshot } from "valtio";
import state from "../store";

const ManagerReviewOrderForm = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";
  
  const { id } = useParams();

  // const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/review_ordertpm/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching design:', error);
      });
  }, [id]);
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
    <StandardLayout>
      <div className="flex justify-center items-center h-screen ">
        <div className="w-1/2 p-6 bg-white rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold mb-4">Textile production Manager Review Order Form</h2>
          <div className="overflow-y-auto max-h-96">
            <form onSubmit={handleSubmit} >
            <div className="mb-4">
            <label htmlFor="designImage" className="block text-sm font-medium">
                Design Image
            </label>
            {formData.image_1 && (
                <img src={formData.designImage} alt="Design" className="mt-2 max-h-40" />
            )}
            </div>
              <div className="mb-4">
                <label htmlFor="material" className="block text-sm font-medium">
                  Material
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="colorCode" className="block text-sm font-medium">
                  Color Code
                </label>
                <input
                  type="text"
                  id="colorCode"
                  name="colorCode"
                  value={formData.colorCode}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div>
              <div className="mb-4">
            <label htmlFor="tshirtQuantity" className="block text-sm font-medium">
                T-Shirt Quantity
            </label>
            <div className="w-1/6 flex flex-col gap-2">
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
            <div className="mt-2">
                Total Quantity: {totalQuantity}
            </div>
            </div>


              <div className="mb-4">
                <label htmlFor="specialNote" className="block text-sm font-medium">
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
                <label htmlFor="expectedDays" className="block text-sm font-medium">
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
              <label htmlFor="logoFile" className="block text-sm font-medium">
                Logo File
              </label>
              {formData.logoFile && (
                <img src={formData.logoFile} alt="Logo" className="mt-2 max-h-40" />
              )}
            </div>
              <div className="mb-4">
                <label htmlFor="additionalNote" className="block text-sm font-medium">
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
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default ManagerReviewOrderForm;