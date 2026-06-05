import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-800 py-10 px-6 md:px-40 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold"><span className="text-black">Trip</span><span className="text-green-500">Nest</span></h2>
          <p className="mt-3 text-sm leading-relaxed">
            Making travel booking simple, secure, and enjoyable for millions of travelers worldwide.
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-[#3b5998] hover:bg-[#2d4478] text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-[#1da1f2] hover:bg-[#0d8ae5] text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-[#e1306c] hover:bg-[#b12455] text-white transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/in/dipak-thakur-630139215" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#e1ebf5] hover:bg-[#0A66C2] hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-400">Book Trains</a></li>
            <li><a href="#" className="hover:text-gray-400">Book Flights</a></li>
            <li><a href="#" className="hover:text-gray-400">My Bookings</a></li>
            <li><a href="#" className="hover:text-gray-400">Travel Insurance</a></li>
            <li><a href="#" className="hover:text-gray-400">Group Bookings</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-400">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Refund Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
          </ul>
        </div>


      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>© 2026 TripNest. All rights reserved.</p>
        <div className="mt-4">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-gray-600 hover:text-gray-800 underline">Back to Top</button>
        </div>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Cookie Policy</a>
          <a href="#" className="hover:text-gray-400">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
