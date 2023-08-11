import React from 'react'
import TabsFunAddUsers from './TabsFunAddUsers'
import Navbar from '../../components/header/Navbar'

export default function AddUsers() {
  return (
    <div>
    <Navbar />
    <p className="text-[35px]  ml-[35px] pt-[90px] p-9 font-bold">
      ADD USER
    </p>
    
    <p className="mt-[20px]"></p>
    
    <div className="ml-[40px]">
    <TabsFunAddUsers />
    </div>
  </div>
    )
}
