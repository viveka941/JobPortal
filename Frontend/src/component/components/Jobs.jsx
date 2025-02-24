import React from "react";
import Navbar from "../Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Jobs() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 flex gap-5 flex-1">
        {/* Sidebar (FilterCard) - Fixed */}
        <div className="w-72">
          <FilterCard />
        </div>

        {/* Job Listings - Scrollable */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-80px)] pb-5">
          {jobsArray.length <= 0 ? (
            <span className="text-gray-500 text-lg">Job not found</span>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {jobsArray.map((job, index) => (
                <Job key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
