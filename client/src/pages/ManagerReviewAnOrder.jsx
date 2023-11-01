import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { generateCustomerEmailMessage } from "../components/emails/OrderRejection";

const ManagerReviewOrderForm = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectMainReason, setRejectMainReason] = useState("");
  const [rejectAdditionalNote, setRejectAdditionalNote] = useState("");
  const [status, setstatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const openRejectPopup = () => {
    setShowRejectPopup(true);
  };

  const closeRejectPopup = () => {
    setShowRejectPopup(false);
    setRejectMainReason("");
    setRejectAdditionalNote("");
  };

  function handleClick() {
    sessionStorage.setItem("logo", logo);
    sessionStorage.setItem("tcolor", color);
    sessionStorage.setItem("text", text);
    sessionStorage.setItem("textcolor", textColor);
    sessionStorage.setItem("tstyle", tstyle);
    if (text == "") {
      sessionStorage.setItem("text", " ");
    }
    if (logo == "") {
      state.isLogoTexture = false;
    } else {
      state.isLogoTexture = true;
    }
  }


  const handleReject = () => {
    // Send reject reason and additional note to the server

    if (rejectAdditionalNote.trim() === "") {
      // Show the error message
      // You can set a state variable to control the visibility of the error message
      // For example: setErrorMessageVisible(true);
      return;
    }

    const requestData = {
      tshirtOrderStatus: "MRejected", // Update status accordingly
      managerNote: rejectAdditionalNote,
      rejectReason: rejectMainReason,
    };

    axios
      .patch(`http://localhost:8080/manager_reject_order/${id}`, requestData)
      .then((response) => {
        console.log(response.data);
        // Handle success, close popup, update UI, etc.

        const customerMessage = generateCustomerEmailMessage(
          rejectMainReason,
          rejectAdditionalNote
        );

        //TPM
        axios
          .post("http://127.0.0.1:8080/send-customer-email", {
            customerId: id, // Replace with the actual customer ID or email address
            message: customerMessage,
            subject: "Order Rejection",
            recipientEmail: formData.cusEmail,
          })
          .then((messageResponse) => {
            console.log(messageResponse.data);
            // Handle success for sending the email

            closeRejectPopup();
            navigate("/tpm_review_orders");
          })
          .catch((messageError) => {
            console.error("Error sending email to customer:", messageError);
            // Handle error sending the email
          });
      })

      .catch((error) => {
        console.error("Error updating tshirt order:", error);
        // Handle error, show error message, etc.
      });
  };
  
  const { id } = useParams();

  const [formData, setFormData] = useState({
    additionalNote: "",
    tshirtQuantity: [
      { size: "xs", quantity: 0 },
      { size: "s", quantity: 0 },
      { size: "m", quantity: 0 },
      { size: "l", quantity: 0 },
      { size: "xl", quantity: 0 },
      { size: "xll", quantity: 0 },
    ],
  });

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/review_ordertpm/${id}`)
      .then((response) => {
        const image_1 = response.data.image_1;
        console.log(image_1);
        setFormData({
          designImage: image_1,
          designImage2: response.data.image_2,
          designImage3: response.data.image_3,
          material: response.data.tmaterial,
          colorCode: response.data.tcolor,
          specialNote:response.data.additional_note,
          expectedDays: response.data.expected_days,
          additionalNote: "",
          logoFile: response.data.logo_file,
          totQuantity: response.data.total_quantity,

          //TPM
          cusEmail: response.data.email,
          compDesignId: response.data.company_design_id,
          type: response.data.tstyle,
          text: response.data.text,
          text_color: response.data.text_color,

          // xs: response.data.xs_quantity,
          // s:response.data.s_quantity,
          // m:response.data.m_quantity,
          // l:response.data.l_quantity,
          // xl:response.data.xl_quantity,
          // xxl:response.data.xll_quantity,
          tshirtQuantity: [
            { size: "xs", quantity: response.data.xs_quantity },
            { size: "s", quantity: response.data.s_quantity },
            { size: "m", quantity: response.data.m_quantity },
            { size: "l", quantity: response.data.l_quantity },
            { size: "xl", quantity: response.data.xl_quantity },
            { size: "xll", quantity: response.data.xll_quantity },
          ],

          // ... rest of your properties
        });
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        // Handle the error, show an error message, etc.
      });
  }, [id]);

  //TPM
  sessionStorage.setItem("logo", formData.logoFile);
  sessionStorage.setItem("tcolor", formData.colorCode);
  sessionStorage.setItem("text", formData.text);
  sessionStorage.setItem("textcolor", formData.text_color);
  sessionStorage.setItem("tstyle", formData.type);
  if (formData.text == "") {
    sessionStorage.setItem("text", " ");
  }
  if (formData.logoFile == "") {
    state.isLogoTexture = false;
  } else {
    state.isLogoTexture = true;
  }

  



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

  const handleAccepted = () => {
    const requestData = {
      tshirtOrderStatus: "Accepted",
      managerNote: formData.additionalNote,
      material: formData.material,
      colorCode: formData.colorCode,
      totalQuantity: formData.totQuantity,
      ...(formData.collar ? { collar: formData.collar } : {}),
    };

    const queryParams = new URLSearchParams(requestData);
    const url = `http://localhost:8080/checkQuantity?${queryParams.toString()}`;

    axios
      .get(url, requestData)
      .then((response) => {
        console.log(response.data);
        setstatus(response.data);

        console.log("response.data", response.data);
        console.log("status", status);

        if (response.data != "Success") {
          setShowPopup(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with error data:",
            error.response.data
          );
          console.error("Status code:", error.response.status);
          console.log(error.response.data);
          setstatus(error.response.data);

          console.log("error.response.data", error.response.data);
          console.log("status", status);

          if (error.response.data != "Success") {
            setShowPopup(error.response.data);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server");
        } else {
          // Something happened in setting up the request
          console.error("Error during request setup:", error.message);
        }
      });

    if (status == "Success") {
      axios
        .patch(`http://localhost:8080/accepted_tshirt_order/${id}`, requestData)
        .then((response) => {
          console.log(response.data);

          setShowPopup2(
            <span>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
              />
              Order Successfully accepted
            </span>
          );
        })
        .catch((error) => {
          console.error("Error updating database:", error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center mt-[40px] min-h-screen">
      <div className="w-1/2 p-6 bg-white font-sans  ">
        <h2 className="ml-[-100px] mt-[-20px] text-[45px] font-bold mb-4">
          Manager Review Order Form
        </h2>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {/* {TPM} */}
              <label
                htmlFor="designImage"
                className="block text-[20px] font-medium"
              >
                {formData.compDesignId === null
                  ? "View Customized Design"
                  : "Design Images"}
              </label>

              <div className="image-container">
                {/* {TPM} */}
                {formData.compDesignId === null && (
                  <Link to={`/customerorder-view-tshirt`}>
                    <button
                      onClick={handleClick}
                      type="button"
                      className="rounded   w-[120px] h-[35px] mt-[20px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
                    >
                      View T-Shirt
                    </button>
                  </Link>
                )}

                {formData.designImage && (
                  <img
                    src={`http://localhost:8080/uploads/company_designs/${formData.designImage}`}
                    alt="Design 1"
                    className="design-image-small"
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:8080/uploads/company_designs/${formData.designImage}`
                      )
                    }
                  />
                )}

                {formData.designImage2 && (
                  <img
                    src={`http://localhost:8080/uploads/company_designs/${formData.designImage2}`}
                    alt="Design 2"
                    className="design-image-small"
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:8080/uploads/company_designs/${formData.designImage2}`
                      )
                    }
                  />
                )}

                {formData.designImage3 && (
                  <img
                    src={`http://localhost:8080/uploads/company_designs/${formData.designImage3}`}
                    alt="Design 3"
                    className="design-image-small"
                    onClick={() =>
                      handleImageClick(
                        `http://localhost:8080/uploads/company_designs/${formData.designImage3}`
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

            {/* {TPM} */}
            <div className="mb-4">
              <label htmlFor="colorCode" className="block  font-medium">
                T-Shirt Type
              </label>
              <input
                type="text"
                id="colorCode"
                name="colorCode"
                value={formData.type}
                className="mt-1 p-2 w-[300px] border rounded"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tshirtQuantity"
                className="block text-sm font-medium"
              >
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

              <div className="mt-2">Total Quantity: {formData.totQuantity}</div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="specialNote"
                className="block text-sm font-medium"
              >
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
            {/* <div className="mb-4">
              <label htmlFor="logoFile" className="block text-sm font-medium">
                Logo File
              </label>
              {formData.logoFile && (
                <img
                  src={`http://localhost:8080/uploads/logos/${formData.logoFile}`}
                  alt="Logo"
                  className="mt-2 max-h-40"
                />
              )}
            </div> */}

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
                onClick={openRejectPopup}
              >
                Reject
              </button>

              <button
                type="button"
                onClick={handleAccepted}
                className="bg-black text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Accept
              </button>
            </div>

            {showRejectPopup && (
              <div className="modal-review">
                <div className="modal-content-wrapper-review">
                  <span className="close" onClick={closeRejectPopup}>
                    &times;
                  </span>
                  <div className="reject-popup">
                    <h3 className="modal-title">Rejected Reason</h3>
                    <div className="modal-content-review">
                      <label className="popup-label">Note:</label>
                      <textarea
                        className="popup-textarea"
                        value={rejectAdditionalNote}
                        onChange={(e) =>
                          setRejectAdditionalNote(e.target.value)
                        }
                      />
                      {rejectAdditionalNote.trim() === "" && (
                        <div className="error-message">
                          Rejection note is required!
                        </div>
                      )}
                      <button className="popup-button" onClick={handleReject}>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md shadow-md">
                  <p className="text-2xl font-semibold mb-4">{showPopup}</p>
                  <button
                    className="bg-blue-500 text-white px-4  py-2 rounded-md"
                    onClick={() => setShowPopup(null)}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            {showPopup2 && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md shadow-md">
                  <p className="text-2xl font-semibold mb-4">{showPopup2}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setShowPopup2(null);
                      navigate("/tpm_review_orders");
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerReviewOrderForm;
