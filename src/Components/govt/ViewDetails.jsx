import React from "react";
import Sidebar from "./Sidebar";
import { Button } from "@material-tailwind/react";
import PollutionGraph from "../miscellaneous/PollutonGraph";
import { useRealDataContext } from "../../context/Compnaycontext";

function ViewDetails() {
  const { reveal, setreveal, RealData, setRealData } = useRealDataContext();
  console.log(RealData);

  return (
    <div className="flex lg:mx-[20%]   gap-5">
      <Sidebar />

      <div class="p-4 sm:ml-64 items-center grid grid-cols-1 w-full mt-32">
        {/* <button
          type="button"
          onClick={() => setreveal(!reveal)}
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                    dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Cancel
        </button> */}
        <h1 className="py-5 text-4xl font-bold">Project Details</h1>

        <div className="flex flex-col gap-4 justify-center ">
          {/* <div className="w-2/4 h-screen bg-red-200">
            <img
              src="https://assets.terrapass.com/wp-content/uploads/2022/08/carbon-dioxide-emissions-from-electricity-photo-of-factory-smoke.jpg"
              className="w-full h-72 object-fill "
            />
            <h1 className="text-center text-2xl py-2 font-semibold">
              {RealData.companyName}
            </h1>
          </div> */}

          <div class="relative flex items-center flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kdXN0cnl8ZW58MHx8MHx8fDA%3D"
                alt="card-image"
                class="w-fit h-full"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {RealData.companyName}
                </p>
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {RealData.issues}
                </p>
              </div>
              <p class="block capitalize font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {`the company ${RealData.companyName} issed ${RealData.issues} Carbon Tokens These tokens represent our commitment to sustainability and reward individuals and businesses for reducing their carbon footprint.`}
              </p>
            </div>
            <div class="p-6 pt-0">
              <button
                class="align-middle select-none font-sans bg-red-600 shadow-sm text-white font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={() => setreveal(!reveal)}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="w-2/4 h-screen bg-green-200">
            <PollutionGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
