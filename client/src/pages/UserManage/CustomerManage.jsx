import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import SearchBar from "../../components/searchbars/searchbar";

const DATA = [
  {
    uId: "01",
    fullName: "Nuwan Tharanga",
    email: "nuwan44@gmail.com",
    orders: "10",
    style: "bg-gray-200",
  },
  {
    uId: "02",
    fullName: "Kusal Chathuranga",
    email: "ktharanga15@gmail.com",
    orders: "15",
    style: "bg-zinc-100",
  },
  {
    uId: "03",
    fullName: "Nirmal ravindu",
    email: "Nimravi78@gmail.com",
    orders: "5",
    style: "bg-gray-200",
  },
  {
    uId: "04",
    fullName: "Kavindi Himasha",
    email: "kavih96@gmail.com",
    orders: "18",
    style: "bg-zinc-100",
  },
];

export default function CustomerManage() {
  const [filteredData, setFilteredData] = useState(DATA);

  return (
    <div>
      <div className=" ml-[10px] gap-2 ">
        <div className="mb-[20px]">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div>
        <div className="flex flex-row gap-[20px] text-lg ">
          <div className="w-[150px] pb-2">User ID</div>
          <div className="w-[260px] pb-2">Name</div>
          <div className="w-[260px] ">E-Mail</div>
          <div className="w-[160px] ">Orders</div>
        </div>
        {filteredData.map((item) => (
          <div
            className={`flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
            key={item.uId}
          >
            <div className="w-[150px] pl-2 pb-1">{item.uId}</div>
            <div className="w-[260px] pl-2">
              <NavLink to="/customerPortfolia">{item.fullName}</NavLink>
            </div>
            <div className="w-[260px] pl-2">{item.email}</div>
            <div className="w-[160px] pl-2">{item.orders}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
