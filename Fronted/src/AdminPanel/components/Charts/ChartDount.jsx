import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart() {
  const data = {
    labels: ["High Occupancy", "Medium", "Low"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#3B82F6", "#93C5FD", "#F87171"],
      },
    ],
  };

  return <Doughnut data={data} options={{ plugins: { legend: { position: "right" } } }} />;
}
