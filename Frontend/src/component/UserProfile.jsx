import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "./redux/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  const handleLogout = () => {
    dispatch(setUser(null)); // Clears user from Redux state
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    }
    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails]);

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center space-x-4">
          {/* Profile Image - Click to Toggle Details */}
          <img
            src={
              user.profilePic ||
              "https://media.istockphoto.com/id/980239992/vector/happy-handsome-man-showing-thumbs-up-concept-illustration-in-cartoon-style.jpg?s=612x612&w=0&k=20&c=1ikVDLkafPxGOLqq4gtIs4HQFBQpdjuiaSchIoqW_M4="
            }
            alt="Profile"
            className="w-10 h-10 rounded-full border cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
            onClick={() => setShowDetails(!showDetails)}
          />

          {/* User Details Dropdown */}
          {showDetails && (
            <div
              ref={dropdownRef}
              className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-64 z-50 border"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">📞 {user.phoneNumber}</p>
              <p className="text-gray-600 text-sm font-medium">
                {user.role === "Student"
                  ? `🎓 ${user.role}`
                  : `💼 ${user.role}`}
              </p>

              {/* Profile Button */}
              <Link to="/profile">
                <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Profile
                </button>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login / Register
        </Link>
      )}
    </div>
  );
}
