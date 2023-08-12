import React from "react";

export default function AddDesigner() {
  return (
    <div>
      <div className="ml-[240px]">
        <div className="flex">
          <label className="p-2 w-[130px] h-[40px] ">Name</label>
          <input
            type="text"
            className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex">
          <label className="p-2 w-[130px] h-[40px] ">Email</label>
          <input
            type="text"
            className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex">
          <label className="p-2 w-[130px] h-[40px] ">Contact No</label>
          <input
            type="text"
            className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex">
          <label className="p-2 w-[130px] h-[40px] ">Note</label>
          <input
            type="text"
            className="w-[380px] h-[60px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
        </div>
        
      </div>
      <button className=" w-[100px] h-[30px] mt-[20px] bg-black rounded-md text-white text-sm ml-[500px]">
              ADD
            </button>
    </div>
  );
}
