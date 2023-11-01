import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import TabsFun from "./TabsFun";
import im1 from "../../images/User/user.png";
import im2 from "../../images/User/designer.png";
import im3 from "../../images/User/stylist.png";
import im4 from "../../images/User/admin.png";
import add from "../../images/User/add.png";



const Counts = ({ count, tag, im }) => {
  
  
  return (
    <div className="mt-[130px] m-4 p-3 w-[205px] h-[75px] bg-white shadow-xl rounded-md flex  ">
      <div className="w-[140px] ">
        <p className="  ml-[23px] text-[20px] font-sans font-[700]">{count}</p>
        <p className="text-[20px] ">{tag}</p>
      </div>
      <img src={im} alt="imagemm" className="rounded-[50%] h-[45px] " />
    </div>
  );
};

export default function UseManageMain() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customers");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchCustomers();
  }, []);
  const [designerData, setDesignerData] = useState([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/designers");
        setDesignerData(response.data);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    fetchDesigners();
  }, []);

  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/managers");
        setManagerData(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  const [stylistData, setStylistData] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/stylists");
        setStylistData(response.data);
      } catch (error) {
        console.error("Error fetching stylist:", error);
      }
    };

    fetchStylists();
  }, []);

  return (
    <div className="mt-[-40px] min-h-[695px]">
      {/* <p className="text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
        USER MANAGEMENT
      </p> */}
      <div className="flex flex-row justify-center gap-8 ">
        <Counts count={customerData.length} tag="CUSTOMERS" im={im1} />
        <Counts count={designerData.length} tag="DESIGNERS" im={im2} />
        <Counts count={stylistData.length} tag="STYLISTS" im={im3} />
        <Counts count={managerData.length} tag="T P Managers" im={im4} />
      </div>
      <p className="mt-[20px]"></p>
      <button className="w-[130px] h-[32px] bg-black rounded-md text-white text-sm ml-[1218px] mt-[25px] font-sans font-[600] mb-[9px] flex">
          
          <img
            src={add}
            alt="imagemm"
            className="rounded-[50%] h-[25px] mt-[4px] ml-[15px] "
          />
          <NavLink to="/addUser"><p className="pt-[5px] pl-[4px]">ADD USERS</p></NavLink>
        </button>
      <div className="ml-[40px]">
      <TabsFun />
      </div>
    </div>
  );
}
