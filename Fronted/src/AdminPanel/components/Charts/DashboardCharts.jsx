import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useAuth } from "../../../login/AuthContext";
import ChartLine from "./ChartLine";
import ChartDonut from "./ChartDount";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardCharts() {
  const { user } = useAuth();

  // KPI Data
  const kpiData = [
    { title: "Total Users", value: "1,234", sub: "+5% from last month" },
  { title: "Total Bookings", value: "567", sub: "+3% from last month" },
  { title: "Active Trains", value: "89", sub: "+2% from last month" },
  { title: "Revenue", value: "$12,345", sub: "+8% from last month" },
  { title: "New Signups", value: "123", sub: "+10% from last month" },
  { title: "Support Tickets", value: "45", sub: "-4% from last month" },
  ];



 return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">
            Welcome, {user?.username || "Administrator"}
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiData.map((kpi, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="text-sm text-gray-500">{kpi.title}</div>
                <div className="text-3xl font-bold mt-1">{kpi.value}</div>
                <div className="text-xs text-green-600 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-2">Booking Trends</h2>
              <ChartLine />
            </div>

            <div className="bg-white p-8 rounded-xl shadow border">
              <h2 className="text-lg font-semibold">Train Occupancy</h2>
              <ChartDonut />
            </div>

            {/* Optionally extra charts */}
            <div className="bg-white p-6 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-2">Revenue Growth</h2>
              <BarChart />
              
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h2 className="text-lg font-semibold mb-2">User Distribution</h2>
              <PieChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}