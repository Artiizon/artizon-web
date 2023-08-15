import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import state from '../store';

const StylistViewOrderForm = () => {
  const snap = useSnapshot(state);
  state.page = 'no-canvas';
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  const { id } = useParams();

  const [formData, setFormData] = useState({
    tshirtQuantity: [
      { size: 'xs', quantity: 0 },
      { size: 's', quantity: 0 },
      { size: 'm', quantity: 0 },
      { size: 'l', quantity: 0 },
      { size: 'xl', quantity: 0 },
      { size: 'xll', quantity: 0 },
    ],
  });

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
          logoFile:response.data.logo_file,  
          totQuantity:response.data.total_quantity,
          additionalNote:response.data.stylist_note,
          rejectedReason:response.data.reject_reason,
          status:response.data.status,
          // xs: response.data.xs_quantity,
          // s:response.data.s_quantity,
          // m:response.data.m_quantity,
          // l:response.data.l_quantity,
          // xl:response.data.xl_quantity,
          // xxl:response.data.xll_quantity,
          tshirtQuantity: [
            { size: 'xs', quantity: response.data.xs_quantity },
            { size: 's', quantity: response.data.s_quantity },
            { size: 'm', quantity: response.data.m_quantity },
            { size: 'l', quantity: response.data.l_quantity },
            { size: 'xl', quantity: response.data.xl_quantity },
            { size: 'xll', quantity: response.data.xll_quantity },
          ],

            

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
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };



  return (
      <div className="flex justify-center items-center mt-[40px] ">
        <div className="w-1/2 p-6 bg-white font-sans  ">
          <h2 className="ml-[-100px] mt-[-20px] text-[45px] font-bold mb-4">Stylist View Order Details</h2>
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
                  className="mt-1 p-2 w-[300px] border rounded"
                  readOnly
                />
              </div>

              <div className="mb-4">
  <label htmlFor="tshirtQuantity" className="block text-sm font-medium">
    T-Shirt Quantity
  </label>
  <div className="w-1/6 flex flex-col gap-2">
    {formData.tshirtQuantity.map((item) => (
      <div
        key={item.size}
        className="flex items-center justify-between bg-gray-100 p-2 rounded"
      >
        <label htmlFor={item.size} className="uppercase w-1/2">
          {item.size}:
        </label>
        <input
          type="number"
          name={`tshirtQuantity.${item.size}`}
          value={item.quantity}
          className="w-1/2 p-1 border rounded"
        />
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
              {formData.status === "Proceed" ? (
                <label htmlFor="additionalNote" className="block  font-medium">
                  Additional Note
                </label>
              ) : 
              <label htmlFor="additionalNote" className="block  font-medium">
                  Rejected Note
             </label>
              }
                <input
                  id="additionalNote"
                  name="additionalNote"
                  value={formData.additionalNote}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div> 
              
              {formData.status === "SRejected" ? (
              <div className="mb-4">
                <label htmlFor="additionalNote" className="block  font-medium">
                  Rejected Reason
                </label>
                <input
                  id="additionalNote"
                  name="additionalNote"
                  value={formData.rejectedReason}
                  className="mt-1 p-2 w-full border rounded"
                  readOnly
                />
              </div> 
              ) : null}
            </form>
          </div>
        </div>
      </div>
  );
};

export default StylistViewOrderForm;
