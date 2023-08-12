import React from "react";
import Navbar from "../../components/header/Navbar";
import cover2 from "../../images/portCover/cover2.jpg";
import pp1 from "../../images/portPp/pp3.png";
import DesCards from "./DesCards";

export default function DesignerPortfolia() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-full h-[500px] p-[50px] flex ">
        

        <div class="">
          <div>
            {/* <div>
              <img
                src={pp1}
                alt="imagce"
                className="w-[250px] h-[200px] ml-[620px] mt-[170px] "
              />
            </div> */}
            <div class="text-slate-700 w-[450px]  mt-[240px] ml-[250px] ">
              <h2 class="mb-[-10px] text-3xl font-semibold  ">
                Hey, I am <br />
              </h2>
              <p className="text-[50px] mb-[-28px]">Nuwan Tharanga</p>
              <br />
              <h2 class=" text-3xl font-semibold  ">Textile Designer</h2>
              {/* border-neutral-50 mt-[15px] px-7 pb-[8px] pt-[10px] text-sm 
              font-medium uppercase leading-normal text-blck transition duration-150 
              ease-in-out hover:border-neutral-100 hover:bg-neutral-900 
              hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-100 
              focus:text-neutral-100 focus:outline-none focus:ring-0 
              active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-900 
              dark:hover:bg-opacity-10 */}
              <button
                type="button"
                class="rounded border-5 mt-[15px] px-7 pb-[8px] pt-[10px] text-sm 
                font-medium uppercase leading-normal transition duration-150 
                ease-in-out hover:border-neutral-100 hover:bg-green-900 
                hover:bg-opacity-100 hover:text-neutral-100 bg-green-600 text-white
                focus:text-neutral-800"
                
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[70px] ml-[100px]">
        <img
          src={pp1}
          alt="imagce"
          className="w-[550px] h-[400px]  overflow-hidden bg-cover bg-no-repeat text-center"
        />
        </div>
      </div>

      <div className="about  mt-[21px] flex justify-center items-center bg-gray-200">
        <div>
          <h1 className="font-semibold text-4xl mb-5 flex justify-center items-center mt-[30px]">
            My Journey As A Designer
          </h1>
          <p className="text-[14px] w-[550px] text-center mb-[30px]">
            Mollit non et elit voluptate. Lorem velit et laboris elit Lorem
            nostrud consequat tempor tempor qui non cillum. Et quis ullamco ut
            nulla. Amet aliqua amet esse non esse officia aliquip culpa aute
            esse consectetur quis. Excepteur cillum in proident aliqua
            consectetur.
          </p>
        </div>
      </div>

      <div className="  ml-[150px] mt-[50px]">
        <h2 className="font-semibold text-[30px]">Explore My Designs</h2>
        <div className="grid grid-cols-3 gap-2 ">
          <DesCards />
        </div>
      </div>
    </div>
  );
}
