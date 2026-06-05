import React from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <ul className="space-y-4 text-lg">
        <li>
          <Link to="/settings/privacy" className="text-blue-600 hover:underline">
            Privacy &amp; Security
          </Link>
        </li>
        <li>
          <Link to="/settings/password" className="text-blue-600 hover:underline">
            Change Password
          </Link>
        </li>
        <li>
          <Link to="/settings/profile-verify" className="text-blue-600 hover:underline">
            Verify Profile
          </Link>
        </li>
        <li>
          <Link to="/settings/documents" className="text-blue-600 hover:underline">
            Link Documents (e.g., Aadhar)
          </Link>
        </li>
      </ul>
    </div>
  );
}
