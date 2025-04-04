import React from "react";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs=[] } = useSelector((store) => store.job);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Recent Applied Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-indigo-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black-600 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black-600 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-black-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allAppliedJobs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg">You have not applied for any job yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                allAppliedJobs.map((appliedJob) => (
                  <tr
                    key={appliedJob._id}
                    className="hover:bg-gradient-to-r hover:from-blue-200 hover:to-indigo-300 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {appliedJob?.createdAt.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appliedJob.job?.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{appliedJob.job?.company?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          appliedJob?.status === "rejected"
                            ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                            : appliedJob?.status === "accepted"
                            ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
                        }`}
                      >
                        {appliedJob?.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedJob;
