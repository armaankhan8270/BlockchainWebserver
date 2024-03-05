import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const IndustryEmissionsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/comp/")
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const getIndustryEmissions = (data) => {
    const industryEmissions = {};
    data.forEach((item) => {
      const industry = item.industry;
      if (!industryEmissions[industry]) {
        industryEmissions[industry] = 0;
      }
      industryEmissions[industry] += Math.log(item.limits); // Compute logarithm of emissions
    });
    return industryEmissions;
  };

  const industryEmissions = getIndustryEmissions(data);
  const chartData = {
    labels: Object.keys(industryEmissions),
    datasets: [
      {
        label: "Logarithmic Total Emissions",
        data: Object.values(industryEmissions),
        backgroundColor: [
          "rgba(175, 192, 192, 0.5)",
          "rgba(175, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)", // Colorful
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)", // Colorful
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
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

  return (
    <div>
      <h2>Logarithmic Total Emissions by Industry</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default IndustryEmissionsChart;
