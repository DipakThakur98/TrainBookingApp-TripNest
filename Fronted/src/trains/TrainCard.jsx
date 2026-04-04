import React from "react";

export default function TrainCard({ train, onBook }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
      
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{train.name} ({train.number})</h2>
        
      </div>

     
      <div className="flex justify-between mt-2">
        <div>
          <p className="text-gray-700">{train.departure}</p>
          <p className="text-sm">{train.from}</p>
        </div>
        <p className="text-sm text-gray-500">{train.duration}</p>
        <div>
          <p className="text-gray-700">{train.arrival}</p>
          <p className="text-sm">{train.to}</p>
        </div>
      </div>

     
      <div className="flex gap-4 mt-3">
        {train.classes.map((cls, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg w-40 text-center"
          >
            <p className="font-medium">{cls.type}</p>
            <p
              className={`text-sm ${
                cls.status === "AVAILABLE" ? "text-green-600" : "text-red-500"
              }`}
            >
              {cls.status}
            </p>
            <p className="font-bold">₹ {cls.price}</p>
          </div>
        ))}
      </div>
      <button
          onClick={() => onBook(train)} // 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 m-3 rounded-lg"
        >
          Book Now
        </button>
    </div>
  );
}
