import React from "react";
import { NavLink } from "react-router-dom";
import pp1 from "../../images/portPp/maleAvatar.png";
import cmp from "../../images/portPp/complete.png";
import prc from "../../images/portPp/processing.png";
import t1 from "../../images/portPp/ot1.png";
import t2 from "../../images/portPp/ot2.png";
import t3 from "../../images/portPp/ot3.png";
import t4 from "../../images/portPp/ot4.png";
import heart from "../../images/portPp/heart.png";

import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const UName = () => {
  const navigate = useNavigate();

  const [customerAuth, setCustomerAuth] = useState(false);
  const [email, setEmail] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8080/verifyCustomer").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setCustomerAuth(true);
        setEmail(res.data.email);
      } else {
        setCustomerAuth(false);
      }
    });
  }, []);

  return (
    <>
      <div>
        {!customerAuth && (
          <div className=" font-sans ">
            <p className="text-[35px]  ml-[185px] mt-[20px] font-bold uppercase">
              <NavLink to="/customerdetails">Kasun Madhushan</NavLink>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const Block = () => {
  const navigate = useNavigate();

  const [adminAuth, setAdminAuth] = useState(false);
  const [email, setEmail] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8080/verifyAdmin").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setAdminAuth(true);
        setEmail(res.data.email);
      } else {
        setAdminAuth(false);
      }
    });
  }, []);

  return (
    <>
      <div>
        {adminAuth && (
          <div className=" font-sans ">
            <button
          type="button"
          className="  w-[123px] h-[35px] mt-[30px] ml-[620px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow shadow-slate-600  bg-red-600 rounded-[20px] flex"
        >
          <p className="ml-[21px]">BLOCK USER</p>
          
        </button>
          </div>
        )}
      </div>
    </>
  );
};


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

const OrderCard = ({ status, tags, ims, style }) => {
  return (
    <div
      className={`m-4 mt-[20px] p-1 w-[920px] h-[135px] bg-gray-100 shadow-lg rounded-md flex  ${style}`}
    >
      <img src={ims} alt="imagemm" className="h-[125px] " />
      <div className="w-[140px] ml-[25px] mt-[40px]">
        <p className=" text-xl font-normal ">{tags}</p>
      </div>
      <div>
        <p className="font-bold text-xl mt-[15px] ml-[480px] text-center">
          {status}
        </p>
        <NavLink to="/customerOrderDetailsF">
          <button
            type="button"
            className="rounded   w-[120px] h-[35px] mt-[20px] ml-[480px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
          >
            Order details
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default function CustomerPortfolia() {
  return (
    <div className="font-sans mt-[70px]">
      <div className="flex mt-[-40px] font-sans">
        {/* <img
          src={pp1}
          alt="imagce"
          className="w-[150px] h-[150px] ml-[220px] mt-[120px] "
        /> */}
        <UName />

        {/* <button
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
        </button> */}
        <Block />
      </div>

      <div className="flex flex-row justify-center gap-8 ">
        <Counts count="03" tag="Completed Order" im={cmp} />
        <Counts count="01" tag="Processing Orders" im={prc} />
      </div>

      <div className="orders ml-[200px] mt-[10px]">
        <p className="font-bold text-2xl">ORDERS</p>
        <hr width="80%" />
        <div className="cards mt-[40px]">
          <OrderCard
            status="Processing"
            tags="Foot ball T shirt"
            ims={t1}
            style="bg-[#D9D9D9]"
          />
          <OrderCard
            status="Completed"
            tags="Long sleves T shirt"
            ims={t2}
            style="bg-[#F1F1F1]"
          />
          <OrderCard
            status="Completed"
            tags="Normal design 01"
            ims={t3}
            style="bg-[#D9D9D9]"
          />
          <OrderCard
            status="Completed"
            tags="Normal design 02"
            ims={t4}
            style="bg-[#F1F1F1]"
          />
        </div>
      </div>
    </div>
  );
}
