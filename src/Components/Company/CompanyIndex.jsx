import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// , MdPendingActions
import { MdGeneratingTokens } from "react-icons/md";
import { FcFactory } from "react-icons/fc";
import Graph from "./Graph";
import axios from "axios";
import GroupedBarChart from "./charts/barchat1";
import CompanyCharts from "./charts/linechart";
import CompanyCharts1 from "./charts/Barchart";

const CompanyIndex = () => {
  const [data, setdata] = useState({
    totalToken: 43,
    totalCompnaies: 43,
  });
  const [count, setcount] = useState(455);
  const [used, setused] = useState(100000);

  useEffect(() => {
    axios.get("http://localhost:3001/comp").then((response) => {
      if (response.data) {
        setcount(response.data.length);

        // Summing up the issues from each item in the response data
        const totalTokens = response.data.reduce(
          (acc, curr) => acc + curr.issues,
          0
        );
        setused(10000000);
      }
    });
  }, []);

  const cardData = [
    {
      icon: MdGeneratingTokens,
      count: used,
      text: "Total Token Issued",
    },

    {
      icon: FcFactory,
      count: count,
      text: "Total Companies",
    },
  ];

  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div className="p-4 sm:ml-64 w-full mt-10">
        <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-5 justify-center gap-4 mb-4">
            {cardData.map((data, index) => (
              <div
                key={index}
                className="grid items-center justify-center px-5 py-3 h-24 rounded bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex justify-center gap-4 items-center">
                  <data.icon className="text-4xl" />{" "}
                  <span className="text-2xl">{data.count}</span>
                </div>
                <hr />
                <div className="">
                  <p>{data.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" p-5 mb-4 items-center justify-center flex rounded bg-gray-50 dark:bg-gray-800">
            <div className="w-4/5 ">
              <h1 className="text-center text-2xl py-5 font-bold">
                Total Token Consumption Vs Profit
              </h1>

              <Graph />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
              <h1 className="text-center text-2xl py-5 font-bold">
                Limits vs. Issues: Automobile Industry vs. Other Industries
              </h1>
              <GroupedBarChart />
            </div>
            <div className=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
              <h2 className="text-center text-2xl py-5 font-bold">
                Industries leading to C02 emmission
              </h2>
              <CompanyCharts />
            </div>
            <div className=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
              <h2 className="text-center text-2xl py-5 font-bold">
                Comparison of Limits and Issues Across Different Companies
              </h2>
              <CompanyCharts1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIndex;
