import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LoginError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[500px] mt-[-110px] h-[190px] p-10 rounded-lg shadow-md ">
        <p className="text-2xl font-semibold mb-4">Please Log In To Proceed Further</p>
        <NavLink to="/login">
          <button className="bg-black hover:bg-gray-800 text-white font-semibold ml-[170px] mt-[18px] px-4 py-2 rounded-md">
            OK
          </button>
        </NavLink>
      </div>
    </div>
  );
}