import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          Trip<span className="text-green-500">Nest</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/train">Train</Link></li>
          <li><Link to="/flight">Flight</Link></li>
          <li><Link to="/pnrstatus">PNR Status</Link></li>
        </ul>

        {/* Desktop Login/Logout */}
        <div className="hidden md:flex items-center space-x-2">
          {!user ? (
            <Link to="/loginform">
              <button className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-blue-400">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-400"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          <ul className="space-y-2 font-semibold">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-green-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/train"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-green-500"
              >
                Train
              </Link>
            </li>
            <li>
              <Link
                to="/flight"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-green-500"
              >
                Flight
              </Link>
            </li>
            <li>
              <Link
                to="/pnrstatus"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-green-500"
              >
                PNR Status
              </Link>
            </li>
          </ul>

          {/* Mobile Login/Logout */}
          <div className="pt-2 border-t border-gray-200">
            {!user ? (
              <Link to="/loginform" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-blue-400">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
