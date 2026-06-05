import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function DetailsCard({ date, setDate, classType, setClassType, seatType, setSeatType }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border rounded-xl p-4 bg-white shadow">
      {/* Date */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">Date</span>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-orange-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-lg font-semibold border-none focus:ring-0 bg-transparent w-full"
          />
        </div>
      </div>

      {/* Class */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">Class</span>
        <select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          className="text-lg font-semibold border-none focus:ring-0 bg-transparent w-full"
        >
          <option value="3A">3A - AC 3 Tier</option>
          <option value="2A">2A - AC 2 Tier</option>
          <option value="1A">1A - AC 1 Tier</option>
          <option value="SL">SL - Sleeper</option>
        </select>
      </div>

      {/* Seat Type */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">Seat Type</span>
        <select
          value={seatType}
          onChange={(e) => setSeatType(e.target.value)}
          className="text-lg font-semibold border-none focus:ring-0 bg-transparent text-orange-600 w-full"
        >
          <option value="General">GENERAL</option>
          <option value="Tatkal">TATKAL</option>
          <option value="Ladies">LADIES</option>
        </select>
      </div>
    </div>
  );
}
