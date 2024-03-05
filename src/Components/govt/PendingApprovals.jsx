import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewDetails from "./ViewDetails";
import { useRealDataContext } from "../../context/Compnaycontext";

function PendingApprovals() {
  const { reveal, setreveal, RealData, setRealData } = useRealDataContext();
  const [dummydata, setdummydata] = useState([
    {
      id: "1",
      companyName: "Apple",
      industry: "Automobile",
      type: "Org",
      project_details: "https://details",
      status: "pending",
      limits: 45151,
      issues: 812,
      eligibility: "No",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3001/comp/pending").then((response) => {
      if (response.data) {
        setdummydata(response.data);
        console.log(response.data);
      }
    });
  }, []);

  const updateCompanyLimitsAndStatus = async (companyName, tokens) => {
    try {
      const response = await axios.post("http://localhost:3001/comp/status", {
        companyName,
        tokens,
      });
      if (response) {
        // Handle the response data here, update state if needed
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating company limits and status:", error);
      // Handle errors here
    }
  };

  const rejectCompanyApproval = async (companyName) => {
    try {
      const response = await axios.post("http://localhost:3001/comp/reject", {
        companyName,
      });
      if (response) {
        // Handle the response data here, update state if needed
        console.log(response);
      }
    } catch (error) {
      console.error("Error rejecting company approval:", error);
      // Handle errors here
    }
  };

  return (
    <div className="">
      {reveal ? (
        <ViewDetails />
      ) : (
        <div className="lg:w-[1200px]">
          <Sidebar />
          <div className="p-4 sm:ml-64 w-full">
            <h1 className="py-5 text-4xl font-bold">
              Pending <span className="text-green-500">CET</span> Approvals
            </h1>
            <h1 className="mb-4 lg:m-8 text-3xl text-center font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Pending Approvals
            </h1>
            <div className="m-10 p-5 shadow-lg grid grid-cols-2">
              {dummydata.map((data, index) => (
                <div key={index}>
                  <div className="items-center justify-center m-5">
                    <div className="px-4 py-3 bg-gray-50 border-4 border-gray-100 rounded-lg hover:scale-105 duration-200">
                      <h1 className="text-lg font-bold">{data.companyName}</h1>
                      <div className="w-full py-2">
                        <span className="text-gray-700">
                          Requested CET: <b>{data.issues}</b>
                        </span>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Link
                          onClick={() => {
                            setreveal(!reveal);
                            setRealData(dummydata[index]);
                            console.log("------");
                          }}
                          type="button"
                          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() =>
                            updateCompanyLimitsAndStatus(
                              data.companyName,
                              data.issues
                            )
                          }
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            rejectCompanyApproval(data.companyName)
                          }
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingApprovals;
