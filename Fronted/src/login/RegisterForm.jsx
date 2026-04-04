import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    email: "",
    countryCode: "+91 - India",
    mobile: "",
    captchaInput: "",
  });

  // Captcha state
  const [captcha, setCaptcha] = useState(generateCaptcha());

  // Generate random captcha
  function generateCaptcha() {
    const chars = "!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Captcha check
    if (form.captchaInput !== captcha) {
      alert("❌ Invalid captcha!");
      return;
    }

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          fullname: form.fullname,
          password: form.password,
          email: form.email,
          countryCode: form.countryCode,
          mobile: form.mobile,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        navigate("/loginform"); // redirect to login
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8 relative">
        {/* SIGN IN link */}
        <p
          onClick={() => navigate("/loginform")}
          className="absolute top-4 right-6 text-orange-500 font-semibold cursor-pointer hover:underline"
        >
          SIGN IN
        </p>

        <h2 className="text-2xl font-bold mb-2">Create Your IRCTC Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="User Name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />

          <select
            value={form.countryCode}
            onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option>+91 - India</option>
            <option>+1 - United States</option>
            <option>+44 - United Kingdom</option>
            <option>+61 - Australia</option>
          </select>

          <input
            type="text"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />

          {/* CAPTCHA */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-gray-200 rounded px-3 py-2 font-mono text-lg font-bold">
              {captcha}
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="text-blue-600 text-sm"
              >
                ↻
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={form.captchaInput}
              onChange={(e) =>
                setForm({ ...form, captchaInput: e.target.value })
              }
              required
              className="flex-1 border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-fit bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
