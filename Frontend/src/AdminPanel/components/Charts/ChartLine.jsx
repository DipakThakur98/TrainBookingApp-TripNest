import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bookings",
        data: [2400, 2900, 3100, 2800, 2700, 2500, 2600,3300],
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.1)",
        filler: true,
      },
    ],
  };

  return <Line data={data} options={{ plugins: { legend: { display: false } } }} />;
}
