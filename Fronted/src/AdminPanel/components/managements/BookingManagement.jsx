import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Booking Management Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto w-100">
          <table className="min-w-[1200px] w-full bg-white border rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border text-left font-semibold">User</th>
                <th className="px-4 py-2 border text-left font-semibold">Booking Type</th>
                <th className="px-4 py-2 border text-left font-semibold">Train No</th>
                <th className="px-4 py-2 border text-left font-semibold">Train Name</th>
                <th className="px-4 py-2 border text-left font-semibold">Date</th>
                <th className="px-4 py-2 border text-left font-semibold">Time</th>
                <th className="px-4 py-2 border text-left font-semibold">PNR</th>
                <th className="px-4 py-2 border text-left font-semibold">Source</th>
                <th className="px-4 py-2 border text-left font-semibold">Destination</th>
                <th className="px-4 py-2 border text-left font-semibold">Status</th>
                <th className="px-4 py-2 border text-left font-semibold">Payment Mode</th>
                <th className="px-4 py-2 border text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center p-4 text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-3 py-2 border">{b.passengers?.[0]?.name || "N/A"}</td>
                    <td className="px-3 py-2 border">{b.type}</td>
                    <td className="px-3 py-2 border">{b.train?.TrainNo}</td>
                    <td className="px-3 py-2 border">{b.train?.TrainName}</td>
                    <td className="px-3 py-2 border">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="px-3 py-2 border">{new Date(b.createdAt).toLocaleTimeString()}</td>
                    <td className="px-3 py-2 border">{b.pnrNumber}</td>
                    <td className="px-3 py-2 border">{b.train?.From}</td>
                    <td className="px-3 py-2 border">{b.train?.To}</td>
                    <td className="px-3 py-2 border">{b.status}</td>
                    <td className="px-3 py-2 border">{b.paymentMode}</td>
                    <td className="px-3 py-2 border">
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
