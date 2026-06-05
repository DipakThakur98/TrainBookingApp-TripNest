import React from "react";

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-[#1e293b] rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Customer Support</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Need assistance? We're here to help you with any issues related to your bookings, account, or the TripNest platform.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Email:</strong> support@tripnest.com</li>
          <li><strong>Phone:</strong> +1 (800) 123-4567 (available 9am‑6pm IST)</li>
          <li><strong>Live Chat:</strong> Click the chat widget at the bottom right of the screen.</li>
        </ul>
        <div className="mt-6 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Open Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
