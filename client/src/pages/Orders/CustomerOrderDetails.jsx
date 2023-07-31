import React from "react";
import Navbar from "../../components/header/Navbar";
import circle from "../../images/orders/circle1.png";
import tick from "../../images/orders/tick2.png";
import ims from "../../images/portPp/ot1.png";
import imX from "../../images/orders/x.png";

export default function CustomerOrderDetails() {
  const status = "InPr";
  return (
    <div>
      <Navbar />

      <div>
        <p className="text-[35px]  ml-[50px] mt-[120px] mb-[50px] font-bold uppercase">
          ORDER NO : #45823
        </p>
        <div className="status bar ml-[23%] h-[10px] w-[67%]  mt-[20px] flex ">
          {/* Using ternary operator for conditional rendering */}
          {status === "Pending" ? (
            <>
            <img
              src={tick}
              alt="imagemm"
              className="rounded-[50%] h-[320%] w-[3.2%]  mt-[-10.6px] z-40  "
            />

            <div className="status bar h-[10px] w-[30%] bg-black ml-[-2.6%] "></div>
            <img
              src={circle}
              alt="imagemm"
              className="rounded-[50%] h-[440%] w-[3.2%] ml-[-1%] mt-[-18.6px] z-40 "
            />

            <div className="status bar h-[10px] w-[30%] bg-black ml-[-5%] "></div>
            <img
              src={circle}
              alt="imagemm"
              className="rounded-[50%] h-[440%] w-[3.2%] ml-[-1%] mt-[-18.6px] z-40 "
            />

            <div className="status bar h-[10px] w-[30%] bg-black ml-[-5%] "></div>

            <img
              src={circle}
              alt="imagemm"
              className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mt-[-18.6px] z-40 "
            />
            <button
            type="button"
            className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
          >
            Cancel Order
          </button>
          </>
          ) : status === "InProduction" ? (
            <>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%]  mt-[-10.6px] z-40  "
              />

              <div className="status bar h-[10px] w-[30%] bg-green-500 ml-[-2.6%] "></div>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[25%] bg-black ml-[-1%] "></div>
              <img
                src={circle}
                alt="imagemm"
                className="rounded-[50%] h-[440%] w-[3.2%] ml-[-1%] mt-[-18.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[28%] bg-black ml-[-5%] "></div>

              <img
                src={circle}
                alt="imagemm"
                className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mt-[-18.6px] z-40 "
              />
            </>
          ) : status === "Shipped" ? (
            <>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%]  mt-[-10.6px] z-40  "
              />

              <div className="status bar h-[10px] w-[30%] bg-green-500 ml-[-2.6%] "></div>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[25%] bg-green-500 ml-[-1%] "></div>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[24%] bg-black ml-[-1%] "></div>

              <img
                src={circle}
                alt="imagemm"
                className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mt-[-18.6px] z-40 "
              />
            </>
          ) : status === "Complete" ? (
            <>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%]  mt-[-10.6px] z-40  "
              />

              <div className="status bar h-[10px] w-[30%] bg-green-500 ml-[-2.6%] "></div>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[30%] bg-green-500 ml-[-5%] "></div>
              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[26%] bg-green-500 ml-[-5%] "></div>

              <img
                src={tick}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mt-[-10.6px] z-40 "
              />
            </>
          ) : (
            <>
              <img
                src={imX}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%]  mt-[-10.6px] z-40  "
              />

              <div className="status bar h-[10px] w-[30%] bg-red-700 ml-[-2.6%] "></div>
              <img
                src={imX}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[30%] bg-red-700 ml-[-5%] "></div>
              <img
                src={imX}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-1%] mt-[-10.6px] z-40 "
              />

              <div className="status bar h-[10px] w-[26%] bg-red-700 ml-[-5%] "></div>

              <img
                src={imX}
                alt="imagemm"
                className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mt-[-10.6px] z-40 "
              />
            </>
          )}
        </div>
      </div>
      <div className="ml-[23%] h-[10px] w-[67%]  mt-[10px] flex ">
        <label className="text-xl font-semibold mt-[25px] ml-[-2.1%]">
          Pending
        </label>
        <label className="text-xl font-semibold mt-[25px] ml-[19.2%] ">
          PRODUCTION
        </label>
        <label className="text-xl font-semibold mt-[25px] ml-[17%]">
          SHIPPED
        </label>
        <label className="text-xl font-semibold mt-[25px] ml-[13%]">
          COMPLETED
        </label>
      </div>

      <div className="flex ml-[390px] mt-[70px] ">
        <div className="mt-[1px] ml-[100px]">
          <p className="mt-[20px] ml-[20px] font-bold">Ordered Date</p>
          <p className="mt-[10px] ml-[20px] "> 2023 July 25</p>
        </div>
        <div className="mt-[1px] ml-[100px]">
          <p className="mt-[20px] ml-[20px] font-bold ">Payment Date</p>
          <p className="mt-[10px] ml-[20px] ">2023 July 28</p>
        </div>
        <div className="mt-[1px] ml-[100px]">
          <p className="mt-[20px] ml-[20px] font-bold">Delivery Date</p>
          <p className="mt-[10px] ml-[20px] ">2023 Aug 25</p>
        </div>
      </div>

      <div className="flex mt-[20px]">
        <img src={ims} alt="imagemm" className="h-[285px]  ml-[200px] " />
        <div>
          <p className="mt-[90px] ml-[20px] font-semibold">M - 20</p>
          <p className="mt-[10px] ml-[20px] font-semibold">L - 10</p>
          <p className="mt-[10px] ml-[20px] font-semibold">XL - 30</p>
        </div>
        <div>
          <p className="mt-[90px] ml-[90px] font-semibold">Material</p>
          <p className="mt-[10px] ml-[90px] font-semibold">Cotton</p>
        </div>
        <div>
          <p className="mt-[60px] ml-[330px] font-semibold">Address</p>
          <p className="mt-[5px] ml-[330px] font-semibold">Hasitha Sawan Wijewardana</p>
          <p className="mt-[5px] ml-[330px] font-semibold">No:65,</p>
          <p className="mt-[5px] ml-[330px] font-semibold">Gunawardana Road,</p>
          <p className="mt-[5px] ml-[330px] font-semibold">Colombo 06.</p>
        </div>
        
        
      </div>
      

      <div className="mt-[50px] ml-[90px] font-semibold">
            <p>Payement Details</p>
        </div>


    </div>
    
  );
}
