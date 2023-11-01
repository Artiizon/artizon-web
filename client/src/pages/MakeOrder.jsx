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

  let tcolor;

  if (sessionStorage.getItem("tcolor")) {
    const checkColor = sessionStorage.getItem("tcolor");
    tcolor = checkColor;
    // #666666-LIGHT-BLACK
    // #000000-BLACK
    // #FFFFFF-WHITE
    // #FF0000-RED
    // #FF6666-LIGHT-RED
    // #008000-GREEN
    // #66ff66-LIGHT-GREEN
    // #0000FF-BLUE
    // #6666FF-LIGHT-BLUE
    // #FFFF00-YELLOW
    // #FFFF66-LIGHT-YELLOW 

    // #8B0000-DARK-RED
    // #013220-DARK-GREEN
    // #00008B-DARK-BLUES

    switch (checkColor.toLowerCase()) {
      case '#666666':
        tcolor = '#666666-LIGHT-BLACK';
        break;
      case '#000000':
        tcolor = '#000000-BLACK';
        break;
      case '#ffffff':
        tcolor = '#FFFFFF-WHITE';
        break;
      case '#ff0000':
        tcolor = '#FF0000-RED';
        break;
      case '#ff6666':
        tcolor = '#FF6666-LIGHT-RED';
        break;
      case '#008000':
        tcolor = '#008000-GREEN';
        break;
      case '#66ff66':
        tcolor = '#66ff66-LIGHT-GREEN';
        break;
      case '#0000ff':
        tcolor = '#0000FF-BLUE';
        break;
      case '#6666ff':
        tcolor = '#6666FF-LIGHT-BLUE';
        break;
      case '#ffff00':
        tcolor = '#FFFF00-YELLOW';
        break;
      case '#ffff66':
        tcolor = '#FFFF66-LIGHT-YELLOW';
        break;
      case '#8b0000':
        tcolor = '#8B0000-DARK-RED';
        break;
      case '#013220':
        tcolor = '#013220-DARK-GREEN';
        break;
      case '#00008b':
        tcolor = '#00008B-DARK-BLUES';
        break;
    }
    

    state.tcolor = tcolor;
  }
  if (sessionStorage.getItem("logo")) {
    const file = sessionStorage.getItem("logo");
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

  const [materialError, setMaterialError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  function validateMaterial(material) {
    if (material === "") {
      setMaterialError("Material required");
      return false;
    }
    else {
      setMaterialError("");
      return true;
    }
  }

  function validateQuantity() {
    var count = 0;
    for (let i = 0; i < quantities.length; i++) {
      count += quantities[i];
      if (quantities[i] < 0) {
        setQuantityError("Quantity must be a positive number");
        return false;
      }
    }
    if (count === 0) {
      setQuantityError("Quantity required");
      return false;
    }
    else {
      setQuantityError("");
      return true;
    }
  }

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
    let logo = "";
    if(state.isLogoTexture){
      logo = state.logoDecal;
    }else {
      logo = "";
    }
    const text = state.text;
    const textColor = state.textColor;
    const tstyle = state.tstyle;

    const customerId = sessionStorage.getItem("customer_id");

    const isValidMaterial = validateMaterial(material);
    const isValidateQuantity = validateQuantity();

    if (isValidMaterial && isValidateQuantity) {
      axios
        .post("http://localhost:8080/makeOrder", {
          material,
          color,
          note,
          logo,
          text,
          textColor,
          tstyle,
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
    }
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
              <span className="signup-form-error text-[12px] text-red-500">{materialError}</span>
              <div className="mb-[10px] mt-[10px]">
                <label
                  htmlFor="tcolor"
                  className="font-[700] text-[20px] mb-[15px]"
                >
                  T-Shirt Color
                </label>{" "}
                <br />
                <p className="mt-[5px] font-semibold">{tcolor}</p>
              </div>
              <div>
                <label htmlFor="quantities" className="font-[700] text-[20px] ">
                  Quantity
                </label>{" "}
                <br />
                <span className="signup-form-error text-[12px] text-red-500">{quantityError}</span>
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
