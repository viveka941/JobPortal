import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile"; // Import the UserProfile component
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const {user} = useSelector((store) => store.auth); // Access user data from Redux store
 
  return (
    <div className="bg-white shadow-sm ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Job <span className="text-blue-600">Portal</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="flex items-center space-x-6 font-medium text-gray-700">
            {user && user.role === "Recruiter" ? (
              // Links for Recruiter
              <>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/admin/companies">Company</Link>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/admin/jobs">Jobs </Link>
                </li>
              </>
            ) : (
              // Links for Non-Recruiter (Guest or Candidate)
              <>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/browse">Browse</Link>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/jobs">Jobs</Link>
                </li>
                {!user && ( // Show Register link only if user is not logged in
                  <li className="hover:text-blue-600 transition duration-200">
                    <Link to="/register">Register</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* User Profile Section */}
        {user ? ( // Show UserProfile only if user is logged in
          <UserProfile />
        ) : (
          // Show Login link if user is not logged in
          <Link
            to="/login"
            className="hover:text-blue-600 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
