import React from "react";
import Navbar from "../Navbar";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Browse() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-lg font-semibold mb-4">
          Search Results: {randomJobs.length}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {randomJobs.map((item, index) => (
            <Job key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
