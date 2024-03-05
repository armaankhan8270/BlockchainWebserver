import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const Histogram = () => {
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

  const getProjectIssuesDistribution = (data) => {
    const projectIssues = {};
    data.forEach((item) => {
      const projectName = item.companyName;
      if (!projectIssues[projectName]) {
        projectIssues[projectName] = 0;
      }
      projectIssues[projectName] += Math.log(item.issues); // Compute logarithm of issue count
    });
    return projectIssues;
  };

  const projectIssuesDistribution = getProjectIssuesDistribution(data);

  const chartData = {
    labels: Object.keys(projectIssuesDistribution),
    datasets: [
      {
        label: "Logarithmic Issue Count",
        data: Object.values(projectIssuesDistribution),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#333", // Adjust font color
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#333", // Adjust font color
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0.1)", // Adjust grid line color
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Issue Distribution Across Projects (Logarithmic)
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div style={{ height: "400px", width: "100%" }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default Histogram;
