import { NavLink } from "react-router-dom";

const SublinkWrapper = ({ children, title }) => {
  return (
    <div>
      <div className="font-bold text-xs pb-3 text-gray-700">{title}</div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

const Sublink = ({ path, name }) => {
  return (
    <NavLink to={path}>
      <div className="text-xs hover:underline">{name}</div>
    </NavLink>
  );
};

function LinkGroup() {
  return (
    <div className="grid grid-cols-5 border-t border-t-gray-400 py-5">
      <SublinkWrapper title="shop and Learn">       
        <Sublink to="/" name="Store"/>
        <Sublink to="/" name="Mac"/>
        <Sublink to="/" name="iPad"/>
        <Sublink to="/" name="iPhone"/>
        <Sublink to="/" name="Watch"/>
        <Sublink to="/" name="AirPods"/>
      </SublinkWrapper>      

      <SublinkWrapper title="Services">       
        <Sublink to="/" name="Apple Music"/>
        <Sublink to="/" name="Apple TV+"/>
      </SublinkWrapper>      

      <SublinkWrapper title="shop and Learn">       
        <Sublink to="/" name="Store"/>
        <Sublink to="/" name="Mac"/>
        <Sublink to="/" name="iPad"/>
        <Sublink to="/" name="iPhone"/>
        <Sublink to="/" name="Watch"/>
        <Sublink to="/" name="AirPods"/>
      </SublinkWrapper>      
      
     
    </div>
  );
}

export default LinkGroup;
