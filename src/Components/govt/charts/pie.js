import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const PieChart = () => {
  const [data, setData] = useState([]);

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

  const getStatusCount = (data) => {
    const statusCount = {};
    data.forEach((item) => {
      statusCount[item.status] = statusCount[item.status]
        ? statusCount[item.status] + 1
        : 1;
    });
    return statusCount;
  };

  const statusCount = getStatusCount(data);

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Status",
        data: Object.values(statusCount),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "right",
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Pie Chart of Status</h2>
      <div style={{ height: "500px", width: "450px" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
