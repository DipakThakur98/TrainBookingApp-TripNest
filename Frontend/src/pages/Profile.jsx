import React, { useEffect } from "react";
import { useAuth } from "../login/AuthContext";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

export default function Profile() {
  const { user, logout } = useAuth();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0e1628]">
        <p className="text-gray-700 dark:text-gray-200">
          You must be logged in to view your profile. Please{' '}
          <Link to="/loginform" className="text-blue-500 hover:underline">
            login
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#0e1628] py-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-center text-white">
          <h1 className="text-3xl font-semibold">Welcome, {user.name || "User"}!</h1>
        </div>

        {/* Body */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-4xl text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-100">
              {user.name || "Anonymous"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/mybooking"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
            >
              My Bookings
            </Link>
            <Link
              to="/settings"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
              Account Settings
            </Link>
            <button
              onClick={logout}
              className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              <HiOutlineLogout className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
