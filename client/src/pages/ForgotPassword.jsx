import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Tlog from "../images/tlog2.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function validateEmail(email) {
    if (email === "") {
      setEmailError("Email is required");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
        axios
          .post("http://localhost:8080/forgot-password", { email })
          .then((res) => {
            if (res.data.Status === "Success") {
              setSuccessMessage("Verification code sent to your email.");
              setErrorMessage("");
              navigate(`/forgot-password-change/email=${email}`);
            } else if (res.data.Error === "User_Not_Found") {
              setErrorMessage("User with this email does not exist.");
              setSuccessMessage("");
            } else {
              setErrorMessage("Failed to send verification code.");
              setSuccessMessage("");
            }
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.Error === "User_Not_Found") {
              setErrorMessage("User with this email does not exist.");
              setSuccessMessage("");
            } else {
              console.error("Error sending request:", error);
              setErrorMessage("An error occurred. Please try again later.");
              setSuccessMessage("");
            }
          });
      }
      
  };

  return (
    <>
      <div className="login-page">
        <img src={Tlog} alt="imagemm" className="h-[730px] blur-[4px]" />
        <form
          className="login-form-container flex justify-center items-center w-[450px] h-[340px]"
          onSubmit={handleSubmit}
        >
          <div className="opacity-90">
            <h1>FORGOT PASSWORD</h1>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="login-form-error">{emailError}</span>
            <div className="forgot-password">
              <NavLink to="/login">Back to Login</NavLink>
            </div>
            <div>
              <button type="submit">Send Verification Code</button>
            </div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
