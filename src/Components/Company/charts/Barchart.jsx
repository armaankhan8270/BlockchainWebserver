import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

const CompanyCharts1 = ({ chartType }) => {
  const [data, setData] = useState([
    {
      id: "1",
      companyName: "Apple",
      industry: "Automobile",
      type: "Org",
      project_details: "https://details/",
      status: "pending",
      limits: 45151,
      issues: 812,
      eligibility: "No",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/comp/")
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to get company names
  const getCompanyNames = () => {
    return data.map((company) => company.companyName);
  };

  // Function to get limits data for all companies
  const getLimitsData = () => {
    return data.map((company) => company.limits);
  };

  // Function to get issues data for all companies
  const getIssuesData = () => {
    return data.map((company) => company.issues);
  };

  const chartData = {
    labels: getCompanyNames(),
    datasets: [
      {
        label: "Limits",
        data: getLimitsData(),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Issues",
        data: getIssuesData(),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const ChartComponent = chartType === "bar" ? Bar : Line;

  return (
    <div>
      <h2>Comparison of Limits and Issues Across Different Companies</h2>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default CompanyCharts1;
