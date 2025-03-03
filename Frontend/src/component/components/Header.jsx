import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    if (!query.trim()) return; // Prevent empty searches
    dispatch(setSearchQuery(query));

    navigate("/browse");
  };

  return (
    <div className="text-center max-w-lg mx-auto space-y-4 mt-10">
      <h1 className="px-6 py-2 rounded-full bg-gray-100 text-red-600 font-semibold text-sm md:text-base">
        No.1 Job Hub Website
      </h1>

      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
        Search, Apply & Get Your Dream Job
      </h2>

      <p className="text-gray-600 text-sm md:text-base">
        Find thousands of jobs in your field with just a few clicks!
      </p>

      {/* Search Bar */}
      <div className="flex items-center w-full md:w-[60%] mx-auto bg-white shadow-md border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find Your Dream Job..."
          className="w-full px-4 py-2 outline-none border-none text-gray-700"
        />
        <button
          onClick={searchJobHandler}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-full hover:bg-blue-700 transition"
        >
          🔎
        </button>
      </div>
    </div>
  );
}
