import Header from "../components/layout/header";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Cookies from 'js-cookie'; // Import js-cookie library

import Input from "../components/forms/Input";
import PasswordInput from "../components/forms/PasswordInput";
import FormLink from "../components/forms/FormLink";
import { useAuth } from '../pages/AuthContext';
import img1 from "../images/login.jpg";

const LOGIN_DATA = {
  email: "",
  password: ""      
};

function Login() {
  const navigate=useNavigate();
 
  const [loginForm, setLoginForm] = useState(LOGIN_DATA);
  const [loginError, setLoginError] = useState('');
  const { setIsLoggedIn, setUserName } = useAuth();
  const { email, password } = loginForm;

  const  handleOnChange=(e)=>{
    const {name,value}=e.target

    setLoginForm({...loginForm,[name]:value})

  } 

  const loginValidation=Yup.object({
    email: Yup.string().required("Email address is required").email("Email must be valid one"),
    password: Yup.string().required("Password is required")
  })

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', values);
    
      if (response.status === 200) {
        console.log(response.data.userName);
        // Login successful
        setUserName(response.data.userName);
        setIsLoggedIn(true);
        navigate(response.data.route);
        Cookies.set('isLoggedIn', true, { expires: 7 }); // Set the cookie to expire in 7 days
        Cookies.set('userName', response.data.userName, { expires: 7 }); // Set the cookie to expire in 7 days
  
      } else {
        // Handle other status codes or error messages as needed
      }
      console.log("Osho");
    } catch (error) {
      console.error('Error logging in:', error);
      console.log('Error message:', error.response.data.message); 
      setLoginError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Header>
      <div className="h-screen flex items-center justify-center">
        <div className="w-screen bg-white rounded-md shadow-md flex">
          {/* Left Part - Image */}
          <div className="w-1/2 overflow-hidden"  style={{ height: '100vh' }}>
            <img src={img1} alt="Image" className="w-full h-full object-cover " />
          </div>

          {/* Right Part - Login Form */}
          <div className="w-1/2 p-8 mt-11">
            <h2 className="text-3xl font-bold  pb-4 mt-4 ml-56">Log In</h2>
            {/* <h2 className="text-3xl font-semibold mb-4">Signup</h2>
      */}
            <Formik enableReinitialize initialValues={{email,password}} validationSchema={loginValidation} 
                  onSubmit={handleLoginSubmit}
            >
              {(formik) => (
                <Form className="flex flex-col gap-4 w-2/3 ml-20">
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handleOnChange}
                    className="w-1/2"
                  />

                  {/* <label className="text-gray-600 font-semibold">Email</label> */}
                  {/* <Field
                    type="text"
                    name="email"
                    placeholder="Enter your Email Address"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600" />
                  {emailError && <div className="text-red-600">{emailError}</div>} */}


                  <PasswordInput
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                    className="w-1/2"
                  />
                  {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
        
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mx-auto"
                    disabled={formik.isSubmitting}
                    style={{ width: "50%" }}
                  >
                    {formik.isSubmitting ? 'Logging In...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex flex-col gap-2 text-center my-4">
              <FormLink name="Forgot password?" path="/"/>
              <p className="text-sm">Don't have an account? <FormLink name="Sign up" path="/Signup" /> </p>
            </div>   
            
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Login;
