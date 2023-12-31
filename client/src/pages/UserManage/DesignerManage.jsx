import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchbars/searchbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


export default function DesignerManage() {
  // const [filteredData, setFilteredData] = useState(DATA);
  // return (
  //   <div>
  //     <div className=" ml-[-23px] gap-2 ">
        // {/* <div className="mb-[20px]">
        //   <SearchBar data={DATA} setFilteredData={setFilteredData} />
        // </div> */}

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

  const handleSubmit = (event,designerId) => {
    const formData = new FormData();
    formData.append("user", "designer");
    formData.append("reason", event.target.reason.value);
    formData.append("astatus", "0");
    formData.append("userid", "designer_id");
    formData.append("stylist_id", designerId);
    
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8080/api/addBlockStylist", formData, config)
      .then((response) => {
        navigate("/");
        console.log("successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  };
    


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
          <div className="w-[175px] mr-[50px] pb-2 font-sans font-[700]">User ID</div>
          <div className="w-[295px] pb-2 font-sans font-[700]">Name</div>
          <div className="w-[300px] font-sans font-[700]">E-Mail</div>
          {/* <div className="w-[160px] font-sans font-[700]">Orders</div> */}
        </div>
        {designerData.map((item,index) => (
          <div
            
            key={item.designer_id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md" : "bg-[#D9D9D9] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md"}
          >
            <div className=" w-[50px] mr-[50px] pl-2 pb-1  text-center radius-[15px]">
              {item.designer_id}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.first_name+" "+ item.last_name}
            </div>
            <div className="w-[350px] mr-[90px] pl-2 text-center">{item.email}</div>
            {/* <div className="w-[80px] pl-2 ml-[50px] text-center">
              {item.orders}
            </div> */}
            {/* <NavLink to="/designerPortfolia ">
              <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
                More
              </button>
            </NavLink> */}
            <Popup
              trigger={
                <button>
                  {" "}
                  <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[180px] font-sans font-[600]">
                    Block
                  </button>
                </button>
              }
              modal
              nested
              overlayStyle={{
                background: "rgba(0, 0, 0, 0.5)", // Set the overlay background to transparent black
              }}
              contentStyle={{
                background: "transparent", // Set the content background to transparent
                border: "none", // Remove border
                boxShadow: "none", // Remove box shadow
              }}
            >
              {(close) => (
                <div className="modal flex justify-center items-center font-sans">
                  <div
                    className="content p-4 rounded-[15px] bg-white w-[450px] h-[300px] justify-center items-center "
                    style={{ backdropFilter: "blur(8px)" }} // Apply backdrop filter for a blurred effect
                  >
                    <div className="flex">
                      <p className="text-3xl font-bold">{item.first_name+" "+ item.last_name}</p>
                      <p className="text-sm ml-[20px] mt-[6px]">(designer)</p>
                    </div>
                    <p className="text-xl ml-[20px] mt-[6px]">
                    {item.email}
                    </p>
                    <p className="text mb-[10px]-l ml-[20px] mt-[6px]">
                    {item.contact_number}
                    </p>
                    <form onSubmit={(event) => handleSubmit(event, item.designer_id)}>
                    <label className="mt-[10px] p-2 w-[130px] h-[40px] font-[600]">
                      Reason
                    </label>
                    <input
                      type="text"
                      id="reason"
                      className="w-[380px] h-[65px]  bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
                      
                    />
                    <button className=" w-[120px] h-[30px] mt-[40px] bg-black rounded-md text-white text-sm ml-[150px] font-sans font-[600]">
                      BLOCK DESIGNER
                    </button>
                    </form>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        ))}
      </div>
    </div>
  );
}
