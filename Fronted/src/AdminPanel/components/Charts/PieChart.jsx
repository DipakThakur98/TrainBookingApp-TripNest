import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: ["AC Coaches", "Sleeper Coaches", "General Coaches"],
    datasets: [
      {
        label: "Coach Distribution",
        data: [25, 45, 30],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { color: "#374151" } },
      tooltip: { backgroundColor: "#111827" },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
