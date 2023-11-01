import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import t1 from "../images/canvas.png";
import FeedbackModal from "../components/popups/Feedback"
import { useParams } from "react-router-dom";

import Canvas from "../canvas";

import axios from "axios";

import { useSnapshot } from "valtio";
import state from "../store";

const OrderCard = ({id, status, color, material, logo, text, textColor, tstyle, tags, ims, customerId ,style }) => {

  function handleClick() {
    sessionStorage.setItem('logo', logo);
    sessionStorage.setItem('tcolor', color.slice(0,7));
    sessionStorage.setItem('text', text);
    sessionStorage.setItem('textcolor', textColor);
    sessionStorage.setItem('tstyle', tstyle);
    if (text == '') {
      sessionStorage.setItem('text', ' ');
    }
    if (logo == '') {
      state.isLogoTexture = false;
    }
    else {
      state.isLogoTexture = true;
    }
  }

  const snap = useSnapshot(state);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };


  return (
    <div className={`m-4 mt-[20px] p-1 w-[1080px] h-[185px] bg-gray-100 shadow-lg rounded-md flex ${style}`}>
      <img src={ims} alt="imagemm" className="h-[125px] mt-[20px]" />
      <div className="w-[360px] ml-[25px] mt-[40px]">
        <p className=" text-l font-normal font-black">Ordered On:</p>
        <p className=" text-l font-normal ">{tags}</p>
      </div>
      <div>
        {/* <p className="font-bold text-xl mt-[15px] ml-[400px] text-center">
          {status}
        </p> */}
        <Link to={`/customerorder-view-more/${id}/${status}/${encodeURIComponent(color)}/${material}/${customerId}`}>
          <button
            onClick={handleClick}
            type="button"
            className="rounded   w-[120px] h-[35px] mt-[20px] ml-[480px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
          >
            Order details
          </button>
        </Link>
        <Link to={`/customerorder-view-tshirt`}>
          <button
          onClick={handleClick}
            type="button"
            className="rounded   w-[120px] h-[35px] mt-[20px] ml-[480px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
          >
            View T-Shirt
          </button>
        </Link>

        <div>
      {/* {status === "Completed" && (
        <button
          onClick={openModal}
          type="button"
          className="rounded w-[120px] h-[35px] mt-[20px] ml-[480px] pb-[8px] pt-[6px] text-sm font-medium uppercase text-white shadow-md shadow-slate-900 bg-black"
        >
          Leave Feedback
        </button>
      )} */}

      
    </div>
      </div>

      {/* {isModalOpen && (
        <FeedbackModal isOpen={isModalOpen} onClose={closeModal} id={id}/>
      )} */}
    </div>
  );
};

export default function CustomerOrders() {
    const snap = useSnapshot(state);

    state.page = 'no-canvas';

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

    const [orders, setOrders] = useState([]);
    const { customerId } = useParams();

    useEffect(() => {
        axios.post('http://localhost:8080/getCustomerOrders', {customerId}).then(res => {
            setOrders(res.data);
        })
    }, [])

    if (!orders) {
      return (
        <p>Loading...</p>
      );
    }

  return (
    <>
    {customerAuth && (
    <div className="font-sans min-h-screen">

      <div className="orders ml-[200px] mt-[10px]">
        <p className="font-semibold text-xl">ORDERS</p>
        <hr width="80%" />
        {orders.map(order => (
            <div className="cards mt-[40px]">
            <OrderCard id={order.tshirt_order_id} status={order.status} color={order.tcolor} material={order.tmaterial} logo={order.logo_file} text={order.text} textColor={order.text_color} tstyle={order.tstyle} tags={new Date(order.ordered_date_and_time).toLocaleString()} ims={t1} customerId={customerId} style="bg-[#D9D9D9]" />
            </div>
        ))}
      </div>
    </div>
    )}
    </>
  );
}