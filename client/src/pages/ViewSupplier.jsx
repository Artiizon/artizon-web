import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch suppliers from the backend API
    axios
      .get(`http://localhost:8080/api/suppliers?search=${searchTerm}`)
      .then((response) => {
        setSuppliers(response.data);
      });
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-3xl mt-10 font-bold text-gray-800 ml-10">
        View Suppliers
      </h1>
      <div className="px-2">
        <hr className="my-4 border-t-2 border-gray-200" />
      </div>
      <div className="flex flex-col items-center pl-8 pr-8 pb-8 min-h-screen">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Supplier by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 w-96 py-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)} // You can add your search logic here
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="w-[1200px] overflow-y-auto max-h-[608px] font-sans font-[700] rounded-[10px]">
          <table className="w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  Supplier Name
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  Contact Name
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  Email
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  Phone Number
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  Address
                </th>
                <th
                  className="py-2 px-4 bg-black text-white"
                  style={{ width: "200px" }}
                >
                  City
                </th>
              </tr>
            </thead>
            </table>
           
            <div
            className="table-container"
            style={{ maxHeight: "480px", overflowY: "auto", maxWidth: "100%" }}
          >
          <table className="w-full">
          
            <tbody>
              {suppliers.map((supplier,index) => (
              <tr
              key={supplier.id}
              className={
                index % 2 === 0
                  ? "bg-[#F1F1F1] text-center"
                  : "bg-[#D9D9D9] text-center"
              }
            >
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.supplier_name}
                  </td>
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.contact_name}
                  </td>
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.email}
                  </td>
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.phone_number}
                  </td>
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.address}
                  </td>
                  <td className="py-2 px-4" style={{ width: "200px" }}>
                    {supplier.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupplier;
