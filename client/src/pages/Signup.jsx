import { useState } from "react";
import { Link } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import img1 from "../images/tshirt.jpg";


const SignupPage = () => {
  const [emailError, setEmailError] = useState('');
  const titleOptions = ["Mr", "Mrs"];

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
      const response = await axios.post('http://localhost:3001/api/signup', values);
      console.log(response);
      if (response.data.message === 'Email already registered') {
        setEmailError(response.data.message);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setEmailError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StandardLayout>
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
              <Form className="flex flex-col gap-4">
                <div>
                  <label className="text-gray-600 font-semibold">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Title</label>
                  <Field as="select" name="title" className="border border-gray-300 p-2 rounded-md">
                    <option value="">Select Title</option>
                    {titleOptions.map((titleOption) => (
                      <option key={titleOption} value={titleOption}>
                        {titleOption}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="title" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Email</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600" />
                  {emailError && <div className="text-red-600">{emailError}</div>}
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Contact Number</label>
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                </div>
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
    </StandardLayout>
  );
};

export default SignupPage;
