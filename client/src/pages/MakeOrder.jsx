import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import axios from "axios";

import LoginError from "./LoginError";

import state from "../store";

import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

import Schart from "../images/Schart.png";

const MakeOrder = () => {
  const navigate = useNavigate();

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

  const snap = useSnapshot(state);

  state.page = "no-canvas";

  if (sessionStorage.getItem("tcolor")) {
    const tcolor = sessionStorage.getItem("tcolor");
    state.tcolor = tcolor;
  }
  if (sessionStorage.getItem("file")) {
    const file = sessionStorage.getItem("file");
    state.logoDecal = file;
  }

  const [material, setMaterial] = useState("");
  const [note, setNote] = useState("");
  const [days, setDays] = useState(0);
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0]);
  const [sizes, setSizes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleSizes = (e) => {
    const index = e.target.id;
    const value = e.target.checked;
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const handleQuantities = (e) => {
    const index = e.target.id;
    const value = e.target.value;
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const color = state.tcolor;
    const logo = state.logoDecal;

    const customerId = sessionStorage.getItem("customer_id");

    axios
      .post("http://localhost:8080/makeOrder", {
        material,
        color,
        note,
        logo,
        days,
        customerId,
        quantities,
      })
      .then((res) => {
        if (res.data.Status === "Success_Makeorder") {
          navigate("/");
          alert("Order Sent Successful");
        } else {
          alert("Order Sent Failed");
        }
      });
  };

  return (
    <>
      {customerAuth && (
        <div className="make-order-page font-sans min-h-[575.5px]">
          <div className="make-order-page-left flex">
            <form onSubmit={handleSubmit}>
              <h1 className="font-[900]">Make Your T-Shirt Order</h1>
              <div className="font-[800px]">
                <div className="mb-[10px]">
                  <label
                    htmlFor="material font-semibold"
                    className="font-[700] text-[20px] mb-[10px] "
                  >
                    T-Shirt Material
                  </label>{" "}
                  <br />
                </div>
                <select
                  name="material"
                  className="form-control"
                  onChange={(e) => setMaterial(e.target.value)}
                >
                  <option value="">Select Material</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Silk">Silk</option>
                  <option value="Linen">Linen</option>
                </select>
              </div>
              <div className="mb-[10px] mt-[10px]">
                <label
                  htmlFor="tcolor"
                  className="font-[700] text-[20px] mb-[15px]"
                >
                  T-Shirt Color
                </label>{" "}
                <br />
                <p className="mt-[5px] font-semibold">{state.tcolor}</p>
              </div>
              <div>
                <label htmlFor="quantities" className="font-[700] text-[20px] ">
                  Quantities
                </label>{" "}
                <br />
                <div className="quantity-item mt-[10px]">
                  <label htmlFor="XS" className="font-[700]">
                    XS
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="0"
                    checked={sizes[0]}
                    onChange={handleSizes}
                  />
                  {sizes[0] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="XS"
                      placeholder="Quantity"
                      id="0"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
                <div className="quantity-item">
                  <label htmlFor="S" className="font-[700]">
                    S
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="1"
                    checked={sizes[1]}
                    onChange={handleSizes}
                  />
                  {sizes[1] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="S"
                      placeholder="Quantity"
                      id="1"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
                <div className="quantity-item">
                  <label htmlFor="M" className="font-[700]">
                    M
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="2"
                    checked={sizes[2]}
                    onChange={handleSizes}
                  />
                  {sizes[2] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="M"
                      placeholder="Quantity"
                      id="2"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
                <div className="quantity-item">
                  <label htmlFor="L" className="font-[700]">
                    L
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="3"
                    checked={sizes[3]}
                    onChange={handleSizes}
                  />
                  {sizes[3] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="L"
                      placeholder="Quantity"
                      id="3"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
                <div className="quantity-item">
                  <label htmlFor="XL" className="font-[700]">
                    XL
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="4"
                    checked={sizes[4]}
                    onChange={handleSizes}
                  />
                  {sizes[4] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="XL"
                      placeholder="Quantity"
                      id="4"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
                <div className="quantity-item">
                  <label htmlFor="XXL" className="font-[700]">
                    XXL
                  </label>
                  <input
                    type="checkbox"
                    className="check"
                    id="5"
                    checked={sizes[5]}
                    onChange={handleSizes}
                  />
                  {sizes[5] && (
                    <input
                      className="input-text text-center font-[600]"
                      type="number"
                      name="XXL"
                      placeholder="Quantity"
                      id="5"
                      onChange={handleQuantities}
                    />
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="days">Expected Days</label> <br />
                <input
                  className="text-area"
                  type="number"
                  name="days"
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="additional_note">Additional Note</label> <br />
                <input
                  className="text-area"
                  type="text"
                  name="additional_note"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <button className="">Submit</button>
            </form>
            <img
              src={Schart}
              alt="imagemm"
              className=" h-[250px] mt-[250px] ml-[-120px]"
            />
          </div>
          <div className="make-order-page-right mt-[200px] w-[600px] h-[230px] shadow-sm p-[15px] shadow-red-600 ml-[-50px]">
            <p className="font-[700] text-[20px] mb-[10px] text-[#d13737]">
              Our Procedure
            </p>
            <p className="font-[700] text-[15px] mb-[10px]">
              1. Your order will be responded within 3 days whether it matches
              our company policies.
            </p>
            <p className="font-[700] text-[15px] mb-[10px]">
              2. If the order get accepted you can pay for a sample product.
              Your sample will be ready within 7 days after payment.
            </p>
            <p className="font-[700] text-[15px] mb-[10px]">
              3. If you are satisfied with the sample product, you can pay an
              advance of 50% of total price. Your order will be completed within
              minimum 14 days after that.
            </p>
          </div>
        </div>
      )}
      {!customerAuth && <LoginError />}
    </>
  );
};

export default MakeOrder;
