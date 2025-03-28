import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobCards({ job }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-blue-300 hover:py-5 transition">
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
        <span className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md">
           {job?.position || "N/A"} Positions
        </span>
        <span className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md">
           {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
        </span>
        <span className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md">
           {job?.jobType || "Not Specified"}
        </span>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => navigate(`/description/${job._id}`)}
        className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-orange-700 transition"
      >
        🔍 View Details
      </button>
    </div>
  );
}
