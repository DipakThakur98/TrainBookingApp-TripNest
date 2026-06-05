import React, { useState, useEffect } from "react";
import { useAuth } from "../login/AuthContext";
import { FaUserPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const STORAGE_KEY = "tripnest_master_passengers";

const emptyPassenger = () => ({
  id: Date.now(),
  name: "",
  age: "",
  gender: "",
  country: "IN",
  berth: "",
});

export default function MasterList() {
  const { user } = useAuth();
  const [passengers, setPassengers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newP, setNewP] = useState(emptyPassenger());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setPassengers(JSON.parse(stored));
  }, []);

  const save = (list) => {
    setPassengers(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const addPassenger = () => {
    if (!newP.name || !newP.age) {
      alert("Name and Age are required.");
      return;
    }
    save([...passengers, { ...newP, id: Date.now() }]);
    setNewP(emptyPassenger());
    setShowForm(false);
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setEditData({ ...p });
  };

  const saveEdit = () => {
    if (!editData.name || !editData.age) {
      alert("Name and Age are required.");
      return;
    }
    save(passengers.map((p) => (p.id === editId ? editData : p)));
    setEditId(null);
  };

  const deleteP = (id) => {
    if (window.confirm("Delete this passenger?"))
      save(passengers.filter((p) => p.id !== id));
  };

  const inputCls =
    "border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-orange-400";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e1628] px-4 py-10 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Master List
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Save passenger details once — select them instantly at booking.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <FaUserPlus /> Add Passenger
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="bg-white dark:bg-[#1a2540] border border-orange-300 rounded-xl p-5 mb-6 shadow">
            <h2 className="font-semibold text-gray-700 dark:text-white mb-4">
              New Passenger
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <input
                className={inputCls}
                placeholder="Full Name *"
                value={newP.name}
                onChange={(e) => setNewP({ ...newP, name: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder="Age *"
                type="number"
                min="1"
                max="120"
                value={newP.age}
                onChange={(e) => setNewP({ ...newP, age: e.target.value })}
              />
              <select
                className={inputCls}
                value={newP.gender}
                onChange={(e) => setNewP({ ...newP, gender: e.target.value })}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select
                className={inputCls}
                value={newP.berth}
                onChange={(e) => setNewP({ ...newP, berth: e.target.value })}
              >
                <option value="">Berth Preference</option>
                <option>LOWER</option>
                <option>MIDDLE</option>
                <option>UPPER</option>
                <option>SIDE LOWER</option>
                <option>SIDE UPPER</option>
              </select>
              <select
                className={inputCls}
                value={newP.country}
                onChange={(e) => setNewP({ ...newP, country: e.target.value })}
              >
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addPassenger}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => { setShowForm(false); setNewP(emptyPassenger()); }}
                className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded text-sm"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Passenger list */}
        {passengers.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <FaUserPlus size={40} className="mx-auto mb-4 opacity-40" />
            <p>No passengers saved yet. Click "Add Passenger" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {passengers.map((p) =>
              editId === p.id ? (
                // Edit row
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#1a2540] border border-orange-300 rounded-xl p-4 shadow"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <input
                      className={inputCls}
                      placeholder="Full Name *"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                    <input
                      className={inputCls}
                      placeholder="Age *"
                      type="number"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                    />
                    <select
                      className={inputCls}
                      value={editData.gender}
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <select
                      className={inputCls}
                      value={editData.berth}
                      onChange={(e) =>
                        setEditData({ ...editData, berth: e.target.value })
                      }
                    >
                      <option value="">Berth Preference</option>
                      <option>LOWER</option>
                      <option>MIDDLE</option>
                      <option>UPPER</option>
                      <option>SIDE LOWER</option>
                      <option>SIDE UPPER</option>
                    </select>
                    <select
                      className={inputCls}
                      value={editData.country}
                      onChange={(e) =>
                        setEditData({ ...editData, country: e.target.value })
                      }
                    >
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded text-sm"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="flex items-center gap-1 bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display row
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#1a2540] rounded-xl px-5 py-4 shadow flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {p.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Age: {p.age} • {p.gender || "N/A"} • Berth:{" "}
                      {p.berth || "No Preference"} • {p.country}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteP(p.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
