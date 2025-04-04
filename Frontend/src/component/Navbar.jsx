import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile"; // Import the UserProfile component
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth); // Access user data from Redux store
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div>
          <Logo />
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-blue-200 focus:outline-none bg-blue-100"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:block">
          <ul className="flex items-center space-x-6 font-medium text-gray-700">
            {user && user.role === "Recruiter" ? (
              // Links for Recruiter
              <>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/admin/companies">Company</Link>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <Link to="/admin/jobs">Jobs</Link>
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

        {/* User Profile Section - Desktop */}
        <div className="hidden md:block">
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-orange-100 to-blue-300 shadow-lg md:hidden z-50">
            <div className="px-4 py-3 space-y-3">
              {user && user.role === "Recruiter" ? (
                // Mobile Links for Recruiter
                <>
                  <Link
                    to="/admin/companies"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Company
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </>
              ) : (
                // Mobile Links for Non-Recruiter
                <>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/browse"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse
                  </Link>
                  <Link
                    to="/jobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                  {!user && (
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  )}
                </>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              {user && (
                <div className="px-4 py-2">
                  <UserProfile />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
