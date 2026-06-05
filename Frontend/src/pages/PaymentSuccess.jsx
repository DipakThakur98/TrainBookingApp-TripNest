import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTicketPdf } from "../utils/generateTicketPdf";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    // Retrieve booking data saved before Stripe redirect
    const raw = localStorage.getItem("bookingData");
    if (!raw) {
      setStatus("no-data");
      setTimeout(() => navigate("/", { replace: true }), 3000);
      return;
    }

    const bookingData = JSON.parse(raw);

    // Generate PNR (numeric format: XXX-XXXXXXX)
    const pnrPart1 = Math.floor(100 + Math.random() * 900);
    const pnrPart2 = Math.floor(1000000 + Math.random() * 9000000);
    const pnr = `${pnrPart1}-${pnrPart2}`;

    // Save completed booking to tripnest_bookings for My Booking page
    const completedBooking = {
      ...bookingData,
      pnr,
      paymentTime: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("tripnest_bookings") || "[]");
    existing.push(completedBooking);
    localStorage.setItem("tripnest_bookings", JSON.stringify(existing));

    // Auto-download PDF ticket
    generateTicketPdf(bookingData, pnr);

    // Clear temporary bookingData
    localStorage.removeItem("bookingData");

    setStatus("done");

    // Redirect to home after 3 seconds
    setTimeout(() => navigate("/", { replace: true }), 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your booking...</p>
          </>
        )}
        {status === "done" && (
          <>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-1">Your ticket PDF has been downloaded.</p>
            <p className="text-gray-400 text-sm">Redirecting to home page...</p>
          </>
        )}
        {status === "no-data" && (
          <>
            <p className="text-gray-500">No booking data found. Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
}
