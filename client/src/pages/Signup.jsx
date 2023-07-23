import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 

const SignupPage = () => {
  const navigate = useNavigate();

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
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  });

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to the backend API with the signup form data
      await axios.post('http://localhost:3001/api/signup', values);
      // If the request is successful, navigate the user to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle any errors here (e.g., display an error message to the user)
    }finally {
        // Set submitting to false to re-enable the submit button after the request is complete
        setSubmitting(false);
      }
  };

  const titleOptions = ["Mr", "Mrs"];

  return (
    <div className="h-screen px-[200px]">
      <div className="flex items-center justify-center pt-3">
        <div className="w-[400px]">
          <p className="font-bold text-4xl pb-2">Create Account</p>
          <p className="pb-3">Please fill in your details</p>

          <Formik
            initialValues={signupForm}
            validationSchema={signupValidation}
            onSubmit={handleSignupSubmit}
          >
            {(formik) => (
              <Form className="flex flex-col gap-2">
                
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border rounded-md p-2"
                 />
                <ErrorMessage name="firstName" component="div" className="text-red-600" />

                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600" />

                <Field as="select" name="title" className="border rounded-md p-2" >
                    <option value="">Select Title</option>
                    {titleOptions.map((titleOption) => (
                      <option key={titleOption} value={titleOption}>
                        {titleOption}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="title" component="div" className="text-red-600" />
           
                <Field
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />

                <Field
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="contactNumber" component="div" className="text-red-600" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border rounded-md p-2"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />

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
  );
};

export default SignupPage;
