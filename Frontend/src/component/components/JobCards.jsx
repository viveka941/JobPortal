import React from "react";

export default function JobCards() {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-blue-300 hover:py-5">
      {/* Company Name & Location */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-gray-800">Company Name</h1>
        <p className="text-gray-500 text-sm">🏢 India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Job Title</h2>
        <p className="text-gray-600 text-sm mt-1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At aperiam
          odio possimus adipisci asperiores non iure voluptatem fugiat omnis
          repellat.
        </p>
       
      </div>

      {/* Job Details (Position, Salary, Type) */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition">
          📌 10 Positions
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-green-700 transition">
          💰 20 LPA
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-purple-700 transition">
          🌍 Remote
        </button>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-orange-700 transition">
          ⏳ Full Time
        </button>
      </div>
    </div>
  );
}
