import { useState } from "react";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import StandardLayout from "../components/layout/StandardLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSnapshot } from "valtio";
import state from "../store";

const AddNewDesignPage = () => {
  const snap = useSnapshot(state);
  state.page = "no-canvas";
   const navigate = useNavigate();
  const materialOptions = ["Cotton", "Silk", "Linen", "Polyester", "Rayon"];
  const [supportingMaterials, setSupportingMaterials] = useState([{ material: "" },]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [file, setFiles] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).slice(0, 3);
    const newFiles = fileArray.map((file) => ({ file, name: file.name }));
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
    setFiles(Array.from(files).slice(0, 3));

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
    setImages((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("designName", event.target.designName.value);
    formData.append("designDescription", event.target.designDescription.value);
    formData.append("designerId", "1"); // Replace '123' with the actual designer ID
    formData.append("unitPrice", event.target.unitPrice.value);  
    // Remove any empty materials from the formData
    supportingMaterials.forEach((material, index) => {
      formData.append(`materials[${index}].material`, material.material);
    });

 // Append the image file names to the formData
      // formData.append('image', file);
      for (let i = 0; i < file.length; i++) {
        formData.append(`images[${i}]`, file[i]);
      }
  

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
   
    console.log(formData.getAll("imagePreviews"));

    axios
      .post("http://localhost:8080/api/addNewDesign", formData, config)
      .then((response) => {
        navigate('/des-design'); 
        console.log("Design and materials added successfully!", response.data);
        
      })
      .catch((error) => {
        console.error("Error adding design and materials:", error);
        // Handle the error and show an error message to the user
      });
  };
  return (
    <StandardLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Design</h1>

        <div className="px-1">
          <hr className="my-4 border-t-2 border-gray-300" />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="designName"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Design Name
                </label>
                <input
                  type="text"
                  id="designName"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter design name"
                />
              </div>


            <div className="mb-4">
                <label
                  htmlFor="designDescription"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Design Description
                </label>
                <textarea
                  id="designDescription"
                  className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter design description"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="designName"
                  className="block text-gray-800 font-semibold mb-2"
                >
                  Unit Price (Rs.)
                </label>
                <input
                  type="text"
                  id="unitPrice"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter unit price"
                />
              </div>

              <div className="mb-4">
              <label
                htmlFor="designMaterials"
                className="block text-gray-800 font-semibold mb-2"
              >
                Supporting Material
              </label>
              <div className="flex flex-col gap-4">
                {supportingMaterials.map((item, index) => (
                  <div key={index} className="flex">
                    <select
                      className="w-full px-4 py-3 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.material}
                      onChange={(e) => {
                        const newMaterials = supportingMaterials.map((materialObj, idx) => ({
                          material: idx === index ? e.target.value : "",
                        }));
                        setSupportingMaterials(newMaterials);
                      }}
                    >
                      <option value="">Select Material</option>
                      {materialOptions.map((material) => (
                        <option
                          key={material}
                          value={material}
                          disabled={supportingMaterials.some(
                            (item) =>
                              item.material === material &&
                              item.material !== supportingMaterials[index].material
                          )}
                        >
                          {material}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>


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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg mt-4"
                  type="submit"
                >
                  Submit Design
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default AddNewDesignPage;