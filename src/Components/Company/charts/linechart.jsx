import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";

const CompanyCharts = () => {
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

  // Function to extract data for a particular company
  const getCompanyData = (companyName, attribute) => {
    const company = data.find((company) => company.companyName === companyName);
    return company ? company[attribute] : [];
  };

  // Data for the Line Chart
  const companyTimeSeriesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Limits Over Time",
        data: getCompanyData("Example Company", "limitsOverTime"),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Issues Over Time",
        data: getCompanyData("Example Company", "issuesOverTime"),
        fill: false,
        borderColor: "rgba(255,0,0,1)",
        tension: 0.1,
      },
    ],
  };

  // Data for the Grouped Bar Chart
  const companyLimitsVsIssuesData = {
    labels: ["Limits", "Issues"],
    datasets: [
      {
        label: "Limits",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: getCompanyData("Example Company", "limitsVsIssues"),
      },
      {
        label: "Issues",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: getCompanyData("Example Company", "issuesVsLimits"),
      },
    ],
  };

  return (
    <div>
      <h2>Time-series Analysis for Example Company</h2>
      <Line data={companyTimeSeriesData} />
      <h2>Limits vs. Issues for Example Company</h2>
      <Bar data={companyLimitsVsIssuesData} />
    </div>
  );
};

export default CompanyCharts;
