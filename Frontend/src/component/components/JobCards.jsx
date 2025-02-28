import React from "react";

export default function JobCards({ job }) {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-blue-300 hover:py-5">
      {/* Company Name & Location */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-gray-800">
          {job?.company?.name || "Unknown Company"}
        </h1>
        <p className="text-gray-500 text-sm">
          🏢 {job?.location || "Location Not Available"}
        </p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {job?.title || "Job Title Not Specified"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {job?.description || "No description available for this job."}
        </p>
      </div>

      {/* Job Details (Position, Salary, Type) */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition">
          📌 {job?.position || "N/A"} Positions
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-green-700 transition">
          💰 {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-purple-700 transition">
          🌍 {job?.jobType || "Not Specified"}
        </button>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-orange-700 transition">
          ⏳ {job?.jobType || "Full Time"}
        </button>
      </div>
    </div>
  );
}
