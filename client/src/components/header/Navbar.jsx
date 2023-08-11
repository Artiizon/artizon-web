import { FaShoppingCart } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 bg-black text-white flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <NavLink to="/" className="text-xl font-bold">
        <div className="flex items-center px-5">
  <p className="text-4xl">
    <span className="font-bold text-white">ar</span>
    <span className="text-red-500 font-extrabold animate-bounce">T</span>
    <span className="font-bold text-white">izon</span>
  </p>
</div>

        </NavLink>
      </div>

      <div className="flex gap-5">
        {/* <NavbarItem path="/stylist-dash" name="Dashboard" />
        <NavbarItem path="/design-lab" name="Design Lab" />
        <NavbarItem path="/company-design" name="Designs" />
        <NavbarItem path="/help" name="Help" />
        <NavbarItem path="/about" name="About" />
      */}
        <NavbarItem path="/textileProManagerdashboard" name="Dashboard" />
        <NavbarItem path='/stock' name="Stock"/>
        <NavbarItem path='/tpm_review_orders' name="Review Orders"/>
        <NavbarItem path='/item' name="Item"/>
     
      </div>

      <div className="flex items-center gap-5">
        <FaShoppingCart size={20} />
        <NavbarItem path="/login" name="Login" isButton />
      </div>
    </nav>
  );
};

        {/* <NavbarItem path='/price' name="Price"/> */}
        

const NavbarItem = ({ path, name, isButton = false }) => {
  const itemClasses = isButton
    ? 'px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-gray-800 transition-colors duration-300'
    : 'text-white hover:text-gray-300 transition-colors duration-300';

  return (
    <NavLink
      to={path}
      activeClassName="text-gray-300"
      activeclassname="text-gray-300"
      className={itemClasses}
    >
      {name}
    </NavLink>
  );
};

export default Navbar;
