import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardCharts from "./components/Charts/DashboardCharts";
import UserManagement from "./components/managements/UserManagement";
import TrainManagement from "./components/managements/TrainManagement";
import BookingManagement from "./components/managements/BookingManagement";
import ProtectedRoute from "../login/ProtectedRoute";

export default function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 overflow-auto">
          <Routes>
            <Route
              path="dashboardchart"
              element={
                <ProtectedRoute adminOnly={true}>
                  <DashboardCharts />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="trains"
              element={
                <ProtectedRoute adminOnly={true}>
                  <TrainManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="bookings"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BookingManagement />
                </ProtectedRoute>
              }
            />
            {/* Default admin dashboard */}
            <Route index element={<DashboardCharts />} />
          </Routes>
          {/* Render any additional nested routes via Outlet if needed */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
