import { useState, useEffect } from 'react';
import StandardLayout from '../components/layout/StandardLayout';
import des1 from '../images/designs/design1.jpg';
import logo1 from '../images/logos/logo1.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnapshot } from "valtio";
import state from "../store";

const StylistReviewOrderForm = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";
  const [modalImage, setModalImage] = useState(null);
  
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  
  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };


  
 



  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/review_order/${id}`)
      .then(response => {
        const image_1 = response.data.image_1;
        console.log(image_1);
        setFormData({
          designImage: image_1,
          designImage2: response.data.image_2,
          designImage3: response.data.image_3,
          material: response.data.material,
          colorCode: response.data.color,
          specialNote:response.data.additional_note,
          expectedDays: response.data.expected_days,
          additionalNote: '',
          logoFile:response.data.logo_file,  
          totQuantity:response.data.total_quantity,
          // xs: response.data.xs_quantity,
          // s:response.data.s_quantity,
          // m:response.data.m_quantity,
          // l:response.data.l_quantity,
          // xl:response.data.xl_quantity,
          // xxl:response.data.xll_quantity,
          tshirtQuantity: {
            xs: response.data.xs_quantity,
            s: response.data.s_quantity,
            m: response.data.m_quantity,
            l: response.data.l_quantity,
            xl: response.data.xl_quantity,
            xll:response.data.xll_quantity,
          },
              

            

          // ... rest of your properties
        });
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        // Handle the error, show an error message, etc.
      });
  }, [id]);

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

  // const calculateTotalQuantity = () => {
  //   const quantities = Object.values(formData.tshirtQuantity);
  //   return quantities.reduce((total, quantity) => total + quantity, 0);
  // };

  // const totalQuantity = calculateTotalQuantity();

 
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
    Design Images
  </label>

  <div className="image-container">
    {formData.designImage && (
      <img
        src={`http://127.0.0.1:8080/uploads/company_designs/${formData.designImage}`}
        alt="Design 1"
        className="design-image-small"
        onClick={() =>
          handleImageClick(
            `http://127.0.0.1:8080/uploads/company_designs/${formData.designImage}`
          )
        }
      />
    )}

    {formData.designImage2 && (
      <img
        src={`http://127.0.0.1:8080/uploads/company_designs/${formData.designImage2}`}
        alt="Design 2"
        className="design-image-small"
        onClick={() =>
          handleImageClick(
            `http://127.0.0.1:8080/uploads/company_designs/${formData.designImage2}`
          )
        }
      />
    )}

    {formData.designImage3 && (
      <img
        src={`http://127.0.0.1:8080/uploads/company_designs/${formData.designImage3}`}
        alt="Design 3"
        className="design-image-small"
        onClick={() =>
          handleImageClick(
            `http://127.0.0.1:8080/uploads/company_designs/${formData.designImage3}`
          )
        }
      />
    )}

    {modalImage && (
      <div className="modal-review">
        <div className="modal-content-wrapper-review">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content-review"
            src={modalImage}
            alt="Design"
          />
        </div>
      </div>
    )}
  </div>
</div>




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
                Total Quantity: {formData.totQuantity}
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
              <label htmlFor="logoFile" className="block text-sm font-medium">
                Logo File
              </label>
              {formData.logoFile && (
                <img src={`http://127.0.0.1:8080/uploads/logos/${formData.logoFile}`} alt="Logo" className="mt-2 max-h-40" />
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
