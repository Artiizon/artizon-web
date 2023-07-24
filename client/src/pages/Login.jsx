import StandardLayout from "../components/layout/StandardLayout";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

import Input from "../components/forms/Input";
import PasswordInput from "../components/forms/PasswordInput";
import FormLink from "../components/forms/FormLink";

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

  // const loginSubmit=()=>{
  //   navigate("/")
  // }

const loginValidation=Yup.object({
   email:Yup.string().required("Email adress is required").email("Email must be valid one"),
   password:Yup.string().required("Password is required")
})


// Assuming you have the login function that sends the login data to the backend API
const handleLoginSubmit = async (values, { setSubmitting }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/login', values);
    console.log(response.data);
    
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

// ...



  return (
    <StandardLayout>
      <div className="h-screen px-[200px]">
        <div className="flex items-center justify-center pt-3">
          <div className="w-[400px]">
            <p className="font-bold text-4xl pb-2">Log In</p>
            <p className="pb-3">Please enter your credentials</p>

            <Formik enableReinitialize initialValues={{email,password}} validationSchema={loginValidation} 
                  onSubmit={handleLoginSubmit}
            >
              {(formik) => (
                <Form className="flex flex-col gap-2">
                  <Input
                    key="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handleOnChange} 
                  />

                  <PasswordInput
                    key="password"
                   // type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleOnChange} 
                
                  />
                 {loginError && <div className="text-red-600">{loginError}</div>}
           
                  
                 <button type="submit" className="bg-gray-800 text-gray-200 p-3 rounded-lg hover:bg-gray-700 transition-all ease-in-out ">Login</button>


                </Form>
              )}
            </Formik>
            <div className="flex flex-col gap-2 text-center my-6">
                <FormLink name="Forgot password?" path="/"/>
                <p className="text-sm">Don't have an account? <FormLink name="Create account" path="/Signup" /> </p>
            </div>   


          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export default Login;
