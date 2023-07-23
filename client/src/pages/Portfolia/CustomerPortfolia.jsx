import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import pp1 from "../../images/portPp/maleAvatar.png";
import cmp from "../../images/portPp/complete.png";
import prc from "../../images/portPp/processing.png";
import t1 from "../../images/portPp/ot1.png";
import t2 from "../../images/portPp/ot2.png";
import t3 from "../../images/portPp/ot3.png";
import t4 from "../../images/portPp/ot4.png";
import heart from "../../images/portPp/heart.png";

const Counts = ({ count, tag, im }) => {
  return (
    <div className="m-4 mt-[50px] p-3 w-[320px] h-[95px] bg-gray-100 shadow-xl rounded-md flex  ">
      <div className="w-[140px] ">
        <p className=" text-2xl font-semibold">{tag}</p>
      </div>
      <div>
        <p className="font-bold text-2xl mt-[15px] ml-[40px] text-center">
          {count}
        </p>
      </div>
      <img
        src={im}
        alt="imagemm"
        className="rounded-[50%] h-[45px] mt-[15px] ml-[40px]"
      />
    </div>
  );
};

const OrderCard = ({ status, tags, ims }) => {
  return (
    <div className="m-4 mt-[20px] p-1 w-[920px] h-[135px] bg-gray-100 shadow-lg rounded-md flex  ">
      <img src={ims} alt="imagemm" className="h-[125px] " />
      <div className="w-[140px] ml-[25px] mt-[40px]">
        <p className=" text-xl font-normal ">{tags}</p>
      </div>
      <div>
        <p className="font-bold text-xl mt-[15px] ml-[480px] text-center">
          {status}
        </p>
        <button
          type="button"
          className="rounded   w-[120px] h-[35px] mt-[20px] ml-[480px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-slate-500"
        >
          Order details
        </button>
      </div>
    </div>
  );
};

export default function CustomerPortfolia() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <img
          src={pp1}
          alt="imagce"
          className="w-[150px] h-[150px] ml-[220px] mt-[120px] "
        />
        <p className="text-[35px]  ml-[35px] mt-[200px] font-bold uppercase">
        <NavLink to="/customerdetails">Kasun Madhushan</NavLink>
        </p>



        
          <button
            type="button"
            className="  w-[123px] h-[35px] mt-[203px] ml-[220px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-black  shadow shadow-slate-600  bg-white rounded-[20px] flex"
          >
            <p className="ml-[15px]">WishList</p>
            <img
              src={heart}
              alt="imagce"
              className="w-[30px] h-[30px] ml-[6px] mt-[-3px] "
            />
          </button>
        
      </div>

      <div className="flex flex-row justify-center gap-8 ">
        <Counts count="03" tag="Completed Order" im={cmp} />
        <Counts count="01" tag="Processing Orders" im={prc} />
      </div>

      <div className="orders ml-[200px] mt-[10px]">
        <p className="font-semibold text-xl">ORDERS</p>
        <hr width="80%" />
        <div className="cards mt-[40px]">
          <OrderCard status="Processing" tags="Foot ball T shirt" ims={t1} />
          <OrderCard status="Completed" tags="Long sleves T shirt" ims={t2} />
          <OrderCard status="Completed" tags="Normal design 01" ims={t3} />
          <OrderCard status="Completed" tags="Normal design 02" ims={t4} />
        </div>
      </div>
    </div>
  );
}
