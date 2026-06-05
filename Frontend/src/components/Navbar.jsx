import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { HiMenu, HiX, HiUser } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 shadow-md fixed w-full top-0 left-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-gray-900">
        {/* Logo */}
        <div className="text-2xl font-bold">
          Trip<span className="text-green-500">Nest</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-bold text-gray-700">
          <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
          <li><Link to="/train" className="hover:text-green-500 transition-colors">Train</Link></li>
          <li><Link to="/flight" className="hover:text-green-500 transition-colors">Flight</Link></li>
          <li><Link to="/pnrstatus" className="hover:text-green-500 transition-colors">PNR Status</Link></li>
        </ul>

        {/* Desktop Login/Logout & Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link to="/loginform">
              <button className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-blue-400 border-none">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
                aria-label="User menu"
              >
                <HiUser className="w-6 h-6" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                  <Link to="/masterlist" className="block px-4 py-2 text-sm hover:bg-gray-100">Master List</Link>
                  <Link to="/mybooking" className="block px-4 py-2 text-sm hover:bg-gray-100">My Booking</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</Link>
                  <Link to="/support" className="block px-4 py-2 text-sm hover:bg-gray-100">Support</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2 text-gray-900">
          <ul className="space-y-2 font-semibold text-gray-700">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/train" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-5">
                Train
              </Link>
            </li>
            <li>
              <Link to="/flight" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-5">
                Flight
              </Link>
            </li>
            <li>
              <Link to="/pnrstatus" onClick={() => setIsMenuOpen(false)} className="block hover:text-green-5">
                PNR Status
              </Link>
            </li>
            {/* Mobile Login/Logout */}
            <div className="pt-2 border-t border-gray-200">
              {!user ? (
                <Link to="/loginform" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-blue-400 border-none">
                    Login
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-400 border-none"
                >
                  Logout
                </button>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
