import { NavLink } from "react-router-dom";
import im1 from "../../images/User/user.png";
import im2 from "../../images/User/designer.png";
import im3 from "../../images/User/stylist.png";
import im4 from "../../images/User/admin.png";
import add from "../../images/User/add.png";
import BTabsFun from "./BTabsFun";

const Counts = ({ count, tag, im }) => {
  
  
    return (
      <div className="mt-[130px] m-4 p-3 w-[200px] h-[75px] bg-white shadow-xl rounded-md flex  ">
        <div className="w-[140px] ">
          <p className="  ml-[23px] text-[20px] font-sans font-[700]">{count}</p>
          <p className="text-[20px] ">{tag}</p>
        </div>
        <img src={im} alt="imagemm" className="rounded-[50%] h-[45px] " />
      </div>
    );
  };
  

export default function BlockUserManageMain() {
    return (
        <div className="mt-[-40px] min-h-screen">
          {/* <p className="text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
            USER MANAGEMENT
          </p> */}
          <div className="flex flex-row justify-center gap-8 ">
            <Counts count="10" tag="CUSTOMERS" im={im1} />
            <Counts count="5" tag="DESIGNERS" im={im2} />
            <Counts count="1" tag="STYLISTS" im={im3} />
            <Counts count="1" tag="ADMINS" im={im4} />
          </div>
          <p className="mt-[20px]"></p>
          
          <div className="ml-[40px]">
          <BTabsFun />
          </div>
        </div>
      );
}
