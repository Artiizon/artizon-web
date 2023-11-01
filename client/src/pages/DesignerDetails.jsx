import React from "react";
import pp1 from "../images/portPp/maleAvatar.png";
import Navbar from "../components/header/Navbar";
// import heart from "../../images/portPp/heart.png";
import { NavLink, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import { useSnapshot } from "valtio";
import state from "../store";

export default function DesignerProfile() {
    const snap = useSnapshot(state);
    state.page = "no-canvas";

    const [designer, setDesigner] = useState([]);
    const designerId = sessionStorage.designer_id;

    //console.log("sessionStorage",sessionStorage);

    console.log("designerId",designerId);

    useEffect(() => {
        axios.post('http://localhost:8080/getDesignerDetails', { designerId: designerId })
            .then(res => {
                setDesigner(res.data);
            })
    }, []);
    

    console.log(designer);
    console.log(designerId);
  return (
    <div className="min-h-screen">
    <div className="font-sans mt-[-50px] min-h-[625.5px]">
      <div className="flex flex-col text-center">
        <img
          src={pp1}
          alt="imagce"
          className="w-[130px] h-[130px] ml-[700px] mt-[120px] "
        />
        {designer.map((designer) => (
        <p className="text-[35px]  ml-[165px] mt-[20px] mb-[15px] font-bold uppercase">
            {designer.title}. {designer.first_name} {designer.last_name}
        </p>
        ))}
      </div>

      <div className="ml-[110px]">
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px] ">Name</p>
          {designer.map((designer) => (
          <p className=" text-l ml-[300px]">{designer.first_name} {designer.last_name}</p>
          ))}
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">E-Mail</p>
          {designer.map((designer) => (
          <p className=" text-l ml-[300px]">{designer.email}</p>
          ))}
        </div>
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px] ">Mobile Number</p>
          {designer.map((designer) => (
          <p className=" text-l ml-[300px]">{designer.contact_number}</p>
          ))}
        </div>
        <hr width="50%" className="ml-[300px]" />
        {/* <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Address</p>
          <p className=" text-l ml-[300px]">N0:65,Jaya Mawatha,Colombo 08</p>
        </div> */}
        {/* <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Country</p>
          <p className=" text-l ml-[300px]">Sri Lanka</p>
        </div> */}
        <hr width="50%" className="ml-[300px]" />
        <div className="orders ml-[300px] mt-[10px] mb-[5px] flex">
          <p className="font-semibold text-xl w-[180px]">Password</p>
          <p className=" text-l ml-[300px]">xxxxxxxxx</p>
          <NavLink to="/changePassword">
            <button
              type="button"
              className="  w-[123px] h-[30px] mt-[-2px] ml-[20px]
                  pt-[4px] text-sm font-medium uppercase 
                text-white  shadow shadow-slate-600  bg-black rounded-[10px] flex"
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
    </div>
  );
}
