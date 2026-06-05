import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateTicketPdf } from "../utils/generateTicketPdf";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, pnr } = location.state || {};

  // Auto‑redirect home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate("/", { replace: true }), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!bookingData) {
    return (
      <div className="p-6 text-center">
        <p>No booking data available.</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { train, passengers, contact, fareBreakdown } = bookingData;
  const { ticketFarePerPassenger, convenienceFee, insuranceFee, totalFare } = fareBreakdown;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful 🎉</h2>
      <p><strong>PNR:</strong> {pnr}</p>
      <p><strong>Train:</strong> {train?.['Train Name']} ({train?.['Train No']})</p>
      <p><strong>Route:</strong> {train?.From} → {train?.To} • {train?.selectedClass}</p>

      <h3 className="mt-4 font-semibold">Passengers</h3>
      <ul className="list-disc list-inside mb-4">
        {passengers.map((p, i) => (
          <li key={i}>#{i + 1} {p.name}, Age: {p.age}, Gender: {p.gender || "-"}, Berth: {p.berth || "Any"}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Fare Summary</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <span>Ticket Fare ({passengers.length} × {train?.selectedClass})</span>
        <span>₹ {(ticketFarePerPassenger * passengers.length).toFixed(2)}</span>
        <span>Convenience Fee</span>
        <span>₹ {convenienceFee.toFixed(2)}</span>
        <span>Travel Insurance</span>
        <span>₹ {insuranceFee.toFixed(2)}</span>
        <strong>Total</strong>
        <strong>₹ {totalFare.toFixed(2)}</strong>
      </div>

      <button
        onClick={() => generateTicketPdf(bookingData, pnr)}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
      >
        Download Ticket PDF
      </button>

      <p className="mt-4 text-sm text-gray-600">You will be redirected to the Home page shortly…</p>
    </div>
  );
}
