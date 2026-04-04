import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-gray-300 py-10 px-6 md:px-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500">TravelEase</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Making travel booking simple, secure, and enjoyable for millions of travelers worldwide.
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Book Trains</a></li>
            <li><a href="#" className="hover:text-blue-400">Book Flights</a></li>
            <li><a href="#" className="hover:text-blue-400">My Bookings</a></li>
            <li><a href="#" className="hover:text-blue-400">Travel Insurance</a></li>
            <li><a href="#" className="hover:text-blue-400">Group Bookings</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Refund Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to get special offers and travel tips.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className=" px-2 py-2 rounded-l-lg bg-gray-800 text-gray-200 "
            />
            <button className="px-1 p-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg text-white gap-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>© 2025 TripNest. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Cookie Policy</a>
          <a href="#" className="hover:text-blue-400">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
