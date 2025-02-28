import React from "react";
import Navbar from "../Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

export default function Jobs() {
  const {allJobs} = useSelector((store)=>store.job)
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
          {allJobs.length <= 0 ? (
            <span className="text-gray-500 text-lg">Job not found</span>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {allJobs.map((job, index) => (
                <Job key={index} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
