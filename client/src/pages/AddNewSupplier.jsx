import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupplierForm = () => {
  
  const navigate = useNavigate();

  const [supplierInfo, setSupplierInfo] = useState({
    supplier_name: '',
    contact_name: '',
    email: '',
    phone_number: '',
    address: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    axios
      .post("http://localhost:8080/api/supplier", supplierInfo)
      .then((response) => {
        console.log(response.data);
        navigate("/stock/new");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <div className="mt-10 mb-10 max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-4">Add New Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="supplier_name">
            Supplier Name
          </label>
          <input
            type="text"
            id="supplier_name"
            name="supplier_name"
            value={supplierInfo.supplier_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="contact_name">
            Contact Name
          </label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            value={supplierInfo.contact_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={supplierInfo.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>


        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="phone_number">
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={supplierInfo.phone_number}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>




        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={supplierInfo.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={supplierInfo.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        

        <div className="mt-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 mr-3  rounded-md"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplierForm;
