import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Datacontext from "../../../context/Datacontext";
import React from "react";
import axios from "axios";

function ApprovedCertificates() {
  var context = useContext(Datacontext);
  const [dummydata, setdummydata] = useState([
    {
      companyName: "SustainaTech Solutions",
      date: "2022-10-12T00:00:00.000Z",
      certificateURL: "https://sustainatechsolutions.com/certificate",
      project: "Smart Energy Management System",
      carbonReduced: 1450,
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:3001/certificate").then((response) => {
      if (response.data) {
        setdummydata(response.data);
        console.log(response.data);
      }
    });
  }, []);
  var { getcertificate, cartificate, back } = context;
  const header = [
    { name: "Company Name" },
    { name: "Date" },
    { name: "Certificate URL" },
    { name: "Project" },
    { name: "carbon Reduced" },
  ];
  const data = dummydata.map((item) => {
    return {
      key: item._id,
      id: item._id,
      company: item.Companyname,
      date: item.date,
      url: item.Path,
      Project: item.projectName,
      totalconsumption: item.CarbonCount,
    };
  });

  useEffect(() => {
    if (cartificate.length === 0) {
      getcertificate();
      getcertificate();
    }
  }, [cartificate]);

  return (
    <div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase justify-center text-center bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            {header.map((data, index) => (
              <th key={index} scope="col" class="px-2 py-3">
                {data.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-2/4 overflow-scroll text-center">
          {Array.isArray(dummydata) &&
            dummydata.map((data, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <th
                  key="index"
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.companyName}
                </th>
                <td class="px-6 py-4">{data.date}</td>

                <td class="px-6 py-4">
                  <Link
                    to={data.certificateURL}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
                <td class="px-6 py-4">{data.project}</td>
                <td class="px-6 py-4">{data.carbonReduced}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovedCertificates;
