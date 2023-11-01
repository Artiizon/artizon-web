import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewDesignerPage = () => {
  const navigate = useNavigate();

  const generateRandomPassword = () => {
    const passwordLength = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const customerMessage = generateRandomPassword();
    const formData = new FormData();
    formData.append("firstName", event.target.firstName.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("title", event.target.title.value);
    formData.append("eMail", event.target.eMail.value);
    formData.append("contactNumber", event.target.contactNumber.value);
    formData.append("password", customerMessage);

    axios
      .post("http://localhost:8080/api/addNewDesigner", formData,  {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {

        
        axios
          .post('http://127.0.0.1:8080/send-customer-email', {
            customerId: '00', // Replace with the actual customer ID or email address
            message: "Your password is - " + customerMessage,
            subject: 'Password',
            recipientEmail: event.target.eMail.value
            
          })
        navigate("/usermanage");
        console.log("Designer added successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error adding :", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-[240px]">
          <div className="flex">
            <label className="p-2 w-[130px] h-[40px] ">Name</label>
            <input
              type="text"
              id="firstName"
              className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex">
            <label className="p-2 w-[130px] h-[40px] ">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex">
            <label className="p-2 w-[130px] h-[40px] ">title</label>
            <input
              type="text"
              id="title"
              className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex">
            <label className="p-2 w-[130px] h-[40px] ">E-Mail</label>
            <input
              type="text"
              id="eMail"
              className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex">
            <label className="p-2 w-[130px] h-[40px] ">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              className="w-[380px] h-[32px] mb-[10px] mt-[5px] px-2 py-1 bg-[#EFEFEF] border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>
        <button
          className=" w-[100px] h-[30px] mt-[20px] bg-black rounded-md text-white text-sm ml-[500px]"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddNewDesignerPage;
