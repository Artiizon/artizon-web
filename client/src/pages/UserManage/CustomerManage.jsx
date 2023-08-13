import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import SearchBar from "../../components/searchbars/searchbar";

const DATA = [
  {
    uId: "01",
    fullName: "Nuwan Tharanga",
    email: "nuwan44@gmail.com",
    orders: "10",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "02",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    orders: "15",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "03",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    orders: "5",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "04",
    fullName: "Kavindi Himasha",
    email: "kavih96@gmail.com",
    orders: "18",
    style: "bg-[#F1F1F1]",
  },
  ,
  {
    uId: "02",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    orders: "15",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "03",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    orders: "5",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "04",
    fullName: "Kavindi Himasha",
    email: "kavih96@gmail.com",
    orders: "18",
    style: "bg-[#D9D9D9]",
  },
  ,
  {
    uId: "02",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    orders: "15",
    style: "bg-[#F1F1F1]",
  },
  {
    uId: "03",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    orders: "5",
    style: "bg-[#D9D9D9]",
  },
  {
    uId: "04",
    fullName: "Kavindi Himasha",
    email: "kavih96@gmail.com",
    orders: "18",
    style: "bg-[#F1F1F1]",
  },
];

export default function CustomerManage() {
  const [filteredData, setFilteredData] = useState(DATA);

  return (
    <div>
      <div className=" ml-[-23px] gap-2 ">
        <div className="mb-[20px] ">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div>
        <div className="flex flex-row gap-[20px] text-lg text-black pt-[5px] w-[1185px]">
          <div className="w-[195px] pb-2 font-sans font-[700]">User ID</div>
          <div className="w-[270px] pb-2 font-sans font-[700]">Name</div>
          <div className="w-[250px] font-sans font-[700]">E-Mail</div>
          <div className="w-[160px] font-sans font-[700]">Orders</div>
        </div>
        {filteredData.map((item) => (
          <div
            className={`w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
            key={item.uId}
          >
            <div className=" w-[50px] pl-2 pb-1  text-center radius-[15px]">
              {item.uId}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.fullName}
            </div>
            <div className="w-[305px] pl-2 text-center">{item.email}</div>
            <div className="w-[80px] pl-2 ml-[50px] text-center">
              {item.orders}
            </div>
            <NavLink to="/customerPortfolia">
              <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
                More
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
