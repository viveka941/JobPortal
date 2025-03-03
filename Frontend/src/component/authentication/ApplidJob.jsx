import React from "react";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <caption className="p-3 font-bold text-lg bg-gray-100 border-b">
            Recent Applied Jobs
          </caption>
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Job Title</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                  You have not applied for any job yet.
                </td>
              </tr>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <tr
                  key={appliedJob._id}
                  className="border-b hover:bg-gray-200 transition"
                >
                  <td className="px-4 py-2">
                    {appliedJob?.createdAt.split("T")[0]}
                  </td>
                  <td className="px-4 py-2">{appliedJob.job?.title}</td>
                  <td className="px-4 py-2">{appliedJob.job?.company?.name}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className={`px-3 py-1 rounded text-white font-semibold ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : appliedJob?.status === "accepted"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {appliedJob?.status}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJob;
