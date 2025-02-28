import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allJobs.length > 0) {
      setLoading(false);
    }
  }, [allJobs]);

  console.log("Jobs from Redux Store:", allJobs); // Debugging Step ✅

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      <div className="grid grid-cols-3 gap-4 my-5">
        {loading ? (
          <span>Loading jobs...</span>
        ) : allJobs.length === 0 ? (
          <span>No Jobs Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job} />
              ) : (
                <span key={Math.random()}>Invalid Job Data</span>
              )
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
