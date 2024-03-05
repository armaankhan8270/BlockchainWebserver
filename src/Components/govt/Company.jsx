import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  MdGeneratingTokens,
  MdPendingActions,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { FcFactory } from "react-icons/fc";
import { BsWind } from "react-icons/bs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import Datacontext from "../../context/Datacontext";
import axios from "axios";
import PieChart from "./charts/pie";
import BarChart from "./charts/Barchart";
import Histogram from "./charts/Histogram";
import IndustryEmissionsChart from "./charts/Barchart2";
import CompanyCharts1 from "../Company/charts/Barchart";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const Company = () => {
  const [TotalCarbonLimit, setTotalCarbonLimit] = useState(1000);
  const [totalCompanies, settotalCompanies] = useState(20);
  const [TotalCarbonProduced, setTotalCarbonProduced] = useState(300);
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
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    setLoading(false); // Set loading to false after initial render
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/comp").then((response) => {
      if (response.data) {
        setdummydata(response.data);
        settotalCompanies(response.data.length);
        console.log();
        let total = 0;
        let totalCarbon = 0;
        for (let index = 0; index < response.data.length; index++) {
          let token = response.data[index].issues; // Assuming "issues" property holds the value you want to add
          let token2 = response.data[index].limits; // Assuming "issues" property holds the value you want to add
          if (typeof token === "number") {
            total += token;
          } else if (typeof token === "string") {
            // Convert the string to a number if possible
            let numericToken = parseFloat(token);
            if (!isNaN(numericToken)) {
              total += numericToken;
            } else {
              console.error("Token is not a valid number:", token);
            }
          } else {
            console.error("Token is not a number:", token);
          }
          if (typeof token2 === "number") {
            totalCarbon += token2;
          } else if (typeof token2 === "string") {
            // Convert the string to a number if possible
            let numericToken2 = parseFloat(token2);
            if (!isNaN(numericToken2)) {
              totalCarbon += numericToken2;
            } else {
              console.error("token2 is not a valid number:", token2);
            }
          } else {
            console.error("token2 is not a number:", token2);
          }
        }
        setTotalCarbonLimit(total);
        setTotalCarbonProduced(totalCarbon);
      }
    });
  }, []);
  var context = useContext(Datacontext);
  var { getfactory, factory } = context;
  const [limit, setlimit] = useState(0);
  const [produced, setproduced] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [piedata1, setpiedata1] = useState({
    labels: [],
    datasets: [
      {
        label: "Carbon Emission by",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [piedata2, setpiedata2] = useState({
    labels: [],
    datasets: [
      {
        label: "Carbon Emission by",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const totalCarbonEmissionLimit = factory.reduce(
    (total, entry) => total + parseInt(entry.CarbonEmissionLimit, 10),
    0
  );
  const totalCarbonEmission = factory.reduce(
    (total, entry) => total + parseInt(entry.CarbonEmissionsProduction, 10),
    0
  );
  const cardData = [
    {
      icon: MdGeneratingTokens,

      count: TotalCarbonProduced,
      text: "Total Carbon Limit",
    },

    {
      icon: FcFactory,
      count: totalCompanies,
      text: "Total Companies",
    },
    {
      icon: MdOutlineVerifiedUser,
      count: "45",
      text: "Reports Unverified",
    },
    {
      icon: MdPendingActions,
      count: "5",
      text: "Pending Approval",
    },
    {
      icon: BsWind,
      count: TotalCarbonLimit,
      text: "Total CO2 produced",
    },
  ];
  const top10ColorsRGBA = [
    "rgba(255, 99, 132, 0.3)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.3)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(153, 102, 255, 0.3)",
    "rgba(255, 159, 64, 0.4)",
    "rgba(0, 204, 102, 0.3)",
    "rgba(255, 99, 71, 0.4)",
    "rgba(255, 128, 0, 0.3)",
    "rgba(0, 128, 128, 0.4)",
  ];
  useEffect(() => {
    setlimit(totalCarbonEmissionLimit);
    setproduced(totalCarbonEmission);
    if (factory.length === 0) {
      getfactory();
      getfactory();
    }
    factory.sort(
      (a, b) =>
        parseInt(b.CarbonEmissionsProduction) -
        parseInt(a.CarbonEmissionsProduction)
    );
    const top10Highest = factory.slice(0, 10);
    const top10Lowest = factory.slice(-10);
    const companyNames1 = top10Highest.map((item) => item.CompanyName);
    const emissionsProduction1 = top10Highest.map((item) =>
      parseInt(item.CarbonEmissionsProduction)
    );
    setpiedata1({
      labels: companyNames1,
      datasets: [
        {
          label: "Carbon Emission by ",
          data: emissionsProduction1,
          backgroundColor: top10ColorsRGBA,
          borderColor: top10ColorsRGBA,
          borderWidth: 1,
        },
      ],
    });
    const companyNames2 = top10Lowest.map((item) => item.CompanyName);
    const emissionsProduction2 = top10Lowest.map((item) =>
      parseInt(item.CarbonEmissionsProduction)
    );
    setpiedata2({
      labels: companyNames2,
      datasets: [
        {
          label: "Carbon Emission by ",
          data: emissionsProduction2,
          backgroundColor: top10ColorsRGBA,
          borderColor: top10ColorsRGBA,
          borderWidth: 1,
        },
      ],
    });
    if (factory && factory.length > 0) {
      // Sort the data by the absolute difference between CarbonEmissionLimit and CarbonEmissionsProduction
      factory.sort(
        (a, b) =>
          Math.abs(
            parseInt(a.CarbonEmissionLimit) -
              parseInt(a.CarbonEmissionsProduction)
          ) -
          Math.abs(
            parseInt(b.CarbonEmissionLimit) -
              parseInt(b.CarbonEmissionsProduction)
          )
      );

      // Get the top 10 companies with the least difference
      const top10LeastDifference = factory.slice(0, 5);

      // Extract the relevant data for the chart
      const labels = top10LeastDifference.map((item) => item.CompanyName);
      const emissionLimits = top10LeastDifference.map((item) =>
        parseInt(item.CarbonEmissionLimit)
      );
      const emissionsProductions = top10LeastDifference.map((item) =>
        parseInt(item.CarbonEmissionsProduction)
      );

      // Create the chart data object
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "CarbonEmissionLimit",
            data: emissionLimits,
            backgroundColor: top10ColorsRGBA.slice(0, 5),
          },
          {
            label: "CarbonEmissionsProduction",
            data: emissionsProductions,
            backgroundColor: top10ColorsRGBA.slice(6, 10),
          },
        ],
      };

      setChartData(chartData);
    }
  }, [factory]);
  const header = [
    { name: "Company Name" },
    { name: "Carbon Produced" },
    { name: "Carbon Limits" },
    { name: "CarbonIndex" },
    { name: "City" },
  ];
  const data = [].concat(
    ...factory.map((marker) => {
      return {
        key: marker._id,
        id: marker._id,
        name: marker.CompanyName,
        limits: marker.CarbonEmissionLimit,
        issues: marker.CarbonEmissionsProduction,
        CarbonIndex: marker.CarbonIndex,
        City: marker.City,
      };
    })
  );

  var datas = data.sort(
    (a, b) =>
      parseInt(a.CarbonEmissionsProduction) -
      parseInt(b.CarbonEmissionsProduction)
  );
  const maintable = datas.slice(0, 10);
  return (
    <div className="flex justify-start gap-5">
      <Sidebar />
      <div class="p-4 sm:ml-64 w-full mt-10">
        <div class="p-4  rounded-lg dark:border-gray-700 mt-14">
          <div class="grid grid-cols-5 justify-center gap-4 mb-4">
            {cardData.map((data, index) => (
              <div
                key={index}
                class="grid items-center justify-center px-5 py-3 h-24 rounded bg-gray-50 dark:bg-gray-800"
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

          <div class="relative w-full mb-5  shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                  {header.map((data, index) => (
                    <th key={index} scope="col" class="px-6 py-3">
                      {data.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {maintable.map((data, index) => {
                  return (
                    <tr
                      key={data.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
                    >
                      <th
                        key="index"
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.name}
                      </th>
                      <td class="px-6 py-4">{data.issues}</td>

                      <td class="px-6 py-4">{data.limits} CAT</td>
                      <td class="px-6 py-4">{data.CarbonIndex}</td>
                      <td class="px-6 py-4">{data.City}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class=" items-center pb-3 bg-gray-50 px-1 dark:bg-gray-800">
              <h2 className="text-center text-2xl py-5 font-bold">
                Industries leading to Highest C02 emmission
              </h2>
              {/* <Pie data={piedata1} /> */}
              <PieChart />
            </div>

            <div class=" items-center pb-3 bg-gray-50 px-2 dark:bg-gray-800">
              <h2 className="text-center text-2xl py-5 font-bold">
                Issue Distribution Across Projects
              </h2>
              <Histogram />
            </div>
          </div>
          <div class=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
            <h1 className="text-center shadow-md text-2xl py-5 font-bold">
              Top 10 Companies with Highest Emissions
            </h1>
            <BarChart />
          </div>
          <div class=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
            <h1 className="text-center shadow-md text-2xl py-5 font-bold">
              Industries leading to Lowest C02 emmission
            </h1>
            <IndustryEmissionsChart />
          </div>
          <div className=" items-center  bg-gray-50 h-auto p-9 dark:bg-gray-800">
            <h2 className="text-center shadow-md text-2xl py-5 font-bold">
              Comparison of Limits and Issues Across Different Companies
            </h2>
            <CompanyCharts1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
