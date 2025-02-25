import React from "react";

export default function Description() {
  const isApplied = true;

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

      {/* Job Title & Details */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900">Job Title</h2>
      </div>

      {/* Job Info Badges */}
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
          Last date: 20/2/25
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

      {/* Job Description */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
        <div className="mt-2 space-y-2 text-gray-700">
          <p>
            <strong>Role:</strong>{" "}
            <span className="text-gray-900">Software Engineer</span>
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <span className="text-gray-900">Remote</span>
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            <span className="text-gray-900">4 years</span>
          </p>
          <p>
            <strong>Job Type:</strong>{" "}
            <span className="text-gray-900">Full Time</span>
          </p>
          <p>
            <strong>Total Applicants:</strong>{" "}
            <span className="text-gray-900">100</span>
          </p>
        </div>
      </div>
    </div>
  );
}
