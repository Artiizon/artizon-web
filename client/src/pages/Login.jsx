import { useSnapshot } from "valtio";
import { useState } from "react";
import axios from "axios";

import state from "../store";

import { useNavigate, NavLink } from "react-router-dom";

import Tlog from "../images/tlog2.png";
import Footer from "../components/footer/Footer";

const Login = () => {
  const snap = useSnapshot(state);

  state.page = "no-canvas";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateEmail(email) {
    if (email === "") {
      setEmailError("Email required");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  function validatePassword(password) {
    if (password === "") {
      setPasswordError("Password required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

        if(isValidEmail && isValidPassword) {

            axios.post('http://localhost:8080/login', {email, password}).then(res => {
                if(res.data.Status === 'Success_Login_Customer') {
                    navigate('/');
                    location.reload(true);
                    // alert('Login Successful');
                }else if(res.data.Status === 'Success_Login_Designer') {
                    navigate('/designer-dash');
                    location.reload(true);
                   // alert('Login Successful');
                }else if(res.data.Status === 'Success_Login_Stylist') {
                    navigate('/stylist-dash');
                    location.reload(true);
                    //alert('Login Successful');
                }else if(res.data.Status === 'Success_Login_Manager') {
                    navigate('/textileProManagerdashboard');
                    location.reload(true);
                    
                    //alert('Login Successful');
                }else if(res.data.Status === 'Success_Login_Admin') {
                    navigate('/usermanage');
                    location.reload(true);
                    //alert('Login Successful');
                } else if(res.data.Error === 'Error_No_User') {
                    setEmailError('Email or password incorrect');
                    setPasswordError('Email or password incorrect');
                } else if(res.data.Error === 'Error_Wrong_Password') {
                    setEmailError('Email or password incorrect');
                    setPasswordError('Email or password incorrect');
                } else {
                    alert('Login Failed');
                }
            });
        }
    }
  };

  return (
    <>
      <div className="login-page">
        <img src={Tlog} alt="imagemm" className=" h-[730px] blur-[4px]" />
        <form
          className="login-form-container flex justify-center items-center w-[400px] h-[340px]"
          onSubmit={handleSubmit}
        >
          <div className="opacity-90">
            <h1>LOG IN</h1>
            <p className="mb-[7px]">
              New user?{" "}
              <NavLink className="signup-link" to="/signup">
                Signup
              </NavLink>{" "}
              now.
            </p>
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
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="login-form-error">{passwordError}</span>
            <div>
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );


export default Login;
