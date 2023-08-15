import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineClose, AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSnapshot } from "valtio";
import state from "../store";


const DesignerDesignPage = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";
  
  const [designs, setDesigns] = useState([]); 
  
    useEffect(() => {
    axios.get('http://127.0.0.1:8080/viewDesigns')
      .then(response => {
        setDesigns(response.data);
      })
      .catch(error => {
        console.error('Error fetching designs:', error);
      });
  }, []);

  
  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-[#F1F1F1]' : 'bg-[#D9D9D9]';
  };
  
  const splitDescription = (description, maxWords) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      const shortenedDescription = words.slice(0, maxWords).join(' ');
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

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false);
    // Delete design logic here
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage1(file);
      setPreviewImage1(URL.createObjectURL(file));
    } else {
      setSelectedImage1(null);
      setPreviewImage1(null);
    }
  };
  
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage2(file);
      setPreviewImage2(URL.createObjectURL(file));
    } else {
      setSelectedImage2(null);
      setPreviewImage2(null);
    }
  };
  
  const handleImage3Change = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage3(file);
      setPreviewImage3(URL.createObjectURL(file));
    } else {
      setSelectedImage3(null);
      setPreviewImage3(null);
    }
  };
  
  const handleUpdateConfirm = () => {
    // Find the index of the design being updated
    const designIndex = designs.findIndex((design) => design.id === selectedDesign.id);

    if (designIndex !== -1) {
      // Create a new array with the updated design data
      const updatedDesigns = [...designs];
      updatedDesigns[designIndex] = {
        ...selectedDesign,
        image: previewImage1,
        imageTwo: previewImage2,
        imageThree: previewImage3,
      };

      // Update the state with the new designs array
      setDesigns(updatedDesigns);
    }
    
    setShowUpdatePopup(false);
    setSelectedDesign(null);
    setSelectedImage1(null);
    setSelectedImage2(null);
    setSelectedImage3(null);
    setPreviewImage1(null);
    setPreviewImage2(null);
    setPreviewImage3(null);
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

  return (
      <div className="container mx-auto p-8 font-sans">
        <h1 className="text-[45px] font-bold text-black mb-[5px] ml-[170px">My Designs</h1>
        <div className='px-1'>
          <hr className="mb-[6px] border-t-2 border-gray-300" />
        </div>
        <div className="flex justify-end mb-2">
          <Link to="/new-design">
            <button className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 flex items-center rounded-md">
              <AiOutlinePlus className="mr-2" />New Design
            </button>
          </Link>
        </div>
        {designs.length === 0 ? (
          <p className="text-xl text-gray-600">No designs available.</p>
        ) : (
          <div className="overflow-x-auto rounded-[8px]">
            <table className="w-full table-auto border-collapse rounded-[25px]">
              <thead className='bg-black text-white text-center'>
                <tr>
                  <th className="px-6 py-3 ">Main Image</th>
                  <th className="px-6 py-3 ">Design Name</th>
                  <th className="px-6 py-3 ">Design Description</th>
                  <th className="px-6 py-3 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {designs.map((design, index) => (
                  <tr key={design.id} className={`border-t border-gray-200 ${getRowColor(index)}`}>
                    <td className="px-6 py-4 w-2/12">
                    <img src={`http://127.0.0.1:8080/uploads/company_designs/${design.image_1}`}  alt={design.design_name} className="w-full h-12 object-contain" />
                    </td>
                    <td className="px-6 py-4  text-[19px]">{design.design_name}</td>
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
                          setPreviewImage1(design.image);
                          setPreviewImage2(design.imageTwo);
                          setPreviewImage3(design.imageThree);
                        }}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg"
                        onClick={() => {
                          setSelectedDesignId(design.id);
                          setShowDeletePopup(true);
                        }}
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
                <p className="text-2xl font-semibold text-red-600 mb-4">Are you sure you want to delete this design?</p>
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
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Design</h1>
              <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                     Main Image
              </label>
                <img src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`} alt={`Design ${selectedDesign.id}`} className="w-20 h-20 object-cover rounded-lg mb-4" />
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Design Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedDesign.design_name}
                    onChange={(e) => setSelectedDesign({ ...selectedDesign, name: e.target.value })}
                    className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Design Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={selectedDesign.description}
                    onChange={(e) => setSelectedDesign({ ...selectedDesign, description: e.target.value })}
                    rows="3"
                    className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="mt-4">
                    <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                      Image 1
                    </label>
                    {previewImage1 && (
                      <div className="flex items-center">
                        <img src={previewImage1} alt={`Design ${selectedDesign.id} - Image 1`} className="w-16 h-16 object-cover rounded-lg mr-2" />
                        <button className="text-red-600" onClick={() => {
                            setSelectedImage1(null);
                            setPreviewImage1(null);
                          }}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                    {!previewImage1 && (
                      <input
                        type="file"
                        name="image1"
                        id="image1"
                        accept="image/*"
                        onChange={handleImage1Change}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                      Image 2
                    </label>
                    {previewImage2 && (
                      <div className="flex items-center">
                        <img src={previewImage2} alt={`Design ${selectedDesign.id} - Image 2`} className="w-16 h-16 object-cover rounded-lg mr-2" />
                        <button className="text-red-600" onClick={() => {
                            setSelectedImage2(null);
                            setPreviewImage2(null);
                          }}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                    {!previewImage2 && (
                      <input
                        type="file"
                        name="image2"
                        id="image2"
                        accept="image/*"
                        onChange={handleImage2Change}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="image3" className="block text-sm font-medium text-gray-700">
                      Image 3
                    </label>
                    {previewImage3 && (
                      <div className="flex items-center">
                        <img src={previewImage3} alt={`Design ${selectedDesign.id} - Image 3`} className="w-16 h-16 object-cover rounded-lg mr-2" />
                        <button className="text-red-600" onClick={() => {
                            setSelectedImage3(null);
                            setPreviewImage3(null);
                          }}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                    {!previewImage3 && (
                      <input
                        type="file"
                        name="image3"
                        id="image3"
                        accept="image/*"
                        onChange={handleImage3Change}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Unit Price(Rs.)
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedDesign.price}
                    className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>       
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Supporting Material
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedDesign.material}
                    className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Recommended Color
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedDesign.color}
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
                <button className="text-gray-600" onClick={() => setShowViewMorePopup(false)}>
                  <AiOutlineClose />
                </button>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">View Design</h1>
              <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                     Main Image
              </label>
                <img src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`}  alt={`Design ${selectedDesign.company_design_id}`} className="w-20 h-20 object-contain rounded-lg mb-4" />
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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

                <div className='flex justify-between'>
                <div className="mt-4">
                  <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                    Image 1
                  </label>
                  <img src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_1}`} alt={`Design ${selectedDesign.company_design_id} - Image 1`} className="w-20 h-20 object-cover rounded-lg mb-4" />
                </div>
                <div className="mt-4">
                  <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                    Image 2
                  </label>
                  <img src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_2}`} alt={`Design ${selectedDesign.company_design_id} - Image 2`} className="w-20 h-20 object-cover rounded-lg mb-4" />
                </div>
                <div className="mt-4">
                  <label htmlFor="image3" className="block text-sm font-medium text-gray-700">
                    Image 3
                  </label>
                  <img src={`http://127.0.0.1:8080/uploads/company_designs/${selectedDesign.image_3}`} alt={`Design ${selectedDesign.company_design_id} - Image 3`} className="w-20 h-20 object-cover rounded-lg mb-4" />
                </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
