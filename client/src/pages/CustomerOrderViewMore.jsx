import circle from "../images/orders/circle1.png";
import tick from "../images/orders/tick2.png";
import ims from "../images/canvas.png";
import imX from "../images/orders/x.png";
import { useSnapshot } from "valtio";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import state from "../store";

import Canvas from "../canvas";

import axios from "axios";
import md5 from 'crypto-js/md5';

let merchantSecret  = 'MTc3OTc0OTA3MzQ3ODM2MTkyNjMzMTc0MjQzMTM4MzkyMzEzMg==';
let merchantId      = '1221976';
let orderId         = '';
let amount          = 1000;
let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
let currency        = 'LKR';
let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

export default function CustomerOrderViewMore() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

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

  const navigate = useNavigate();

  const { id, status, color, material } = useParams();

  const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/getCustomerOrderQuantities', {id}).then(res => {
          setQuantities(res.data);
        })
    }, [])

    function showPopup() {
      document.getElementById('popup').classList.remove('hidden');
    }

    function handleNo() {
      document.getElementById('popup').classList.add('hidden');
    }

    const handleYes = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8080/cancelOrder', {id}).then((res) => {
                if(res.data.Status === 'Success') {
                    navigate('/');
                } else {
                    alert('Error');
                }
            })
    };

  // const status = "Sample fee";
  return (
    <>
    {customerAuth && (
    <div>
      
      <div>
        <p className="text-[35px]  ml-[50px] mt-[120px] mb-[50px] uppercase">
          ORDER NO : {id}
        </p>
        <div className="status bar ml-[23%] h-[10px] w-[67%]  mt-[20px] flex ">
          {/* Using ternary operator for conditional rendering */}
          {status === "Pending" ? (
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
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                onClick={showPopup}
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Accepted" ? (
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
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                onClick={showPopup}
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Sample Processing" ? (
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
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                onClick={showPopup}
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Sample Ready" ? (
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
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
              <button
                onClick={showPopup}
                type="button"
                className="rounded   w-[120px] h-[35px] mt-[-83px] ml-[18px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
              >
                Cancel Order
              </button>
            </>
          ) : status === "Order Processing" ? (
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
                <div className="status bar h-[10px] w-[20.7%] bg-black  "></div>
                <img
                  src={circle}
                  alt="imagemm"
                  className="rounded-[50%] h-[440%] w-[3.2%] ml-[-2%] mr-[-2%] mt-[-18.6px] z-40 "
                />
              </div>
            </>
          ) : status === "Order Ready" ? (
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
          ) : status === "Completed" ? (
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
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center hidden" id="popup">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <p className="mb-4">Do you want to proceed?</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleYes}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleNo}
            >
              No
            </button>
          </div>
        </div>
      <div className="font-sans ml-[13%] h-[10px] w-[55%]  mt-[65px] flex ">
        <label className="text-l font-semibold  ml-[-6.5%] ">Pending</label>
        <label className="text-l font-semibold  ml-[14.2%] ">Accepted</label> {/*pay button */}
        <label className="text-l font-semibold  ml-[14.5%]">Sample Processing</label>
        <label className="text-l font-semibold  ml-[13.5%]">Sample Ready</label> {/*pay button */}
        <label className="text-l font-semibold  ml-[12%]">Order Processing</label>
        <label className="text-l font-semibold  ml-[12%]">Order Ready</label> {/*pay button */}
        <label className="text-l font-semibold  ml-[12%]">Completed</label>
      </div>
      {/* <div className="ml-[13%] h-[10px] w-[76%]  mt-[45px] flex  ">
        <label className="text-xl  ml-[-8.5%] w-[570px] ">(16-08-2023)</label>
        <label className="text-xl  ml-[8%] w-[570px]">(pending)</label>
        <label className="text-xl ml-[5%] w-[570px]">(pending)</label>
        <label className="text-xl ml-[6%] w-[570px]">(pending)</label>
        <label className="text-xl  ml-[4%] w-[570px]">(pending)</label>
        <label className="text-xl  ml-[8%] w-[570px]">(pending)</label>
      </div> */}
      <div className="flex">
        <div>
          <div className="flex mt-[20px]">
            {/* <div className="mt-[60px] ml-[200px]">
              <p className=" font-semibold">Contact Details</p>
              <p className="mt-[17px]  ">Hasitha Sawan Wijewardana</p>
              <p className="mt-[17px]  ">No:65,</p>
              <p className="mt-[3px]  ">Gunawardana Road,</p>
              <p className="mt-[3px]  ">Colombo 06.</p>
            </div> */}
            <div>
              <p className="mt-[60px] ml-[120px] font-semibold">Material</p>
              <p className="mt-[17px] ml-[120px] ">{material}</p>
            </div>
            <div>
              <p className="mt-[60px] ml-[120px] font-semibold">Color</p>
              <p className="mt-[17px] ml-[120px] ">{color}</p>
            </div>
            <div className="ml-[130px]">
              <p className="mt-[60px]  font-semibold">Quantities</p>
              {quantities.map(quantity => (
              <p className="mt-[17px]  ">{quantity.size} : {quantity.quantity}</p>
              ))}
            </div>
          </div>
          <hr class="border-2 ml-[200px] mt-[45px] w-[650px]" />

          <div>
      {status === "Accepted" ? (
        <div className="flex ml-[200px]">
        <div>
          <p className="mt-[60px]  font-[700]">Sample Fee</p>
          <p className="mt-[20px] ml-[60px] ">Rs.1,500.00</p>
        </div>
        <div>
        <Link to={`/payment-form/1500`}>
          <button
            type="button"
            className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px] mb-[25px]
             pb-[8px] pt-[6px] text-sm font-medium uppercase 
            text-white  shadow-md shadow-slate-900  bg-black"
          >
            Pay Now
          </button>
        </Link>
        {/* <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value="1221976"/>
          <input type="hidden" name="return_url" value="http://sample.com/return"/>
          <input type="hidden" name="cancel_url" value="http://sample.com/cancel"/>
          <input type="hidden" name="notify_url" value="http://sample.com/notify"/> 
          <input type="hidden" name="country" value="Sri Lanka"/>
          <input type="hidden" name="hash" value={hash}/> 
          <input type="submit" value="Buy Now" className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px] mb-[25px]
             pb-[8px] pt-[6px] text-sm font-medium uppercase 
            text-white  shadow-md shadow-slate-900  bg-black"/>
        </form> */}
        </div>
      </div>
      ) : status === "Sample Ready" ? (
        <div className="flex ml-[200px]">
        <div>
          <p className="mt-[60px]  font-[700]">Advance Fee</p>
          <p className="mt-[20px] ml-[60px] ">Rs.10,000.00</p>
        </div>
        <div>
          <button
            type="button"
            className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px] mb-[25px]
             pb-[8px] pt-[6px] text-sm font-medium uppercase 
            text-white  shadow-md shadow-slate-900  bg-black"
          >
            Pay Now
          </button>
        </div>
      </div>
      ) : status === "Order Ready" ? (
        <div className="flex ml-[200px]">
        <div>
          <p className="mt-[60px]  font-[700]">Complete Fee</p>
          <p className="mt-[20px] ml-[60px] ">Rs.20,000.00</p>
        </div>
        <div>
          <button
            type="button"
            className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px] mb-[25px]
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

          
          {/* <div className=" ml-[200px]">
            <p className="mt-[30px]  font-[700]">Full Payment</p>
            <p className="mt-[20px] ml-[60px] ">Rs.30,500.00</p>
          </div> */}
        </div>
        <div className="mt-[100px] ml-[80px] ">
          {/* <Canvas /> */}
          <Link to={`/customerorder-view-tshirt`}>
            <button
              type="button"
              className="rounded   w-[120px] h-[33px] mt-[97px] ml-[188px] mb-[25px]
              pb-[8px] pt-[6px] text-sm font-medium uppercase 
              text-white  shadow-md shadow-slate-900  bg-black"
            >
              View T-shirt
            </button>
          </Link>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
