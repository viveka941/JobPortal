import React from "react";

export default function Description() {
  const isApplied = true; // ✅ Corrected variable name

  return (
    <div className="p-6">
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
        <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
          Last date 20/2/25
        </span>
      </div>

      {/* Apply Button */}
      <button
        className={`mt-4 w-full py-2 font-semibold text-white rounded-lg transition-all ${
          isApplied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isApplied}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </button>
    </div>
  );
}
