import Header from "../components/layout/header";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

import Input from "../components/forms/Input";
import PasswordInput from "../components/forms/PasswordInput";
import FormLink from "../components/forms/FormLink";

import img1 from "../images/tshirt.jpg";

const LOGIN_DATA = {
  email: "",
  password: ""      
};

function Login() {
  const navigate=useNavigate();
 
  const [loginForm, setLoginForm] = useState(LOGIN_DATA);
  const [loginError, setLoginError] = useState('');

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
        // Login successful
        navigate(response.data.route);
      } else {
        // Handle other status codes or error messages as needed
      }
      
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
      <div className="h-screen  flex items-center justify-center">
        <div className="w-[900px] p-8 bg-white rounded-md shadow-md flex">
          {/* Left Part - Image */}
          <div className="flex-1 bg-gray-300">
            <img src={img1} alt="Image" className="w-full h-full object-cover" />
          </div>

          {/* Right Part - Login Form */}
          <div className="flex-1 p-8">
            <p className="text-2xl font-bold text-center pb-4">Log In</p>
            <Formik enableReinitialize initialValues={{email,password}} validationSchema={loginValidation} 
                  onSubmit={handleLoginSubmit}
            >
              {(formik) => (
                <Form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handleOnChange} 
                  />

                  <PasswordInput
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleOnChange} 
                  />
                  {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
        
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Logging In...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex flex-col gap-2 text-center my-4">
              <FormLink name="Forgot password?" path="/"/>
              <p className="text-sm">Don't have an account? <FormLink name="Create account" path="/Signup" /> </p>
            </div>   
            
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Login;
