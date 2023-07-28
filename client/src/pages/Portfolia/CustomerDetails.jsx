import React from "react";
import pp1 from "../../images/portPp/maleAvatar.png";
import Navbar from "../../components/header/Navbar";
// import heart from "../../images/portPp/heart.png";
import { NavLink } from "react-router-dom";

export default function CustomerDetails() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col text-center">
        <img
          src={pp1}
          alt="imagce"
          className="w-[130px] h-[130px] ml-[700px] mt-[120px] "
        />
        <p className="text-[35px]  ml-[35px] mt-[20px] mb-[15px] font-bold uppercase">
          Kasun Madhushan
        </p>
      </div>

      <div>
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px] ">Name</p>
          <p className=" text-l ml-[300px]">Kasun Madhushanka</p>
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">E-Mail</p>
          <p className=" text-l ml-[300px]">Kasunmadu97@gmail.com</p>
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px] ">Mobile Number</p>
          <p className=" text-l ml-[300px]">0774562159</p>
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Address</p>
          <p className=" text-l ml-[300px]">N0:65,Jaya Mawatha,Colombo 08</p>
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Country</p>
          <p className=" text-l ml-[300px]">Sri Lanka</p>
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Password</p>
          <p className=" text-l ml-[300px]">xxxxxxxxx</p>
          <NavLink to="/changePassword">
            <button
              type="button"
              className="  w-[123px] h-[30px] mt-[-2px] ml-[20px]
                  pt-[4px] text-sm font-medium uppercase 
                text-white  shadow shadow-slate-600  bg-blue-600 rounded-[10px] flex"
            >
              <p className="ml-[35px]">change</p>
              {/* <img
              src={heart}
              alt="imagce"
              className="w-[30px] h-[30px] ml-[6px] mt-[-3px] "
            /> */}
            </button>
          </NavLink>
        </div>
        <hr width="50%" className="ml-[300px]" />
      </div>
    </div>
  );
}
