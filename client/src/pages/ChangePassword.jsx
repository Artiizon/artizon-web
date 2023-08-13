import Navbar from "../components/header/Navbar";
import React, { useState } from "react";

const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    setIsPasswordValid(passwordRegex.test(passwordValue));
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your new password"
        className="mb-[2px] w-[300px] h-[34px] px-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
      />
      <p className={isPasswordValid ? "text-green-500" : "text-red-500"}>
        {isPasswordValid ? "Password is valid!" : "Please enter valid password"}
      </p>
    </div>
  );
};

export default function () {
  return (
    <div className="min-h-[575.5px]">
      <div className="flex  text-center">
        <p className="text-[30px]  ml-[285px] mt-[80px] mb-[15px] font-semibold ">
          Change Password
        </p>
      </div>

      <div className="flex">
        <div className="orders ml-[350px] mt-[50px] mb-[5px] ">
          <p className=" text-xl w-[280px] mb-[10px]">Password must contain:</p>
          <p className=" text-l ml-[30px] mb-[6px]">At least 6 characters</p>
          <p className=" text-l ml-[30px] mb-[6px]">
            At least 1 upper case letter(A-Z)
          </p>
          <p className=" text-l ml-[30px] mb-[6px]">
            At least 1 lower case letter(a-z)
          </p>
          <p className=" text-l ml-[30px] mb-[6px]">At least 1 number(0-9)</p>
        </div>

        <div className="orders ml-[200px] mt-[50px] mb-[5px]">
          <input
            type="password"
            placeholder="Enter your old password"
            className="w-[300px] h-[34px] mb-[15px] px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
          <PasswordValidator className="w-[300px] h-[34px]" />
          <input
            type="password"
            placeholder="ReEnter your new password"
            className="w-[300px] h-[34px] mb-[15px] mt-[5px] px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
          />
          
          <button
              type="button"
              className="justify-center w-[300px] h-[30px] mt-[-2px] 
                  pt-[4px] text-sm font-medium uppercase 
                text-white  shadow shadow-slate-600  bg-black rounded-[10px] flex"
            >
              <p >save</p>
              
            </button>
            
        </div>
      </div>
    </div>
  );
}
