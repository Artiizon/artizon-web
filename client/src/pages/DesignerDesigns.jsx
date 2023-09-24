import { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnapshot } from "valtio";
import state from "../store";

const DesignerDesignPage = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  const [designs, setDesigns] = useState([]);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/viewDesigns")
      .then((response) => {
        setDesigns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching designs:", error);
      });
  }, []);

  const getRowColor = (index) => {
    return index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]";
  };

  const splitDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      const shortenedDescription = words.slice(0, maxWords).join(" ");
      return (
        <>
          {shortenedDescription} ... <a href="#">[See More]</a>
        </>
      );
    }
    return description;
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedDesignId, setSelectedDesignId] = useState(null);

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState({});
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);
  const [previewNewImage1, setPreviewNewImage1] = useState(null);
  const [previewNewImage2, setPreviewNewImage2] = useState(null);
  const [previewNewImage3, setPreviewNewImage3] = useState(null);

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage1(file);
      setPreviewNewImage1(URL.createObjectURL(file));
    } else {
      setSelectedImage1(null);
      setPreviewImage1(null);
    }
    e.target.value = "";
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage2(file);
      setPreviewNewImage2(URL.createObjectURL(file));
    } else {
      setSelectedImage2(null);
      setPreviewImage2(null);
    }
    e.target.value = "";
  };

  const handleImage3Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage3(file);
      setPreviewNewImage3(URL.createObjectURL(file));
    } else {
      setSelectedImage3(null);
      setPreviewImage3(null);
    }
    e.target.value = "";
  };

  

  const handleUpdateConfirm = () => {
    const formData = new FormData();
    formData.append("design_name", selectedDesign.design_name);
    formData.append("design_des", selectedDesign.description);
    formData.append("price", selectedDesign.price);
    formData.append("color", selectedDesign.color);

    if (selectedImage1) {
      formData.append("image1", selectedImage1);
    }
    if (selectedImage2) {
      formData.append("image2", selectedImage2);
    }
    if (selectedImage3) {
      formData.append("image3", selectedImage3);
    }
  
  
    axios
      .patch(
        `http://127.0.0.1:8080/update_design/${selectedDesign.company_design_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        window.location.reload();
        if (response.data.success) {
          // Update the designs list in the component's state
          const updatedDesigns = designs.map((design) =>
            design.company_design_id === selectedDesign.company_design_id
              ? response.data.updatedDesign
              : design
          );
          setDesigns(updatedDesigns);
  
          // Close the update pop-up and reset states
          setShowUpdatePopup(false);
          setSelectedDesign(null);
          setSelectedImage1(null);
          setSelectedImage2(null);
          setSelectedImage3(null);
          setShowUpdatePopup(false);
          setSelectedDesign(null);
          setPreviewImage1(null);
          setPreviewImage2(null);
          setPreviewImage3(null);
          setPreviewNewImage1(null); // Reset preview new image 1
          setPreviewNewImage2(null); // Reset preview new image 2
          setPreviewNewImage3(null); // Reset preview new image 3
        } else {
          console.error("Design update failed:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating design:", error);
      });
  };
  
  
  const handleUpdateCancel = () => {
    setShowUpdatePopup(false);
    setSelectedDesign(null);
    setSelectedImage1(null);
    setSelectedImage2(null);
    setSelectedImage3(null);
    setPreviewImage1(null);
    setPreviewImage2(null);
    setPreviewImage3(null);
  };

  const [showViewMorePopup, setShowViewMorePopup] = useState(false);

  const handleViewMore = (design) => {
    setSelectedDesign(design);
    setShowViewMorePopup(true);
  };
   
  const handleDelete = (designId) => {
    console.log("designId:", designId); // Add this line to debug
    setSelectedDesignId(designId);
    setShowDeletePopup(true);
  };
  

  const handleDeleteConfirm = () => {
    // Use the selectedDesignId from state
    const designIdToDelete = selectedDesignId;

    axios
      .patch(`http://127.0.0.1:8080/delete_design/${designIdToDelete}`)
      
      .then((response) => {
        window.location.reload();
        // Check if the deletion was successful (you can customize this check)
        if (response.data.success) {
          // Update the local state to reflect the deleted design
          setDesigns((prevDesigns) =>
          prevDesigns.filter((design) => design.company_design_id !== Number(designIdToDelete))
        );

    
          
        } else {
          console.error("Design deletion failed:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting design:", error);
      });
  
    setShowDeletePopup(false);
  };
  

  return (
    <div className=" mx-auto p-8 font-sans min-h-[620px]">
      <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">
        My Designs
      </h1>

      <div className="flex justify-end mb-2">
        <Link to="/new-design">
          <button className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 flex items-center rounded-md">
            <AiOutlinePlus className="mr-2" />
            New Design
          </button>
        </Link>
      </div>
      {designs.length === 0 ? (
        <p className="text-xl text-gray-600 ml-[100px]">
          No designs available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[8px]">
          <table className="w-full table-auto border-collapse rounded-[25px]">
            <thead className="bg-black text-white text-center">
              <tr>
                <th className="px-6 py-3 ">Main Image</th>
                <th className="px-6 py-3 ">Design Name</th>
                <th className="px-6 py-3 ">Design Description</th>
                <th className="px-6 py-3 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design, index) => (
                <tr
                  key={design.company_design_id}
                  className={`border-t border-gray-200 ${getRowColor(index)}`}
                >
                  <td className="px-6 py-4 w-2/12">
                    <img
                      src={`http://127.0.0.1:8080/uploads/company_designs/${design.image_1}`}
                      alt={design.design_name}
                      className="w-full h-12 object-contain"
                    />
                  </td>
                  <td className="px-6 py-4  text-[19px]">
                    {design.design_name}
                  </td>
                  <td className="px-6 py-4  text-[19px]">
                    {splitDescription(design.description, 15)}
                  </td>

                  <td className="px-6 py-4 space-x-2 w-1/5">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => handleViewMore(design)}
                    >
                      <AiOutlineEye />
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => {
                        setSelectedDesign(design);
                        setShowUpdatePopup(true);
                        setPreviewImage1(design.image_1);
                        setPreviewImage2(design.image_2);
                        setPreviewImage3(design.image_3);
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => handleDelete(design.company_design_id)} 
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md backdrop-filter backdrop-blur-lg">
            <div className="flex justify-end">
              <button className="text-gray-600" onClick={handleDeleteCancel}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-2xl font-semibold text-red-600 mb-4">
                Are you sure you want to delete this design?
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdatePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md custom-popup-width max-h-screen overflow-y-auto">
            <div className="flex justify-end">
              <button className="text-gray-600" onClick={handleUpdateCancel}>
                <AiOutlineClose />
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Update Design
            </h1>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Main Image
              </label>
              <img
                src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`}
                alt={`Design ${selectedDesign.id}`}
                className="w-20 h-20 object-cover rounded-lg mb-4"
              />
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Design Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedDesign.design_name}
                  onChange={(e) =>
                    setSelectedDesign({
                      ...selectedDesign,
                      design_name: e.target.value,
                    })
                  }
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Design Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={selectedDesign.description}
                  onChange={(e) =>
                    setSelectedDesign({
                      ...selectedDesign,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-between">
              <div className="mt-4">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 1
                </label>
                {selectedImage1 || previewImage1 ? (
                  <div className="flex items-center">
                    {previewImage1 ? (
                      <img
                        src={`http://127.0.0.1:8080/uploads/company_designs/${previewImage1}`}
                        alt={`Design ${selectedDesign.id} - Image 1`}
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    ) : (
                      <img
                        src={previewNewImage1}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    )}
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setSelectedImage1(null);
                        setPreviewImage1(null);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      name="image1"
                      id="image1"
                      accept="image/*"
                      onChange={handleImage1Change}
                      className="hidden"
                    />
                    <label
                      htmlFor="image1"
                      className="cursor-pointer text-[10px] border px-2 py-1 mt-2 rounded-lg"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 2
                </label>
                {selectedImage2 || previewImage2 ? (
                  <div className="flex items-center">
                    {previewImage2 ? (
                      <img
                        src={`http://127.0.0.1:8080/uploads/company_designs/${previewImage2}`}
                        alt={`Design ${selectedDesign.id} - Image 2`}
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    ) : (
                      <img
                        src={previewNewImage2}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    )}
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setSelectedImage2(null);
                        setPreviewImage2(null);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      name="image2"
                      id="image2"
                      accept="image/*"
                      onChange={handleImage2Change}
                      className="hidden"
                    />
                    <label
                      htmlFor="image2"
                      className="cursor-pointer text-[10px] border px-2 py-1 mt-2 rounded-lg"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 3
                </label>
                {selectedImage3 || previewImage3 ? (
                  <div className="flex items-center">
                    {previewImage3 ? (
                      <img
                        src={`http://127.0.0.1:8080/uploads/company_designs/${previewImage3}`}
                        alt={`Design ${selectedDesign.id} - Image 3`}
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    ) : (
                      <img
                        src={previewNewImage3}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg mr-2"
                      />
                    )}
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setSelectedImage3(null);
                        setPreviewImage3(null);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      name="image3"
                      id="image3"
                      accept="image/*"
                      onChange={handleImage3Change}
                      className="hidden"
                    />
                    <label
                      htmlFor="image3"
                      className="cursor-pointer text-[10px] border px-2 py-1 mt-2 rounded-lg"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

              <div className="mb-4">
                <label
                  htmlFor="unitPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unit Price(Rs.)
                </label>
                <input
                    type="text"
                    name="unitPrice"
                    id="unitPrice"
                    value={selectedDesign.price}
                    onChange={(e) =>
                      setSelectedDesign({
                        ...selectedDesign,
                        price: e.target.value, // Update 'price' property
                      })
                    }
                    className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

              </div>


              <div className="mb-4">
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700"
              >
                Supporting Material
              </label>
              <input
                type="text"
                name="material"
                id="material"
                value={selectedDesign.material}
                readOnly // Add the 'readOnly' attribute
                className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="color" // Change the 'htmlFor' attribute to 'color'
                className="block text-sm font-medium text-gray-700"
              >
                Recommended Color
              </label>
              <input
                type="text"
                name="color" // Keep the 'name' attribute as 'color'
                id="color"   // Keep the 'id' attribute as 'color'
                value={selectedDesign.color}
                onChange={(e) =>
                  setSelectedDesign({
                    ...selectedDesign,
                    color: e.target.value, // Update 'color' property
                  })
                }
                className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>


              <div className="mt-6 flex justify-center space-x-4">
                <button
                  className="bg-black hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
                  onClick={handleUpdateConfirm}
                >
                  Update
                </button>
                <button
                  className="bg-transparent hover:bg-black text-black border hover:text-white font-semibold px-4 py-2 rounded-lg"
                  onClick={handleUpdateCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewMorePopup && (
        // View More Popup JSX Code
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md custom-popup-width max-h-screen overflow-y-auto">
            <div className="flex justify-end">
              <button
                className="text-gray-600"
                onClick={() => setShowViewMorePopup(false)}
              >
                <AiOutlineClose />
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              View Design
            </h1>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Main Image
              </label>
              <img
                src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`}
                alt={`Design ${selectedDesign.company_design_id}`}
                className="w-20 h-20 object-contain rounded-lg mb-4"
              />
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Design Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedDesign.design_name}
                  readOnly
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Design Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={selectedDesign.description}
                  readOnly
                  rows="3"
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-between">
                <div className="mt-4">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image 1
                  </label>
                  <img
                    src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`}
                    alt={`Design ${selectedDesign.company_design_id} - Image 1`}
                    className="w-20 h-20 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image 2
                  </label>
                  <img
                    src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_2}`}
                    alt={`Design ${selectedDesign.company_design_id} - Image 2`}
                    className="w-20 h-20 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image 3
                  </label>
                  <img
                    src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_3}`}
                    alt={`Design ${selectedDesign.company_design_id} - Image 3`}
                    className="w-20 h-20 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unit Price(Rs.)
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedDesign.price}
                  readOnly
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Supporting Material
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedDesign.material}
                  readOnly
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recommended Color
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={selectedDesign.color}
                  readOnly
                  className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignerDesignPage;
