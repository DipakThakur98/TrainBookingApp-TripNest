import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Form state
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    email: "",
    countryCode: "+91 - India",
    mobile: "",
    otp: "",
    captchaInput: "",
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Verification states
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Captcha state
  const [captcha, setCaptcha] = useState(generateCaptcha());

  // Generate random captcha
  function generateCaptcha() {
    const chars = "!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  // Handle sending OTP
  const handleSendOTP = async () => {
    if (!form.email) {
      alert("❌ Please enter your email first!");
      return;
    }
    setOtpLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        if (data.otp) {
          console.log("OTP code received:", data.otp);
          alert(`✅ OTP sent successfully! (Dev Mode: OTP is ${data.otp})`);
          // Auto-fill OTP for fast development testing experience
          setForm((prev) => ({ ...prev, otp: data.otp }));
        } else {
          alert("✅ OTP sent successfully! Please check your email.");
        }
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error sending OTP!");
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password strength check
    const passwordRegex = /[@&$]/;
    if (form.password.length < 8 || !passwordRegex.test(form.password)) {
      alert("❌ Password must be at least 8 characters long and contain at least one special symbol (@, &, $)");
      return;
    }

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

    // OTP Check
    if (!form.otp) {
      alert("❌ Please enter the OTP sent to your email!");
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
          otp: form.otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        navigate("/loginform", { state: location.state }); // redirect to login with state
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
          onClick={() => navigate("/loginform", { state: location.state })}
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

          {/* Password field with eye toggle & green check */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full border p-2 rounded pr-16"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
              {form.password && form.password === form.confirmPassword && (
                <FaCheck className="text-green-500" />
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                style={{ background: "transparent", border: "none", outline: "none" }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {form.password && (
            <p className={`text-xs ${form.password.length >= 8 && /[@&$]/.test(form.password) ? 'text-green-600 font-semibold' : 'text-orange-600 font-medium'}`}>
              {form.password.length >= 8 && /[@&$]/.test(form.password)
                ? "✓ Strong Password!"
                : "⚠️ Password must be at least 8 characters and include @, &, or $"}
            </p>
          )}

          {/* Confirm Password field with eye toggle & green check */}
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
              className="w-full border p-2 rounded pr-16"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
              {form.password && form.password === form.confirmPassword && (
                <FaCheck className="text-green-500" />
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                style={{ background: "transparent", border: "none", outline: "none" }}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="flex-1 border p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={otpLoading}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 rounded text-sm disabled:opacity-50"
            >
              {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>

          {/* OTP Input Field */}
          {otpSent && (
            <input
              type="text"
              placeholder="Enter Email OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
              required
              className="w-full border border-green-500 bg-green-50 p-2 rounded focus:outline-none focus:ring-1 focus:ring-green-500 transition-all duration-300"
            />
          )}

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
