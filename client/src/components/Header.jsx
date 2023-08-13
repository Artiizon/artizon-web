import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSnapshot } from "valtio";

import state from "../store";

const Header = () => {
  const snap = useSnapshot(state);

  const navigate = useNavigate();

  const [customerAuth, setCustomerAuth] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerTitle, setCustomerTitle] = useState("");
  const [customerName, setCustomerName] = useState("");

  axios.defaults.withCredentials = true;

  // Autherize Customer
  useEffect(() => {
    axios.get("http://localhost:8080/verifyCustomer").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setCustomerAuth(true);
        setCustomerEmail(res.data.email);
      } else {
        setCustomerAuth(false);
      }
    });
  }, []);

  // Get Customer details
  if (customerAuth) {
    axios
      .post("http://localhost:8080/getCustomer", { customerEmail })
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("customer_id", res.data.customer_id);
          sessionStorage.setItem("customer_title", res.data.customer_title);
          sessionStorage.setItem("customer_name", res.data.customer_name);

          setCustomerTitle(res.data.customer_title);
          setCustomerName(res.data.customer_name);
        }
      });
  } else {
    sessionStorage.removeItem("customer_id");
    sessionStorage.removeItem("customer_title");
    sessionStorage.removeItem("customer_name");
  }

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => {
        location.reload(true);
        alert("Log out successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className=" top-0 left-0 right-0  bg-black text-white flex justify-between items-center shadow-md border-none">
      <button
        onClick={() => {
          state.page = "home";
          navigate("/");
        }}
      >
        <p data-text="arTizon" className="example-one">
          ar<span>T</span>izon
        </p>
      </button>
      <div className="flex flex-row border-none gap-[45px] ml-[170px] ">
        <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
          <NavLink to="/customizor">CUSTOMIZOR</NavLink>
        </p>
        <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
          <NavLink to="/company-design">DESIGNS</NavLink>
        </p>
        <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
          <NavLink to="/customerPortfolia">ORDERS</NavLink>
        </p>
        <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
          <NavLink to="/about">ABOUT</NavLink>
        </p>
      </div>
      <div className="w-[300px] justify-end">
      {customerAuth && (
        <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
          <NavLink to="/profile">
            {customerTitle} {customerName}
          </NavLink>
        </p>
      )}
      {customerAuth && (
        <p
          className="header-item text-white hover:text-gray-300 transition-colors duration-300 "
          onClick={handleLogout}
        >
          LOGOUT
        </p>
      )}
      {!customerAuth && (
        <p className="header-item">
          <NavLink to="/login">LOGIN</NavLink>
        </p>
      )}
</div>
      {/* <div>
            <span></span>
            <span></span>
            <div className="inner-circle"></div>
        </div> */}
    </header>
  );
};

export default Header;
