import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Revenue (in ₹L)",
        data: [65, 59, 80, 81, 56, 75, 90, 100],
        backgroundColor: "rgba(222, 229, 82, 0.7)", // Blue bars
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#111827" },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#E5E7EB" },
        ticks: { color: "#6B7280" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
