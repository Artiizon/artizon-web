import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import t1 from "../images/portPp/ot1.png";

import axios from "axios";

import { useSnapshot } from "valtio";
import state from "../store";

const OrderCard = ({ status, tags, ims ,style }) => {
  return (
    <div className={`m-4 mt-[20px] p-1 w-[920px] h-[135px] bg-gray-100 shadow-lg rounded-md flex  ${style}`}>
      <img src={ims} alt="imagemm" className="h-[125px] " />
      <div className="w-[140px] ml-[25px] mt-[40px]">
        <p className=" text-xl font-normal ">{tags}</p>
      </div>
      <div>
        <p className="font-bold text-xl mt-[15px] ml-[480px] text-center">
          {status}
        </p>
        <NavLink to="/customerOrderDetailsF">
          <button
            type="button"
            className="rounded   w-[120px] h-[35px] mt-[20px] ml-[480px]
                 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-md shadow-slate-900  bg-black"
          >
            Order details
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default function CustomerOrders() {
    const snap = useSnapshot(state);

    state.page = 'no-canvas';

    const [orders, setOrders] = useState([]);

    const customerId = sessionStorage.getItem('customer_id');

    useEffect(() => {
        axios.post('http://localhost:8080/getCustomerOrders', {customerId}).then(res => {
            setOrders(res.data);
        })
    }, [])

    console.log(orders);

  return (
    <div className="font-sans">

      <div className="orders ml-[200px] mt-[10px]">
        <p className="font-semibold text-xl">ORDERS</p>
        <hr width="80%" />
        {orders.map(order => (
            <div className="cards mt-[40px]">
            <OrderCard status={order.status} tags={new Date(order.ordered_date_and_time).toLocaleString()} ims={t1} style="bg-[#D9D9D9]" />
            </div>
        ))}
      </div>
    </div>
  );
}