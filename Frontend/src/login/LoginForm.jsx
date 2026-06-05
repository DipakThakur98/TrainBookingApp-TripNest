import React, { useState, useEffect } from "react";
import { useAuth } from "../login/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Captcha generator – creates a 5‑character random string
const refreshCaptcha = () => {
  const chars = "!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const LoginForm = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || "/";
  const returnState = location.state?.returnState || null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(refreshCaptcha());

  // Redirect logged‑in users automatically
  useEffect(() => {
    if (user) {
      if (user.username?.toLowerCase() === "admin") {
        navigate("/dashboardchart");
      } else {
        navigate(returnTo, { state: returnState });
      }
    }
  }, [user, navigate, returnTo, returnState]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Enter credentials");
    if (captchaInput.trim().toLowerCase() !== captcha.toLowerCase())
      return alert("Captcha incorrect");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        login(data.user, data.token);
        // navigation handled by useEffect, but ensure immediate redirect
        if (data.user.username?.toLowerCase() === "admin") {
          navigate("/dashboardchart");
        } else {
          navigate(returnTo, { state: returnState });
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
        className="w-full bg-white border border-gray-300 p-2 rounded focus:border-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full border p-2 rounded pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          style={{ background: "transparent", border: "none", outline: "none" }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {/* Captcha section (side-by-side and more compact) */}
      <div className="flex space-x-2 items-center">
        {/* Captcha display */}
        <div className="flex items-center bg-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded border border-gray-300 w-2/5 select-none">
          <span className="tracking-widest font-mono text-center flex-grow text-lg">{captcha}</span>
          <button
            type="button"
            onClick={() => setCaptcha(refreshCaptcha())}
            className="ml-2 text-base text-gray-600 hover:text-green-600 focus:outline-none"
            style={{ background: "transparent", border: "none", outline: "none" }}
          >
            &#x21bb;
          </button>
        </div>
        {/* Captcha input */}
        <input
          type="text"
          placeholder="Enter Captcha"
          className="flex-1 border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />
      </div>
      <button
        onClick={handleSignIn}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
      >
        SIGN IN
      </button>
      <div className="flex space-x-2">
        <Link to="/registerform" state={location.state} className="flex-1">
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