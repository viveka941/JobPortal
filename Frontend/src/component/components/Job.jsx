import React from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";

export default function Job() {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg p-6 border border-gray-200">
      {/* Job Posting Time & Bookmark */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <p>📅 3 Days Ago</p>
        <button className="text-gray-700 hover:text-blue-600">
          <BsBookmarkPlusFill size={20} />
        </button>
      </div>

      {/* Company Logo & Details */}
      <div className="flex items-center space-x-4 mt-4">
        <img
          src="https://i.pinimg.com/736x/32/37/b1/3237b1527fdb7d4445f6e3febbb2f759.jpg"
          width="50px"
          className="rounded-full border"
          alt="Company Logo"
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Company Name</h1>
          <p className="text-gray-500 text-sm">🏢 India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900">Job Title</h2>
        <p className="text-gray-600 text-sm mt-1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At aperiam
          odio possimus adipisci asperiores non iure voluptatem fugiat omnis
          repellat.
        </p>
      </div>

      {/* Job Details (Salary, Location, etc.) */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
          🏢 Full Time
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
          💰 10 LPA
        </span>
        <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
          🌍 Remote
        </span>
        <button className="font-bold rounded-sm text-gray-500">Details</button>
        <button className="font-bold rounded-sm text-purple-500">
          Save for later
        </button>
      </div>

      {/* Apply Button */}
      <div className="mt-5">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all">
          Apply Now
        </button>
      </div>
    </div>
  );
}
