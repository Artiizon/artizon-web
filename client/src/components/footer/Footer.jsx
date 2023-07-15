import { Link } from "react-router-dom";

const FooterStandardLink = ({ name, path }) => {
  return (
    <div className="text-gray-600 px-1 hover:underline">
      <Link to={path}>{name}</Link>
    </div>
  );
};



const FooterlowerLink = ({ name, path }) => {
  return (
    <div className="text-blue-600 hover:underline">
      <Link to={path}>{name}</Link>
    </div>
  );
};


function Footer() {
  return (
    <div className="px-[200px] bg-gray-200 text-xs font-semibold text-gray-600">
      <div className="flex flex-row py-2">
        More ways to shop.
        <FooterStandardLink name="Find an Store" path="/" /> or
        <FooterStandardLink name="other retailer " path="/" />  near you.
      </div>
      <div className="flex flex-row justify-between pt-2 pb-6 border-t border-t-gray-400">
          <div>Copyright 2022 Some Inc. All rights reserved</div>
          <div className="flex flex-row gap-6">
               <FooterlowerLink name="Privacy Policy" to="/" />
               <FooterlowerLink name="Terms of Use" to="/" />
               <FooterlowerLink name="Sales and Refunds" to="/" />
               <FooterlowerLink name="Legal" to="/" />
               <FooterlowerLink name="Map" to="/" />
           </div>

           <div> 
               <FooterlowerLink name="United States" to="/" />
           </div>

      </div>
    </div>
  );
}

export default Footer;
