import React, { useEffect, useState } from "react";
import axios from "axios";

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [form, setForm] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [editing, setEditing] = useState(null);

  const stations = [
    "Mumbai (CSMT)",
    "Delhi (NDLS)",
    "Chennai (MAS)",
    "Kolkata (HWH)",
    "Patna (PNBE)",
    "Ahmedabad (ADI)",
    "Bangalore (SBC)",
    "Jaipur (JP)",
    "Lucknow (LKO)",
  ];

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    const res = await axios.get("http://localhost:5000/api/trains");
    setTrains(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/api/trains/${editing}`, form);
      setEditing(null);
    } else {
      await axios.post("http://localhost:5000/api/trains", form);
    }
    setForm({
      trainNumber: "",
      trainName: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
    });
    fetchTrains();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this train?")) return;
    await axios.delete(`http://localhost:5000/api/trains/${id}`);
    fetchTrains();
  };

  const handleEdit = (train) => {
    setForm(train);
    setEditing(train._id);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">🚆 Train Management Dashboard</h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-white p-1 rounded-lg shadow-md mb-6"
      >
        <input
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="trainNumber"
          placeholder="Train Number"
          value={form.trainNumber}
          onChange={(e) => setForm({ ...form, trainNumber: e.target.value })}
          required
        />
        <input
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="trainName"
          placeholder="Train Name"
          value={form.trainName}
          onChange={(e) => setForm({ ...form, trainName: e.target.value })}
          required
        />
        <select
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="source"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          required
        >
          <option value="">Select Source</option>
          {stations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          required
        >
          <option value="">Select Destination</option>
          {stations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="departureTime"
          placeholder="Departure Time"
          value={form.departureTime}
          onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
          required
        />
        <input
          className="border p-2 h-10 mt-1 rounded flex-1 min-w-[120px]"
          name="arrivalTime"
          placeholder="Arrival Time"
          value={form.arrivalTime}
          onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
          required
        />

        <button
          type="submit"
          className={`py-2 px-5 rounded  font-semibold mt-1 ${
            editing ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition`}
        >
          {editing ? "Update Train" : "Add Train"}
        </button>
      </form>

      {/* Train Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="p-2 text-left">Train No</th>
              <th className="p-2 text-left">Train Name</th>
              <th className="p-2 text-left">Source</th>
              <th className="p-2 text-left">Destination</th>
              <th className="p-2 text-left">Departure</th>
              <th className="p-2 text-left">Arrival</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No trains found.
                </td>
              </tr>
            ) : (
              trains.map((t) => (
                <tr key={t._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{t.trainNumber}</td>
                  <td className="p-2">{t.trainName}</td>
                  <td className="p-2">{t.source}</td>
                  <td className="p-2">{t.destination}</td>
                  <td className="p-2">{t.departureTime}</td>
                  <td className="p-2">{t.arrivalTime}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
    </div>
  );
};

export default TrainManagement;





