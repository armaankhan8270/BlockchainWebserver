import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useContext, useState } from "react";
import Datacontext from "../../../context/Datacontext";
import axios from "axios";
function TableData() {
  var context = useContext(Datacontext);
  const [dummydata, setdummydata] = useState({
    id: "1",
    companyName: "Apple",
    industry: "Automobile",
    type: "Org",
    project_details: "https://details",
    status: "pending",
    limits: 45151,
    issues: 812,
    eligibility: "No",
  });
  var { getfactory, factory } = context;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const header = [
    { name: "Company Name" },
    { name: "Industry" },
    { name: "Size" },
    { name: "Project Details" },
    { name: "Status" },
    { name: "Limits" },
    { name: "Issues" },
    { name: "Eligible of CC" },
  ];
  const data = [].concat(
    ...factory.map((marker) => {
      return {
        key: marker._id,
        id: marker._id,
        name: marker.CompanyName,
        industry: marker.Product,
        size: marker.Size,
        project_details: "#",
        status: "pending",
        limits: marker.CarbonEmissionLimit,
        issues: marker.CarbonEmissionsProduction,
        eligible: "No",
      };
    })
  );
  useEffect(() => {
    if (factory.length === 0) {
      getfactory();
    }
  }, [factory]);
  useEffect(() => {
    axios.get("http://localhost:3001/comp").then((response) => {
      if (response.data) {
        setdummydata(response.data);
      }
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="">
      <div className="relative w-full  shadow-md sm:rounded-lg">
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
              dummydata?.map((data, index) => (
                <tr
                  key={data.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                >
                  <th
                    key="index"
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.companyName}
                  </th>
                  <td className="px-6 py-4">{data.industry}</td>
                  <td className="px-6 py-4">{data.size}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/card?name=${encodeURIComponent(data.companyName)}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-6 py-4">{data.status}</td>
                  <td className="px-6 py-4">{data.limits / 1000} CAT</td>
                  <td className="px-6 py-4">{data.issues}</td>
                  {/* <td className="px-6 py-4">{data.eligibility}</td> */}
                  {/* <td className="px-6 py-4">{data.eligibility}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full justify-center flex flex-1">
        <div className="flex flex-1 px-10 py-2  w-[70vw] overflow-x-scroll">
          <div className="mt-6  flex">
            <ul className="flex space-x-2">
              {pageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`${
                      pageNumber === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    } hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableData;
