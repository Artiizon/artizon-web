import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import img1 from "../images/tshirt.jpg";
import Header from "../components/layout/header";

const SignupPage = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  

  const signupValidation = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    title: Yup.string().required("Title is required"),
    email: Yup.string().required("Email address is required").email("Email must be valid"),
    contactNumber: Yup.string().required("Contact number is required"),
    password: Yup.string()
       .required("Password is required")
       .min(8, "Password must be at least 8 characters long"), 
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  });

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to the backend API with the signup form data
      const response = await axios.post('http://localhost:3001/api/signup', values);
      console.log(response);
      // If the request is successful and the response contains the message "Email already registered"
       if (response.data.message === 'Email already registered') {
        // Set the error message in the state to display it in the UI
      } else {
        // If the response doesn't contain the "Email already registered" message,
        // it means the signup was successful. You can handle the successful signup flow here.
        navigate('/login');
      }
    
    
    
    } catch (error) {
      console.error('Error creating user:', error);
      console.log('Error message:', error.response.data.message); 
      setEmailError(error.response.data.message);
      // Handle any errors here (e.g., display an error message to the user)
    }finally {
        // Set submitting to false to re-enable the submit button after the request is complete
        setSubmitting(false);
      }
  };

  const titleOptions = ["Mr", "Mrs"];
  return (
    <Header>
      <div className="h-screen flex">
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <img src={img1} alt="Image" className="w-full h-full object-cover" />
      </div>
        <div className="flex-1 bg-white p-8">
          <h2 className="text-3xl font-semibold mb-4">Signup</h2>
          <p className="text-gray-600 mb-6">Please fill in your details</p>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              title: "",
              email: "",
              contactNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidation}
            onSubmit={handleSignupSubmit}
          >
            {(formik) => (
              <Form className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 font-semibold">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                    
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-600" />

                  <label className="text-gray-600 font-semibold">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-600" />

                  <label className="text-gray-600 font-semibold">Title</label>
                  <Field as="select" name="title"   className="border border-gray-300 p-2 rounded-md block mt-2 w-52" >
                    <option value="">Select Title</option>
                    {titleOptions.map((titleOption) => (
                      <option key={titleOption} value={titleOption}>
                        {titleOption}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="title" component="div" className="text-red-600" />

                  <label className="text-gray-600 font-semibold">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600" />
                  {emailError && <div className="text-red-600">{emailError}</div>}


                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white mt-5  p-3 rounded-lg  transition-all ease-in-out col-span-2"
                    onClick={formik.handleSubmit}
                  >
                    Create Account
                  </button>


                </div>
                <div>
                  
                  <label className="text-gray-600 font-semibold">Contact Number</label>
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-red-600" />

                  <label className="text-gray-600 font-semibold">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600" />

                  <label className="text-gray-600 font-semibold">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="border border-gray-300 p-2 rounded-md block mt-2"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />

                
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col gap-2 text-center my-6">
           
          </div>
        </div>
      </div>
    </Header>
  );
};

export default SignupPage;
