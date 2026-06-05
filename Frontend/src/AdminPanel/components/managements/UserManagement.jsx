import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../login/AuthContext"; // correct relative path

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    countryCode: "",
    mobile: ""
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/all");
      setUsers(res.data);
      setFilteredUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      countryCode: user.countryCode,
      mobile: user.mobile
    });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        formData
      );
      alert(res.data.message || "User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user");
    }
  };

  if (!user || user.role !== "admin") {
    return <p className="text-red-600 text-center mt-10">❌ You are not authorized to view this page.</p>;
  }

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6 md:p-10 bg-white-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        👥 User Management Dashboard
      </h2>

      {/* Search */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="min-w-full border text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Full Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Registered At</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{u.username}</td>
                  <td className="p-2">{u.fullname}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">(+{u.countryCode || "91"}) {u.mobile}</td>
                  <td className="p-2">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(u)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
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

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-md w-96 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Edit User: {editingUser.username}
            </h3>

            <label className="block mb-2">
              <span className="font-semibold">Full Name:</span>
              <input
                name="fullname"
                value={formData.fullname}
                onChange={handleEditChange}
                required
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block mb-2">
              <span className="font-semibold">Email:</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleEditChange}
                required
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block mb-2">
              <span className="font-semibold">Country Code:</span>
              <input
                name="countryCode"
                value={formData.countryCode}
                onChange={handleEditChange}
                required
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block mb-4">
              <span className="font-semibold">Mobile:</span>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleEditChange}
                required
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
