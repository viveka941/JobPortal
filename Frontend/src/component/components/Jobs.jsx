import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { FaFilter } from "react-icons/fa";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // If no search query is provided, reset to all jobs
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    // Filter based on the searched query across various fields (title, description, etc.)
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.experience?.toLowerCase().includes(query) ||
        job.salary?.toLowerCase().includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the filter button or inside the filter container
      if (
        isFilterOpen && 
        filterRef.current && 
        !filterRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button 
            ref={buttonRef}
            onClick={toggleFilter}
            className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaFilter className="mr-2" />
            {isFilterOpen ? "Close Filters" : "Open Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Filter Section - Desktop: Sidebar, Mobile: Dropdown */}
          <div 
            ref={filterRef}
            className={`filter-container ${isFilterOpen ? 'block' : 'hidden'} md:block md:w-1/4 lg:w-1/5 bg-white rounded-md shadow-md p-4 mb-4 md:mb-0`}
          >
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {filterJobs.length <= 0 ? (
              <div className="bg-white p-6 rounded-md shadow-md text-center">
                <p className="text-lg text-gray-600">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="h-[calc(100vh-200px)] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.4 }}
                      key={job.id}
                    >
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
