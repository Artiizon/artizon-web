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

  const [designerAuth, setDesignerAuth] = useState(false);
  const [designerEmail, setDesignerEmail] = useState("");
  const [designerTitle, setDesignerTitle] = useState("");
  const [designerName, setDesignerName] = useState("");

  const [stylistAuth, setStylistAuth] = useState(false);
  const [stylistEmail, setStylistEmail] = useState("");
  const [stylistTitle, setStylistTitle] = useState("");
  const [stylistName, setStylistName] = useState("");

  const [managerAuth, setManagerAuth] = useState(false);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerTitle, setManagerTitle] = useState("");
  const [managerName, setManagerName] = useState("");

  const [adminAuth, setAdminAuth] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminTitle, setAdminTitle] = useState("");
  const [adminName, setAdminName] = useState("");

  axios.defaults.withCredentials = true;

  // Authorize Customer
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

  // Authorize Designer
  useEffect(() => {
    axios.get("http://localhost:8080/verifyDesigner").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setDesignerAuth(true);
        setDesignerEmail(res.data.email);
      } else {
        setDesignerAuth(false);
      }
    });
  }, []);

  // Get Designer details
  if (designerAuth) {
    axios
      .post("http://localhost:8080/getDesigner", { designerEmail })
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("designer_id", res.data.designer_id);
          sessionStorage.setItem("designer_title", res.data.designer_title);
          sessionStorage.setItem("designer_name", res.data.designer_name);

          setDesignerTitle(res.data.designer_title);
          setDesignerName(res.data.designer_name);
        }
      });
  } else {
    sessionStorage.removeItem("designer_id");
    sessionStorage.removeItem("designer_title");
    sessionStorage.removeItem("designer_name");
  }

  // Authorize Stylist
  useEffect(() => {
    axios.get("http://localhost:8080/verifyStylist").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setStylistAuth(true);
        setStylistEmail(res.data.email);
      } else {
        setStylistAuth(false);
      }
    });
  }, []);

  // Get Stylist details
  if (stylistAuth) {
    axios
      .post("http://localhost:8080/getStylist", { stylistEmail })
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("stylist_id", res.data.stylist_id);
          sessionStorage.setItem("stylist_title", res.data.stylist_title);
          sessionStorage.setItem("stylist_name", res.data.stylist_name);

          setStylistTitle(res.data.stylist_title);
          setStylistName(res.data.stylist_name);
        }
      });
  } else {
    sessionStorage.removeItem("stylist_id");
    sessionStorage.removeItem("stylist_title");
    sessionStorage.removeItem("stylist_name");
  }

  // Authorize Manager
  useEffect(() => {
    axios.get("http://localhost:8080/verifyManager").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setManagerAuth(true);
        setManagerEmail(res.data.email);
      } else {
        setManagerAuth(false);
      }
    });
  }, []);

  // Get Manager details
  if (managerAuth) {
    axios
      .post("http://localhost:8080/getManager", { managerEmail })
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("manager_id", res.data.manager_id);
          sessionStorage.setItem("manager_title", res.data.manager_title);
          sessionStorage.setItem("manager_name", res.data.manager_name);

          setManagerTitle(res.data.manager_title);
          setManagerName(res.data.manager_name);
          console.log("GG");
        }
      });
  } else {
    sessionStorage.removeItem("manager_id");
    sessionStorage.removeItem("manager_title");
    sessionStorage.removeItem("manager_name");
  }

  // Authorize Admin
  useEffect(() => {
    axios.get("http://localhost:8080/verifyAdmin").then((res) => {
      if (res.data.Status === "Success_Authentication") {
        setAdminAuth(true);
        setAdminEmail(res.data.email);
      } else {
        setAdminAuth(false);
      }
    });
  }, []);

  // Get Admin details
  if (adminAuth) {
    axios.post("http://localhost:8080/getAdmin", { adminEmail }).then((res) => {
      if (res.data.Status === "Success") {
        sessionStorage.setItem("admin_id", res.data.admin_id);
        sessionStorage.setItem("admin_title", res.data.admin_title);
        sessionStorage.setItem("admin_name", res.data.admin_name);

        setAdminTitle(res.data.admin_title);
        setAdminName(res.data.admin_name);
      }
    });
  } else {
    sessionStorage.removeItem("admin_id");
    sessionStorage.removeItem("admin_title");
    sessionStorage.removeItem("admin_name");
  }

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => {
        navigate("/");
        location.reload(true);
        // alert("Log out successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className=" top-0 left-0 right-0  bg-[#161616] text-white flex justify-between items-center shadow-md border-none">
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
        {!(adminAuth || designerAuth || stylistAuth || managerAuth) && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/customizor">CUSTOMIZOR</NavLink>
          </p>
        )}
        {!(adminAuth || designerAuth || stylistAuth || managerAuth) && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/company-design">DESIGNS</NavLink>
          </p>
        )}

        {customerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/customerOrders">ORDERS</NavLink>
          </p>
        )}
        <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
          <NavLink to="/about">ABOUT</NavLink>
        </p>

        {!(
          customerAuth ||
          adminAuth ||
          designerAuth ||
          stylistAuth ||
          managerAuth
        ) && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/about">ABOUT</NavLink>
          </p>
        )}
        {customerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/about">ABOUT</NavLink>
          </p>
        )}

        {designerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/designer-dash">DASHBOARD</NavLink>
          </p>
        )}

        {stylistAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/stylist-dash">DASHBOARD</NavLink>
          </p>
        )}

        {managerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/textileProManagerdashboard">DASHBOARD</NavLink>
          </p>
        )}

        {adminAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/usermanage">DASHBOARD</NavLink>
          </p>
        )}

        {managerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/stock">Stocks</NavLink>
          </p>
        )}

        {managerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/tpm_review_orders">Review Orders</NavLink>
          </p>
        )}

        {managerAuth && (
          <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
            <NavLink to="/item">Item</NavLink>
          </p>
        )}

        {/* {managerAuth &&(
            <p className="header-item text-white hover:text-gray-300 transition-colors duration-300">
              <NavLink to="/price">Price</NavLink>
            </p>
       )}   */}
      </div>

      <div className="w-[300px] justify-end">
        {customerAuth && (
          <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
            <NavLink to="/profile">
              {customerTitle.toUpperCase()} {customerName.toUpperCase()}
            </NavLink>
          </p>
        )}
        {designerAuth && (
          <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
            <NavLink to="/profile">
              {designerTitle.toUpperCase()}. {designerName.toUpperCase()}
            </NavLink>
          </p>
        )}
        {stylistAuth && (
          <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
            <NavLink to="/profile">
              {stylistTitle.toUpperCase()}. {stylistName.toUpperCase()}
            </NavLink>
          </p>
        )}
        {managerAuth && (
          <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
            <NavLink to="/profile">
              {managerTitle.toUpperCase()}. {managerName.toUpperCase()}
            </NavLink>
          </p>
        )}
        {adminAuth && (
          <p className="header-item text-[#e64444] hover:text-gray-300 transition-colors duration-300 mr-[20px] font-[700]">
            <NavLink to="/profile">
              {adminTitle.toUpperCase()}. {adminName.toUpperCase()}
            </NavLink>
          </p>
        )}
        {(customerAuth ||
          adminAuth ||
          designerAuth ||
          stylistAuth ||
          managerAuth) && (
          <p className="header-item" onClick={handleLogout}>
            LOGOUT
          </p>
        )}
        {!(
          customerAuth ||
          adminAuth ||
          designerAuth ||
          stylistAuth ||
          managerAuth
        ) && (
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
