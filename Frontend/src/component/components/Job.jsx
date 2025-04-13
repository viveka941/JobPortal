import { current } from "@reduxjs/toolkit";
import React from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Job({ job }) {
  const navigate = useNavigate();
  const daysAgo = (mongodbTime) => {
    const today = new Date();
    const postedDate = new Date(mongodbTime);
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-5 sm:p-6 border border-blue-100 hover:border-blue-200"
    >
      {/* Job Posting Time & Bookmark */}
      <div className="flex justify-between items-center mb-4">
        <motion.p 
          whileHover={{ scale: 1.05 }}
          className="text-gray-600 text-xs sm:text-sm font-medium bg-white/50 px-3 py-1 rounded-full"
        >
          📅{" "}
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}{" "}
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-700 hover:text-blue-600 p-1.5 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
        >
          <BsBookmarkPlusFill className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Company Logo & Details */}
      <div className="flex items-center space-x-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <span className="text-xl font-bold text-white">
              {job?.company?.name?.[0] || "?"}
            </span>
          </div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {job?.company?.name}
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm truncate flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job?.location}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {job?.title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 text-blue-600 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {job?.position || "N/A"} Positions
        </motion.span>
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 text-green-600 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job?.salary ? `${job.salary} LPA` : "Salary Not Disclosed"}
        </motion.span>
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 text-purple-600 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {job?.jobType || "Not Specified"}
        </motion.span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full bg-white text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold py-2 rounded-lg transition-colors border border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100 text-xs sm:text-sm font-semibold py-2 rounded-lg transition-colors border border-purple-200 hover:border-purple-300 flex items-center justify-center gap-2"
        >
          <span>Save for later</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs sm:text-sm font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <span>Apply Now</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
