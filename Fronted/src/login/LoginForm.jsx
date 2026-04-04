import React, { useState, useEffect } from "react";
import { useAuth } from "../login/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // ---------------- Captcha ----------------
  const refreshCaptcha = () => {
    const chars = "!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  // ---------------- State ----------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(refreshCaptcha());
  const [otpLogin, setOtpLogin] = useState(false);

 
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // ---------------- Handle Sign In ----------------
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!username || !password) return alert("Enter credentials");
    if (captchaInput.trim().toLowerCase() !== captcha.toLowerCase()) return alert("Captcha incorrect");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        login(data.user,data.token);

        if (data.user.username.toLowerCase() === "admin") {
          navigate("/dashboardchart");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Please check if the backend is running.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20 border rounded-md shadow-md space-y-4">
      <h2 className="text-blue-600 font-bold text-center text-xl">Welcome to TripNest</h2>

      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Captcha */}
      <div className="flex items-center bg-blue-900 text-white font-semibold px-3 py-2 rounded-t-md">
        <span className="flex-grow text-center">{captcha}</span>
        <button
          type="button"
          onClick={() => setCaptcha(refreshCaptcha())}
          className="ml-2 text-xl hover:text-green-400"
        >
          &#x21bb;
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter Captcha"
        className="w-full border border-gray-300 rounded-b-md p-2"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
      />

      {/* OTP Checkbox */}
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          checked={otpLogin}
          onChange={() => setOtpLogin(!otpLogin)}
          className="h-4 w-4 text-blue-600"
        />
        <span className="text-gray-700 text-sm">Login & Booking With OTP</span>
      </label>

      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
      >
        SIGN IN
      </button>

      {/* Register & Agent */}
      <div className="flex space-x-2">
        <Link to="/registerform" className="flex-1">
          <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded">
            REGISTER
          </button>
        </Link>
        <button className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded">
          AGENT LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
