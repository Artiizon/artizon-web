import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchbars/searchbar";
import { generateCustomerEmailMessage } from "../../components/emails/UserBlock";
import axios from "axios";
import { useState, useEffect } from "react";

function CustomerManagementPage() {

  const navigate = useNavigate();
  
  const handleSubmit = (event,customerId) => {
    const formData = new FormData();
    formData.append("user", "customer");
    formData.append("reason", event.target.reason.value);
    formData.append("astatus", "0");
    formData.append("userid", "customer_id");
    formData.append("customer_id", customerId);
    
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8080/api/addBlockStylist", formData, config)
      .then((response) => {



       const customerMessage = generateCustomerEmailMessage(formData.reason);
         
        
        axios
          .post('http://127.0.0.1:8080/send-customer-email', {
            message: customerMessage,
            subject: 'Account Blocked',
            recipientEmail: formData.cusEmail
            
          })
          .then((messageResponse) => {
            console.log(messageResponse.data);
            // Handle success for sending the email
  
            navigate('/usermanage');
          })
          .catch((messageError) => {
            console.error('Error sending email to customer:', messageError);
            // Handle error sending the email
          });
          console.log("successfully!", response.data);
      })
        
      
      .catch((error) => {
        console.error("Error :", error);
      });
  };
  // Rename the stocks variable used by Axios to avoid conflicts
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customers");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchCustomers();
  }, []);


  return (
    <div>
      <div className=" ml-[-23px] gap-2 ">
        {/* <div className="mb-[20px] ">
          <SearchBar data={DATA} setFilteredData={setFilteredData} />
        </div> */}
        <div className="flex flex-row gap-[20px] text-lg text-black pt-[5px] w-[1185px]">
          <div className="w-[195px] pb-2 font-sans font-[700]">User ID</div>
          <div className="w-[310px] pb-2 font-sans font-[700]">Name</div>
          <div className="w-[350px] mr-[200px] font-sans font-[700]">E-Mail</div>
          {/* <div className="w-[160px] font-sans font-[700]">Orders</div> */}
        </div>
        {customerData.map((item,index) => (
          <div
            
          key={item.customer_id}
                className={index % 2 === 0 ? "bg-[#F1F1F1] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md" : "bg-[#D9D9D9] w-[1185px] flex flex-row gap-[20px] text-slate-600 rounded-md"}
        >
            <div className=" w-[50px] pl-2 pb-1  text-center radius-[15px]">
              {item.customer_id}
            </div>
            <div className="w-[260px] pl-2 ml-[30px] text-center">
              {item.first_name+" "+ item.last_name}
            </div>
            <div className="w-[385px] mr-[100px] pl-2 text-center">{item.email}</div>
            {/* <div className="w-[80px] pl-2 ml-[50px] text-center">
              {item.orders}
            </div> */}
            <NavLink to={`/customerPortfolia/${item.customer_id}`}>
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
export default CustomerManagementPage;