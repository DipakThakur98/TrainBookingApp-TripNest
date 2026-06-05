import React from "react";

export default function Filter({ onFilterChange }) {
  return (
    <div className="w-1/4 bg-white p-4 border rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Quick Filters</h3>
      <div>
        <label>
          <input type="checkbox" onChange={() => onFilterChange("Sleeper")} /> Sleeper (SL)
        </label>
        <br />
        <label>
          <input type="checkbox" onChange={() => onFilterChange("AC 2 Tier")} /> AC 2 Tier (2A)
        </label>
        <br />
        <label>
          <input type="checkbox" onChange={() => onFilterChange("AC 3 Tier")} /> AC 3 Tier (3A)
        </label>
      </div>
    </div>
  );
}
