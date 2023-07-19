import { FaBeer } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart} from 'react-icons/fa';


import {NavLink} from 'react-router-dom';

const NavbarItem=({path,name}) => {
  return(
    <p className='px-5 cursor-pointer hover:text-gray-500 transition-all ease-in-out'>
      
      <NavLink to={path}>{name}</NavLink>  
     </p>
  )
}

function Navbar() {
  return ( 
    <div className='fixed p-4 w-full text-gray-100 bg-gray-800 flex flex-row gap-3 justify-between items-center shadow-md'>
        <FaBeer />
        <div className='flex flex-row gap-5'>
          <NavbarItem path='/stock' name="Stock"/>
          <NavbarItem path='/social' name="Stock Details"/>
          <NavbarItem path='/contact' name="Contact"/>
          <NavbarItem path='/help' name="Help"/>
          <NavbarItem path='/login' name="Login"/>
         

         </div>
        
         <div className='flex flex-row gap-3'>
            <FaSearch/>
            <FaShoppingCart/>
         </div>
         
   
    </div>
  );
}

export default Navbar