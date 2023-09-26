import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tlog from "../images/tlog2.png";
import { useParams } from 'react-router-dom';



const PasswordChange = () => {
  const navigate = useNavigate();
  const { email: emailParam } = useParams();
  const email = emailParam.replace('email=', ''); // Remove the "email=" prefix
  console.log(email);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that the verification code, newPassword, and retypePassword fields are not empty.
    if (!verificationCode || !newPassword || !retypePassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Check that newPassword and retypePassword match.
    if (newPassword !== retypePassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Send a request to the server to check the verification code and update the password.
      const response = await axios.post("http://localhost:8080/change-password-forgot", {
        verificationCode,
        newPassword,
        email
      });

      if (response.data.Status === "Success") {
        // Password changed successfully, redirect to the login page.
        navigate("/login");
      } else {
        setErrorMessage("Failed to change the password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <img src={Tlog} alt="imagemm" className="h-[730px] blur-[4px]" />
      <h1>Password Change</h1>
      <form
       className="login-form-container flex justify-center items-center w-[450px] h-[340px]"
       onSubmit={handleSubmit}>

            <div className="opacity-90">
            <h1>CHANGE PASSWORD</h1>
        <div>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
