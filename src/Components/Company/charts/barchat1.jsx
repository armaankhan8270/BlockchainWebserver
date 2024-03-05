import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const GroupedBarChart = () => {
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

  const getCompaniesByIndustry = (data, industry) => {
    return data.filter((company) => company.industry === industry);
  };

  const automobileCompanies = getCompaniesByIndustry(data, "Automobile");
  const otherCompanies = getCompaniesByIndustry(data, "Other");

  const chartData = {
    labels: ["Limits", "Issues"],
    datasets: [
      {
        label: "Automobile",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: [
          automobileCompanies.reduce((sum, company) => sum + company.limits, 0),
          automobileCompanies.reduce((sum, company) => sum + company.issues, 0),
        ],
      },
      {
        label: "Other Industries",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: [
          otherCompanies.reduce((sum, company) => sum + company.limits, 0),
          otherCompanies.reduce((sum, company) => sum + company.issues, 0),
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Limits vs. Issues: Automobile Industry vs. Other Industries</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GroupedBarChart;
