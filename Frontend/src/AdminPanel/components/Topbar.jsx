import React from "react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">Welcome back, Administrator</div>
      </div>
      <div className="flex items-center gap-4">
        {/* <button className="relative">
          <span className="sr-only">Notifications</span>
          🔔
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button> */}
        <div className="flex items-center gap-2">
          {/* <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full" alt="avatar"/> */}
          <div className="text-sm">Admin
            <div className="font-medium">TripNest</div>
            <div className="text-xs text-gray-500">System Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}