import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import t1 from "../images/canvas.png";

import Canvas from "../canvas";

import axios from "axios";

import { useSnapshot } from "valtio";
import state from "../store";

const customerId = sessionStorage.getItem('customer_id');

const OrderCard = ({id, status, color, material, logo, tags, ims ,style }) => {

  function handleClick() {
    sessionStorage.setItem('logo', logo)
    sessionStorage.setItem('tcolor', color)
  }

  const snap = useSnapshot(state);
  return (
    <div className={`m-4 mt-[20px] p-1 w-[1080px] h-[185px] bg-gray-100 shadow-lg rounded-md flex ${style}`}>
      <img src={ims} alt="imagemm" className="h-[125px] " />
      <div className="w-[140px] ml-[25px] mt-[40px]">
        <p className=" text-l font-normal ">{tags}</p>
      </div>
      <div>
        <p className="font-bold text-xl mt-[15px] ml-[400px] text-center">
          {status}
        </p>
        <Link to={`/customerorder-view-more/${id}/${status}/${encodeURIComponent(color)}/${material}`}>
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
      </div>
    </div>
  );
};

export default function CustomerOrders() {
    const snap = useSnapshot(state);

    state.page = 'no-canvas';

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/getCustomerOrders', {customerId}).then(res => {
            setOrders(res.data);
        })
    }, [])

    console.log(orders);

  return (
    <div className="font-sans min-h-screen">

      <div className="orders ml-[200px] mt-[10px]">
        <p className="font-semibold text-xl">ORDERS</p>
        <hr width="80%" />
        {orders.map(order => (
            <div className="cards mt-[40px]">
            <OrderCard id={order.tshirt_order_id} status={order.status} color={order.tcolor} material={order.tmaterial} logo={order.logo_file} tags={new Date(order.ordered_date_and_time).toLocaleString()} ims={t1} style="bg-[#D9D9D9]" />
            </div>
        ))}
      </div>
    </div>
  );
}