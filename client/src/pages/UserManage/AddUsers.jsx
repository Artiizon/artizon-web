import React from 'react'
import TabsFunAddUsers from './TabsFunAddUsers'
import Navbar from '../../components/header/Navbar'

export default function AddUsers() {
  return (
    <div>
    <p className="font-sans text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
      ADD USER
    </p>
    
    <p className="mt-[20px]"></p>
    
    <div className="ml-[40px]">
    <TabsFunAddUsers />
    </div>
  </div>
    )
}
