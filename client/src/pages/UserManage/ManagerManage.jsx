
import React, { useState } from "react";
import SearchBar from "../../components/searchbars/searchbar";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const DATA = [
  {
    uId: "08",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    style: "bg-[#F1F1F1]",
  }
];

export default function ManagerManage() {
  const [filteredData, setFilteredData] = useState(DATA);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className=" ml-[-23px] gap-2 ">
        <div className="mb-[20px]">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div>

        <div className="flex flex-row gap-[20px] text-lg ">
          <div className="w-[195px] pb-2 font-sans font-[700]">User ID</div>
          <div className="w-[270px] pb-2 font-sans font-[700]">Name</div>
          <div className="w-[250px] font-sans font-[700]">E-Mail</div>
        </div>
        {filteredData.map((item) => (
          <div
            className={`w-[1050px] flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
          >
            <div className="w-[50px] pl-2 pb-1 text-center radius-[15px] ">
              {item.uId}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.fullName}
            </div>
            <div className=" w-[305px] pl-2 text-center">{item.email}</div>

            <Popup
              trigger={
                <button>
                  {" "}
                  <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
                    More
                  </button>
                </button>
              }
              modal
              nested
              overlayStyle={{
                background: "rgba(0, 0, 0, 0.5)", // Set the overlay background to transparent black
              }}
              contentStyle={{
                background: "transparent", // Set the content background to transparent
                border: "none", // Remove border
                boxShadow: "none", // Remove box shadow
              }}
            >
              {(close) => (
                <div className="modal flex justify-center items-center font-sans">
                  <div
                    className="content p-4 rounded-[15px] bg-white w-[450px] h-[300px] justify-center items-center "
                    style={{ backdropFilter: "blur(8px)" }} // Apply backdrop filter for a blurred effect
                  >
                    <div className="flex">
                      <p className="text-3xl font-bold">Mr. Janod Umayanga</p>
                      <p className="text-sm ml-[20px] mt-[6px]">(stylist)</p>
                    </div>
                    <p className="text-xl ml-[20px] mt-[6px]">
                      janodum84@gmail.com
                    </p>
                    <p className="text mb-[10px]-l ml-[20px] mt-[6px]">
                      +94 742586134
                    </p>
                    <label className="mt-[10px] p-2 w-[130px] h-[40px] font-[600]">
                      Reason
                    </label>
                    <input
                      type="text"
                      className="w-[380px] h-[65px]  bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
                    />
                    <button className=" w-[120px] h-[30px] mt-[40px] bg-black rounded-md text-white text-sm ml-[150px] font-sans font-[600]">
                      BLOCK STYLIST
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        ))}
      </div>
    </div>
  );
}
