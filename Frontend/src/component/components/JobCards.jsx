import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobCards({ job }) {
  const navigate = useNavigate();

  // Function to get job type icon
  const getJobTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
        return '💼';
      case 'part-time':
        return '⏰';
      case 'contract':
        return '📄';
      case 'internship':
        return '🎓';
      default:
        return '💼';
    }
  };

  return (
    <div className="group w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-md rounded-xl p-5 sm:p-6 border border-blue-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
      {/* Company Name & Location */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center shadow-md">
            <span className="text-xl font-semibold text-white">
              {job?.company?.name?.[0] || "?"}
            </span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {job?.company?.name || "Unknown Company"}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job?.location || "Location Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {job?.title || "Job Title Not Specified"}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2">
          {job?.description || "No description available for this job."}
        </p>
      </div>

      {/* Job Details (Position, Salary, Type) */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <span className="bg-gradient-to-r from-blue-50 to-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {job?.position || "N/A"} Positions
        </span>
        <span className="bg-gradient-to-r from-blue-50 to-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
        </span>
        <span className="bg-gradient-to-r from-blue-50 to-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm">
          <span className="text-base">{getJobTypeIcon(job?.jobType)}</span>
          {job?.jobType || "Not Specified"}
        </span>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => navigate(`/description/${job._id}`)}
        className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>View Details</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
