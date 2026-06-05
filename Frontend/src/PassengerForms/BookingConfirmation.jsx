import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No booking found!</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">🎉 Booking Confirmed!</h2>

      <div className="space-y-2">
        <p><strong>PNR:</strong> {booking.pnrNumber}</p>
        <p><strong>Train No:</strong> {booking.train?.TrainNo}</p>
        <p><strong>Train Name:</strong> {booking.train?.TrainName}</p>
        <p><strong>From:</strong> {booking.train?.From}</p>
        <p><strong>To:</strong> {booking.train?.To}</p>
        <p><strong>Payment Mode:</strong> {booking.paymentMode}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Passengers:</h3>
        <ul className="list-disc ml-6">
          {booking.passengers.map((p, i) => (
            <li key={i}>
              {p.name} ({p.age}, {p.gender}) - {p.berth || "No berth selected"}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
