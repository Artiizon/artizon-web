import { Link } from 'react-router-dom';



const FooterStandardLink = ({ name, path }) => {
  return (
    <div className="text-blue-600 px-1 hover:underline">
      <Link to={path}>{name}</Link>
    </div>
  );
};

const FooterLowerLink = ({ name, path }) => {
  return (
    <div className="text-gray-300 hover:underline">
      <Link to={path}>{name}</Link>
    </div>
  );
};

function FooterHome() {
  return (
    <div className="font-sans footer-container bg-black text-xs font-semibold text-white">
      <div className="px-[200px]">  
        <div className="flex flex-row py-2">
          More ways to shop.
          <FooterStandardLink name="Find a Store" path="/" /> or
          <FooterStandardLink name="other retailer" path="/" /> near you.
        </div>
        <div className="flex flex-row justify-between pt-2 pb-2 border-t border-t-gray-400">
          <div>Copyright 2023 Artizon Inc. All rights reserved</div>
          <div className="flex flex-row gap-6">
            <FooterLowerLink name="Privacy Policy" path="/" />
            <FooterLowerLink name="Terms of Use" path="/" />
            <FooterLowerLink name="Company Reviews" path="/company-feedback" />
            <FooterLowerLink name="Legal" path="/" />
            <FooterLowerLink name="Map" path="/" />
          </div>
          <div>
            <FooterLowerLink name="Sri Lanka" path="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterHome;