import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRealDataContext } from "../../../context/Compnaycontext";
import { common } from "@material-ui/core/colors";
// import { useRealDataContext } from "../../../context/CompanyContext";

function TableData() {
  const { RealData, setRealData } = useRealDataContext();
  const [TotalCarbonLimit, setTotalCarbonLimit] = useState(1000);
  const [dummydata, setdummydata] = useState({
    id: "1",
    companyName: "Apple",
    industry: "Automobile",
    type: "Org",
    project_details: "https://details/",
    status: "pending",
    limits: 45151,
    issues: 812,
    eligibility: "No",
  });
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  const header = [
    { name: "Company Name" },
    { name: "Industry" },
    { name: "Type" },
    { name: "Project Details" },
    { name: "Status" },
    { name: "Limits" },
    { name: "Issues" },
    { name: "Eligible of CC" },
  ];

  useEffect(() => {
    setLoading(false); // Set loading to false after initial render
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/comp").then((response) => {
      if (response.data) {
        setdummydata(response.data);
      }
    });
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  return (
    <div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              {header.map((data, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {data.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dummydata) &&
              dummydata.map((data, index) => (
                <tr
                  key={index} // Corrected key prop
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.companyName}
                  </th>
                  <td className="px-6 py-4">{data.industry}</td>
                  <td className="px-6 py-4">{data.type}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`${data.project_details}/${data.companyName}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4">{data.status}</td>
                  <td className="px-6 py-4">{data.limits} CAT</td>
                  <td className="px-6 py-4">{data.issues}</td>
                  <td className="px-6 py-4">{data.eligibility}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;
