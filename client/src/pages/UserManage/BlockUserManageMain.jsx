import { NavLink } from "react-router-dom";
import im1 from "../../images/User/user.png";
import im2 from "../../images/User/designer.png";
import im3 from "../../images/User/stylist.png";
import im4 from "../../images/User/admin.png";
import add from "../../images/User/add.png";
import BTabsFun from "./BTabsFun";
import { useState, useEffect } from "react";
import axios from "axios";

const Counts = ({ count, tag, im }) => {
  
  
    return (
      <div className="mt-[30px] m-4 p-3 w-[205px] h-[75px] bg-white shadow-xl rounded-md flex  ">
        <div className="w-[140px] ">
          <p className="  ml-[23px] text-[20px] font-sans font-[700]">{count}</p>
          <p className="text-[20px] ">{tag}</p>
        </div>
        <img src={im} alt="imagemm" className="rounded-[50%] h-[45px] " />
      </div>
    );
  };
  

export default function BlockUserManageMain() {

  const [stylistData, setStylistData] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bstylists");
        setStylistData(response.data);
      } catch (error) {
        console.error("Error fetching stylist:", error);
      }
    };

    fetchStylists();
  }, []);

  const [designerData, setDesignerData] = useState([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bdesigners");
        setDesignerData(response.data);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    fetchDesigners();
  }, []);

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bcustomers");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomers();
  }, []);

  const [managerData, setManagerData] = useState([]);

    useEffect(() => {
      const fetchManagers = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/bmanagers");
          setManagerData(response.data);
        } catch (error) {
          console.error("Error fetching manager:", error);
        }
      };
  
      fetchManagers();
    }, []);
    return (
        <div className="mt-[-40px] min-h-[700px]">
          <p className="text-[35px]  ml-[155px] pt-[90px]  font-bold">
            BLOCKED USERS
          </p>
          <div className="flex flex-row justify-center gap-8 ">
            <Counts count={customerData.length} tag="CUSTOMERS" im={im1} />
            <Counts count={designerData.length} tag="DESIGNERS" im={im2} />
            <Counts count={stylistData.length} tag="STYLISTS" im={im3} />
            <Counts count={managerData.length} tag="T P Managers" im={im4} />
          </div>
          <p className="mt-[20px]"></p>
          
          <div className="ml-[40px]">
          <BTabsFun />
          </div>
        </div>
      );
}
