import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Certificate from "./Certificate"; // Import the Certificate component
import { Link } from "react-router-dom";

const GenerateCertificate = () => {
  const [UID, setUID] = useState("");
  const [sign, setSign] = useState("");
  const [credit, setCredit] = useState("");
  const [company, setCompany] = useState({
    companyName: "Tech Innovators Inc.",
    industry: "Information Technology",
    size: "Medium",
    projectDetails: "Building a cloud-based CRM solution for small businesses.",
    status: "Ongoing",
    limits: 500000,
    issues: "Integration challenges with third-party APIs",
    eligibility: true,
  });
  const [showCertificate, setShowCertificate] = useState(false); // Initialize to false

  useEffect(() => {
    fetchCompanyDetailsByName(UID);
  }, [UID]);

  const fetchCompanyDetailsByName = async (companyName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comp/${companyName}`
      );
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  const handleLeave = () => {
    console.log("mouse leave");
  };

  const generateCertificate = () => {
    setShowCertificate(true); // Show certificate when clicked
  };

  const downloadCertificate = () => {
    // Logic to download certificate as PDF
    setShowCertificate(false); // Hide certificate after download
  };

  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div className="p-4 sm:ml-64 w-full mt-10">
        <div className="p-4 rounded-lg mt-14">
          <div className="items-center w-full justify-center mb-4 bg-white ">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Genrate Certificate
            </h1>
          </div>
          <div className="flex justify-center items-start gap-5">
            <div className="w-2/4">
              <div className="mb-6">
                <label
                  htmlFor="companyUID"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company/Project UID or NAME
                </label>
                <input
                  type="text"
                  id="companyUID"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                     dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="UISID-45XXXXX XXXX"
                  required
                  onMouseLeave={handleLeave}
                  onChange={(e) => setUID(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => fetchCompanyDetailsByName(UID)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Fetch Company Details
              </button>
              {/* View Certificate button */}
              <button
                type="button"
                onClick={generateCertificate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Certificate
              </button>
            </div>
            <div className="w-2/4 p-5 bg-blue-100 rounded-lg">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Company Details
              </h1>
              {company && (
                <div
                  id="certificate"
                  className="py-4 bg-white shadow-md rounded-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="my-1">
                        <span className="font-semibold">Company Name:</span>{" "}
                        {company.companyName}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Industry:</span>{" "}
                        {company.industry}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Size:</span>{" "}
                        {company.size}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Project Details:</span>{" "}
                        {company.projectDetails}
                      </p>
                    </div>
                    <div>
                      <p className="my-1">
                        <span className="font-semibold">Status:</span>{" "}
                        {company.status}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Limits:</span>{" "}
                        {company.limits}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Issues:</span>{" "}
                        {company.issues}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Eligibility:</span>{" "}
                        {company.eligibility ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Display Certificate component if showCertificate is true */}
          {showCertificate && (
            <Certificate
              companyName={company.companyName}
              projectDetails={company.projectDetails}
              completionDate="February 5, 2024"
            />
          )}
          {!showCertificate && (
            <div className="mt-5 p-5 bg-white dark:bg-gray-800 rounded-lg">
              <div className="border border-gray-300 dark:border-gray-600 p-5">
                {/* Download Certificate button */}
                <button
                  type="button"
                  onClick={downloadCertificate}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 
                          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4
                          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Download Certificate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
