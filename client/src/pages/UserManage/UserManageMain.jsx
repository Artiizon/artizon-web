import Navbar from "../../components/header/Navbar";
import TabsFun from "./TabsFun";
import im1 from "../../images/User/user.png";
import im2 from "../../images/User/designer.png";
import im3 from "../../images/User/stylist.png";
import im4 from "../../images/User/admin.png";

const Counts = ({ count, tag, im }) => {
  return (
    <div className="m-4 p-3 w-[200px] h-[75px] bg-gray-100 shadow-xl rounded-md flex  ">
      <div className="w-[140px] ">
        <p className="font-medium text-xl ml-[13px]">{count}</p>
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
      <p className="text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
        USER MANAGEMENT
      </p>
      <div className="flex flex-row justify-center gap-8 ">
        <Counts count="14258" tag="CUSTOMERS" im={im1} />
        <Counts count="25" tag="DESIGNERS" im={im2} />
        <Counts count="10" tag="STYLIST" im={im3} />
        <Counts count="5" tag="ADMIN" im={im4} />
      </div>
      <p className="mt-[20px]"></p>
      <TabsFun />
    </div>
  );
}
