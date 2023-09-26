import axios from "axios";

const AddNewManagerPage = () => {
  const handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("firstName", event.target.firstName.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("title", event.target.title.value);
    formData.append("eMail", event.target.eMail.value);
    formData.append("contactNumber", event.target.contactNumber.value);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8080/api/addNewManager", formData, config)
      .then((response) => {
        navigate("/des-designrr");
        console.log("Design and materials added successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error adding design and materials:", error);
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

export default AddNewManagerPage;
