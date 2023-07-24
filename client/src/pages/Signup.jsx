import StandardLayout from "../components/layout/StandardLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 

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
    <StandardLayout>
   
    <div className="h-screen px-[200px]">
      <div className="flex items-center justify-center pt-3">
        <div className="w-[400px]">
          <p className="font-bold text-4xl pb-2">Signup</p>
          <p className="pb-3">Please fill in your details</p>

          <Formik
            initialValues={signupForm}
            validationSchema={signupValidation}
            onSubmit={handleSignupSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col gap-2">
                
                <label className="text-gray-600 text-sm font-semibold">first name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border rounded-md p-2"
                 />
                <ErrorMessage name="firstName" component="div" className="text-red-600" />

                <label className="text-gray-600 text-sm font-semibold">last name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600" />

                <label className="text-gray-600 text-sm font-semibold">title</label>
                <Field as="select" name="title" className="border rounded-md p-2" >
                    <option value="">Select Title</option>
                    {titleOptions.map((titleOption) => (
                      <option key={titleOption} value={titleOption}>
                        {titleOption}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="title" component="div" className="text-red-600" />
           
                <label className="text-gray-600 text-sm font-semibold">email</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="email" component="div"  className="text-red-600" />
                {emailError && <div className="text-red-600">{emailError}</div>}
           
                <label className="text-gray-600 text-sm font-semibold">contact number</label>
                <Field
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="contactNumber" component="div" className="text-red-600" />

                <label className="text-gray-600 text-sm font-semibold">password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />

                <label className="text-gray-600 text-sm font-semibold">confirm password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border rounded-md p-2"
         
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />

                <button
                  type="submit"
                  className="bg-gray-800 text-gray-200 p-3 rounded-lg hover:bg-gray-700 transition-all ease-in-out"
                  onClick={formik.handleSubmit}
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col gap-2 text-center my-6">
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
    </div>
    </StandardLayout>
  );
};

export default SignupPage;
