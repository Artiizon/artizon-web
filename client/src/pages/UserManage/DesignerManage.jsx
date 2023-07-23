import { NavLink } from "react-router-dom";
import add from "../../images/User/add.png";
import SearchBar from "../../components/searchbars/searchbar";
import React, { useState } from "react";

const DATA = [
  {
    uId: "07",
    fullName: "Nuwan Tharanga",
    email: "nuwan44@gmail.com",
    Designs: "16",
    style: "bg-gray-200",
  },
  {
    uId: "08",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    Designs: "18",
    style: "bg-zinc-100",
  },
  {
    uId: "10",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    Designs: "14",
    style: "bg-gray-200",
  },
  {
    uId: "14",
    fullName: "Kavindi imasha",
    email: "kavih96@gmail.com",
    Designs: "10",
    style: "bg-zinc-100",
  },
];

export default function DesignerManage() {
  const [filteredData, setFilteredData] = useState(DATA);
  return (
    <div>
      <div className=" ml-[10px] gap-2 ">
        <div className="mb-[20px]">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div>
        <button className="w-[130px] h-[35px] bg-green-500 rounded-md text-white text-sm ml-[-1px] mb-[9px] flex">
          <p className="pt-[8px] pl-[40px]">ADD</p>
          <img
            src={add}
            alt="imagemm"
            className="rounded-[50%] h-[25px] mt-[4px] ml-[15px] "
          />
        </button>
        <div className="flex flex-row gap-[20px] text-lg ">
          <div className="w-[150px] pb-2">User ID</div>
          <div className="w-[260px] pb-2">Name</div>
          <div className="w-[260px] ">E-Mail</div>
          <div className="w-[160px] ">Designs</div>
        </div>
        {filteredData.map((item) => (
          <div
            className={`flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
          >
            <div className="w-[150px] pl-2 pb-2">{item.uId}</div>
            <div className="w-[260px] pl-2">
              <NavLink to="/designerPortfolia">{item.fullName}</NavLink>
            </div>
            <div className="w-[260px] pl-2">{item.email}</div>
            <div className="w-[160px] pl-2">{item.Designs}</div>
            <button className="w-[130px] h-[25px] mt-[3px] bg-red-600 rounded-md text-white text-sm ml-[200px]">
              BLOCK
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
