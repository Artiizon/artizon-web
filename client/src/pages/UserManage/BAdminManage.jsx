import { NavLink } from "react-router-dom";
import SearchBar from "../../components/searchbars/searchbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function BAdminManage() {
  
    const handleSubmit = (event,adminId) => {
        const formData = new FormData();
        formData.append("user", "admin");
        formData.append("reason", "active account");
        formData.append("astatus", "1");
        formData.append("userid", "admin_id");
        formData.append("stylist_id", adminId);
        
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

    const [adminData, setAdminData] = useState([]);

    useEffect(() => {
      const fetchAdmins = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/badmins");
          setAdminData(response.data);
        } catch (error) {
          console.error("Error fetching admins:", error);
        }
      };
  
      fetchAdmins();
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
            <div className="w-[160px] font-sans font-[700]">Blocked Reason</div>
          </div>
          {adminData.map((item,index) => (
            <div
              
            key={item.admin_id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md" : "bg-[#D9D9D9] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md"}
          >
              <div className=" w-[50px] mr-[40px] pl-2 pb-1  text-center radius-[15px]">
                {item.admin_id}
              </div>
              <div className="w-[260px] pl-2 ml-[2px] mr-[15px] text-center">
                {item.first_name+" "+ item.last_name}
              </div>
              <div className="w-[245px] mr-[10px] pl-2 text-center">{item.email}</div>
              <div className="w-[305px] mr-[40px]  text-center">{item.blockedReason}</div>
              {/* <div className="w-[80px] pl-2 ml-[50px] text-center">
                {item.orders}
              </div> */}
              <Popup
                trigger={
                  <button>
                    {" "}
                    <button className=" w-[100px] h-[25px] mt-[3px] bg-black rounded-md text-white text-sm ml-[10px] font-sans font-[600]">
                      UNBLOCK
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
                      className="content p-4 rounded-[15px] bg-white w-[400px] h-[170px] justify-center items-center "
                      style={{ backdropFilter: "blur(8px)" }} // Apply backdrop filter for a blurred effect
                    >
                        <form onSubmit={(event) => handleSubmit(event, item.admin_id)}>
                      <div className="">
                        <p className="text-4xl font-bold">Are You Sure Unblock </p>
                        <p className="text-3xl mt-[10px]">{item.first_name+" "+item.last_name}?</p>
                        {/* <p className="text-sm ml-[20px] mt-[6px]">(stylist)</p> */}
                      </div>
                      {/* <p className="text-xl ml-[20px] mt-[6px]">
                      {item.email}
                      </p>
                      <p className="text mb-[10px]-l ml-[20px] mt-[6px]">
                      {item.contact_number}
                      </p>
                      <label className="mt-[10px] p-2 w-[130px] h-[40px] font-[600]">
                        Reason
                      </label>
                      <input
                        type="text"
                        className="w-[380px] h-[65px]  bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
                      /> */}
                      <button className=" w-[120px] h-[30px] mt-[20px] bg-black rounded-md text-white text-sm ml-[130px] font-sans font-[600]" 
                      type="submit">
                        YES
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
