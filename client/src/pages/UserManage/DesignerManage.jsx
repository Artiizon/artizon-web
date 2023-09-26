import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchbars/searchbar";
import axios from "axios";
import { useState, useEffect } from "react";


export default function DesignerManage() {
  // const [filteredData, setFilteredData] = useState(DATA);
  // return (
  //   <div>
  //     <div className=" ml-[-23px] gap-2 ">
  //       {/* <div className="mb-[20px]">
  //         <SearchBar data={DATA} setFilteredData={setFilteredData} />
  //       </div> */}

  //       <div className="flex flex-row gap-[20px] text-lg ">
  //         <div className="w-[195px] pb-2 font-sans font-[700]">User ID</div>
  //         <div className="w-[270px] pb-2 font-sans font-[700]">Name</div>
  //         <div className="w-[250px] font-sans font-[700]">E-Mail</div>
  //         <div className="w-[160px] font-sans font-[700]">Design Count</div>
  //       </div>
  //       {filteredData.map((item) => (
  //         <div
  //           className={`w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md ${item.style}`}
  //         >
  //           <div className="w-[50px] pl-2 pb-1 text-center radius-[15px] ">
  //             {item.uId}
  //           </div>
  //           <div className="w-[260px] pl-2 ml-[30px] text-center">
  //             {item.fullName}
  //           </div>
  //           <div className=" w-[305px] pl-2 text-center">{item.email}</div>
  //           <div className=" w-[80px] pl-2 ml-[50px] text-center">
  //             {item.Designs}
  //           </div>
  //           <NavLink to="/designerPortfolia ">
  //             <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
  //               More
  //             </button>
  //           </NavLink>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  const [designerData, setDesignerData] = useState([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/designers");
        setDesignerData(response.data);
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };

    fetchDesigners();
  }, []);


  return (
    <div>
      <div className=" ml-[-23px] gap-2 ">
        {/* <div className="mb-[20px] ">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div> */}
        <div className="flex flex-row gap-[20px] text-lg text-black pt-[5px] w-[1185px]">
          <div className="w-[195px] pb-2 font-sans font-[700]">User ID</div>
          <div className="w-[270px] pb-2 font-sans font-[700]">Name</div>
          <div className="w-[250px] font-sans font-[700]">E-Mail</div>
          <div className="w-[160px] font-sans font-[700]">Orders</div>
        </div>
        {designerData.map((item,index) => (
          <div
            
            key={item.designer_id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md" : "bg-[#D9D9D9] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md"}
          >
            <div className=" w-[50px] pl-2 pb-1  text-center radius-[15px]">
              {item.designer_id}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.first_name+" "+ item.last_name}
            </div>
            <div className="w-[305px] pl-2 text-center">{item.email}</div>
            {/* <div className="w-[80px] pl-2 ml-[50px] text-center">
              {item.orders}
            </div> */}
            <NavLink to="/designerPortfolia ">
              <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
                More
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
