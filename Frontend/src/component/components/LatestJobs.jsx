import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && allJobs?.length > 0) {
      setLoading(false);
    }
  }, [allJobs, loading]); 

  return (
    <div className="relative bg-gradient-to-b #bcd9ef py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A38C2] to-blue-600">
              Latest & Top
            </span>{" "}
            Job Openings
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Discover your next career opportunity with our curated list of top positions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#6A38C2] border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : allJobs?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
                <p className="text-gray-600">No Jobs Available</p>
                <p className="text-sm text-gray-500 mt-2">Check back later for new opportunities</p>
              </div>
            </div>
          ) : (
            allJobs.map((job) =>
              job?._id ? (
                <JobCards
                  key={job._id}
                  job={job}
                />
              ) : (
                <span key={Math.random()}>Invalid Job Data</span>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
