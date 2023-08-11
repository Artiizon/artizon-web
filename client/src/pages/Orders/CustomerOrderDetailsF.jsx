import React from "react";
import Navbar from "../../components/header/Navbar";
import circle from "../../images/orders/circle1.png";
import tick from "../../images/orders/tick2.png";
import ims from "../../images/portPp/ot1.png";
import imX from "../../images/orders/x.png";

export default function CustomerOrderDetailsF() {
  const status = "Delivery";
  return (
    <div>
      <Navbar />

      <div>
        <p className="text-[35px]  ml-[50px] mt-[120px] mb-[50px] uppercase">
          ORDER NO : #45823
        </p>
        <div className="status bar ml-[23%] h-[10px] w-[67%]  mt-[20px] flex ">
          {/* Using ternary operator for conditional rendering */}
          {status === "Pending" ? (
            <>
              <div className="status bar h-[10px] w-[115%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Sample fee" ? (
            <>
              <div className="status bar h-[10px] w-[115%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Sample" ? (
            <>
              <div className="status bar h-[10px] w-[115%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Advance fee" ? (
            <>
              <div className="status bar h-[10px] w-[115%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "FullPayment" ? (
            <>
              <div className="status bar h-[10px] w-[105%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500 "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
            </>
          ) : status === "Delivery" ? (
            <>
              <div className="status bar h-[10px] w-[105%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500 "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-green-500  "></div>
                <img
                  src={tick}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
            </>
          ) : (
            <>
              <div className="status bar h-[10px] w-[105%] bg-black ml-[-17.5%]  mt-[2%] flex ">
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-red-500  "></div>
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-red-500  "></div>
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-red-500 "></div>
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-red-500  "></div>
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
                <div className="status bar h-[10px] w-[20.7%] bg-red-500  "></div>
                <img
                  src={imX}
                  alt="imagemm"
                  className="rounded-[50%] h-[320%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-10.6px] z-40 "
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="ml-[13%] h-[10px] w-[67%]  mt-[65px] flex ">
        <label className="text-xl font-semibold  ml-[-6.5%]">Pending</label>
        <label className="text-xl font-semibold  ml-[14.2%] ">Sample fee</label>
        <label className="text-xl font-semibold  ml-[14.5%]">Sample</label>
        <label className="text-xl font-semibold  ml-[13.5%]">Advance fee</label>
        <label className="text-xl font-semibold  ml-[12%]">FullPayment</label>
        <label className="text-xl font-semibold  ml-[12%]">Delivery</label>
      </div>
      <div className="ml-[13%] h-[10px] w-[76%]  mt-[45px] flex  ">
        <label className="text-xl  ml-[-8.5%] w-[570px] ">(12-03-2023)</label>
        <label className="text-xl  ml-[8%] w-[570px]">(12-03-2023)</label>
        <label className="text-xl ml-[5%] w-[570px]">(12-03-2023)</label>
        <label className="text-xl ml-[6%] w-[570px]">(12-03-2023)</label>
        <label className="text-xl  ml-[4%] w-[570px]">(12-03-2023)</label>
        <label className="text-xl  ml-[8%] w-[570px]">(12-03-2023)</label>
      </div>
      <div className="flex">
        <div>
          <div className="flex mt-[20px]">
            <div className="mt-[60px] ml-[200px]">
              <p className=" font-semibold">Contact Details</p>
              <p className="mt-[17px]  ">Hasitha Sawan Wijewardana</p>
              <p className="mt-[17px]  ">No:65,</p>
              <p className="mt-[3px]  ">Gunawardana Road,</p>
              <p className="mt-[3px]  ">Colombo 06.</p>
            </div>
            <div>
              <p className="mt-[60px] ml-[120px] font-semibold">Material</p>
              <p className="mt-[17px] ml-[120px] ">Cotton</p>
            </div>
            <div className="ml-[130px]">
              <p className="mt-[60px]  font-semibold">Quantities</p>
              <p className="mt-[17px]  ">M : 20</p>
              <p className="mt-[10px]  ">L : 10</p>
              <p className="mt-[10px]  ">XL : 30</p>
            </div>
          </div>
          <hr class="border-2 ml-[200px] mt-[45px] w-[650px]" />

          <div>
      {status === "Sample fee" || status === "Advance fee" || status === "FullPayment" ? (
        <div className="flex ml-[200px]">
        <div>
          <p className="mt-[60px]  font-[700]">Sample Fee</p>
          <p className="mt-[20px] ml-[60px] ">Rs.1,500.00</p>
        </div>
        <div>
          <button
            type="button"
            className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px]
             pb-[8px] pt-[6px] text-sm font-medium uppercase 
            text-white  shadow-md shadow-slate-900  bg-black"
          >
            Pay Now
          </button>
        </div>
      </div>
      ) : (
        <p></p>
      )}
    </div>

          
          <div className=" ml-[200px]">
            <p className="mt-[30px]  font-[700]">Full Payment</p>
            <p className="mt-[20px] ml-[60px] ">Rs.30,500.00</p>
          </div>
        </div>
        <div className="mt-[100px] ml-[80px] ">
          <img src={ims} alt="imagemm" className="h-[400px]  " />
        </div>
      </div>
    </div>
  );
}
