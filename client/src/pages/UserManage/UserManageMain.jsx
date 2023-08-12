import { NavLink } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import TabsFun from "./TabsFun";
import im1 from "../../images/User/user.png";
import im2 from "../../images/User/designer.png";
import im3 from "../../images/User/stylist.png";
import im4 from "../../images/User/admin.png";
import add from "../../images/User/add.png";

const Counts = ({ count, tag, im }) => {
  return (
    <div className="mt-[130px] m-4 p-3 w-[200px] h-[75px] bg-white shadow-xl rounded-md flex  ">
      <div className="w-[140px] ">
        <p className="  ml-[13px]">{count}</p>
        <p className="font-normal ">{tag}</p>
      </div>
      <img src={im} alt="imagemm" className="rounded-[50%] h-[45px] " />
    </div>
  );
};

export default function UseManageMain() {
  return (
    <div>
      <Navbar />
      {/* <p className="text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
        USER MANAGEMENT
      </p> */}
      <div className="flex flex-row justify-center gap-8 ">
        <Counts count="14258" tag="CUSTOMERS" im={im1} />
        <Counts count="25" tag="DESIGNERS" im={im2} />
        <Counts count="10" tag="STYLISTS" im={im3} />
        <Counts count="5" tag="ADMINS" im={im4} />
      </div>
      <p className="mt-[20px]"></p>
      <button className="w-[130px] h-[32px] bg-black rounded-md text-white text-sm ml-[1218px] mt-[25px] mb-[9px] flex">
          
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
