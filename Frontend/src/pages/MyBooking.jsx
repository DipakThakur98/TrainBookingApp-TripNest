import React, { useState, useEffect } from "react";
import { generateTicketPdf } from "../utils/generateTicketPdf";
import { FaDownload, FaTrash, FaTicketAlt } from "react-icons/fa";

const BOOKINGS_KEY = "tripnest_bookings";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const handleDownloadPdf = (booking) => {
    const { pnr, train, passengers, contact, fareBreakdown } = booking;
    generateTicketPdf({ train, passengers, contact, fareBreakdown }, pnr);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this booking record?")) return;
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  };

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e1628] px-4 py-10 mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Bookings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your past bookings and download tickets.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24">
            <FaTicketAlt size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No bookings yet. Book a train to see your tickets here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a2540] rounded-xl shadow p-5 border border-gray-100 dark:border-gray-700"
              >
                {/* Top Row — PNR + Date + Actions */}
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">PNR</span>
                    <p className="text-lg font-bold text-orange-600">{b.pnr}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Booked on</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(b.paymentTime)}</p>
                  </div>
                </div>

                {/* Train Info */}
                <div className="bg-gray-50 dark:bg-[#0e1628] rounded-lg p-3 mb-3">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {b.train?.['Train Name']} ({b.train?.['Train No']})
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {b.train?.From} → {b.train?.To} • Class: {b.train?.selectedClass}
                  </p>
                </div>

                {/* Passengers */}
                <div className="mb-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Passengers</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {b.passengers?.map((p, i) => (
                      <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
                        {i + 1}. {p.name} — Age: {p.age}, {p.gender || "N/A"}, Berth: {p.berth || "Any"}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Fare + Contact */}
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>Total Fare: <strong className="text-gray-800 dark:text-white">₹ {b.fareBreakdown?.totalFare?.toFixed(2)}</strong></span>
                  <span>Contact: {b.contact?.mobile} | {b.contact?.email}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleDownloadPdf(b)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <FaDownload /> Download Ticket PDF
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
