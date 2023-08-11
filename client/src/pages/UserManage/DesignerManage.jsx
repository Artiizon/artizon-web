import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchbars/searchbar";
import React, { useState } from "react";

const DATA = [
  {
    uId: "07",
    fullName: "Nuwan Tharanga",
    email: "nuwan44@gmail.com",
    Designs: "16",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "08",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    Designs: "18",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "10",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    Designs: "14",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "14",
    fullName: "Kavindi imasha",
    email: "kavih96@gmail.com",
    Designs: "10",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "07",
    fullName: "Nuwan Tharanga",
    email: "nuwan44@gmail.com",
    Designs: "16",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "08",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    Designs: "18",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "10",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    Designs: "14",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "14",
    fullName: "Kavindi imasha",
    email: "kavih96@gmail.com",
    Designs: "10",
    style: "bg-[#F1F1F1]",
  },
];

export default function DesignerManage() {
  const [filteredData, setFilteredData] = useState(DATA);
  return (
    <div>
      <div className=" ml-[-23px] gap-2 ">
        <div className="mb-[20px]">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div>

        <div className="flex flex-row gap-[20px] text-lg ">
          <div className="w-[195px] pb-2">User ID</div>
          <div className="w-[270px] pb-2">Name</div>
          <div className="w-[250px] ">E-Mail</div>
          <div className="w-[160px] ">Design Count</div>
        </div>
        {filteredData.map((item) => (
          <div
            className={`w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
          >
            <div className="w-[50px] pl-2 pb-1 text-center radius-[15px] ">
              {item.uId}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.fullName}
            </div>
            <div className=" w-[305px] pl-2 text-center">{item.email}</div>
            <div className=" w-[80px] pl-2 ml-[50px] text-center">
              {item.Designs}
            </div>
            <NavLink to="/designerPortfolia ">
              <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px]">
                More
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
