import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCar, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const CompanyCard = () => {
  const location = useLocation();
  const [companyName, setCompanyName] = useState("");
  const [companyData, setCompanyData] = useState({
    id: "",
    companyName: "",
    industry: "",
    type: "",
    project_details: "",
    status: "",
    limits: "",
    issues: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    setCompanyName(name);

    axios
      .get(`http://localhost:3001/comp/${name}`)
      .then((response) => {
        if (response.data) {
          setCompanyData(response.data);
          console.log(response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [location.search]);

  // Render loading state while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error message if data fetching failed
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Determine status icon and color
  let statusIcon, statusColor;
  if (companyData.status === "pending") {
    statusIcon = <FaExclamationCircle className="text-yellow-500 mr-2" />;
    statusColor = "bg-yellow-100";
  } else if (companyData.status === "approved") {
    statusIcon = <FaCheckCircle className="text-green-500 mr-2" />;
    statusColor = "bg-green-100";
  } else {
    statusIcon = <FaExclamationCircle className="text-red-500 mr-2" />;
    statusColor = "bg-red-100";
  }

  return (
    <div className="max-w-md mx-auto mt-24 bg-white rounded-lg shadow-lg overflow-hidden">
      <h1>Company</h1>
      <div
        className="bg-cover bg-center h-40"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003776.jpg?size=626&ext=jpg&ga=GA1.1.570651861.1704119948&semt=sph')",
        }}
      ></div>
      <div className="p-6">
        <h2 className="text-xl font-semibold capitalize mb-2">
          {companyData.companyName}
        </h2>
        <div className="flex items-center mb-2">
          <FaCar className="text-gray-600 mr-2" />
          <p className="text-gray-600">{companyData.industry}</p>
        </div>
        <p className="text-gray-700 mb-4">{companyData.type}</p>
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2C5.03 2 1 6.03 1 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 3a1 1 0 112 0v4a1 1 0 11-2 0V5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            ></path>
          </svg>
          <a
            href={`http://${companyData.companyName}`}
            className="text-blue-900 hover:underline"
          >
            {companyData.companyName}
          </a>
        </div>
        <div
          className={`flex items-center mb-2 ${statusColor} text-sm text-gray-800 py-1 px-2 rounded-full`}
        >
          {statusIcon}
          <span>{companyData.status}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Limits</p>
            <p className="text-xl font-semibold text-gray-700">
              {companyData.limits}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Issues</p>
            <p className="text-xl font-semibold text-gray-700">
              {companyData.issues}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Eligibility</p>
            <p className="text-xl font-semibold text-gray-700">
              {companyData.eligibility}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
