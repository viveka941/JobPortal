import React, { useState } from "react";
import {  NavLink } from "react-router-dom";
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
                  <NavLink
                    to="/admin/companies"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    Company
                  </NavLink>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/admin/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              // Links for Non-Recruiter (Guest or Candidate)
              <>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    Browse
                  </NavLink>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/mocktest"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    MockTest
                  </NavLink>
                </li>
                <li className="hover:text-blue-600 transition duration-200">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600  underline font-extrabold"
                        : "hover:text-blue-600 transition duration-200 "
                    }
                  >
                    About
                  </NavLink>
                </li>
                {!user && ( // Show Register link only if user is not logged in
                  <li className="hover:text-blue-600 transition duration-200">
                    <NavLink to="/register">Register</NavLink>
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
            <NavLink
              to="/login"
              className="hover:text-blue-600 transition duration-200"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-orange-100 to-blue-300 shadow-lg md:hidden z-50">
            <div className="px-4 py-3 space-y-3">
              {user && user.role === "Recruiter" ? (
                // Mobile Links for Recruiter
                <>
                  <NavLink
                    to="/admin/companies"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Company
                  </NavLink>
                  <NavLink
                    to="/admin/jobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </NavLink>
                  <NavLink
                    to="/mocktest"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MockTest
                  </NavLink>
                </>
              ) : (
                // Mobile Links for Non-Recruiter
                <>
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/browse"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse
                  </NavLink>
                  <NavLink
                    to="/jobs"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </NavLink>
                  <NavLink
                    to="/mocktest"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MockTest
                  </NavLink>

                  {!user && (
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  )}
                </>
              )}
              {!user && (
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
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
