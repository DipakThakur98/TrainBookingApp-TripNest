import React from "react";

const kpiData = [
  { title: "Total Users", value: "1,234", sub: "+5% from last month" },
  { title: "Total Bookings", value: "567", sub: "+3% from last month" },
  { title: "Active Trains", value: "89", sub: "+2% from last month" },
  { title: "Revenue", value: "$12,345", sub: "+8% from last month" },
  { title: "New Signups", value: "123", sub: "+10% from last month" },
  { title: "Support Tickets", value: "45", sub: "-4% from last month" },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
        >
          <div className="text-sm text-gray-500">{item.title}</div>
          <div className="text-2xl font-bold mt-1 text-gray-800">
            {item.value}
          </div>
          <div
            className={`text-xs mt-1 ${
              item.sub.includes("-") ? "text-red-600" : "text-green-600"
            }`}
          >
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
