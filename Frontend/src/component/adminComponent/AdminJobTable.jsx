import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfileModel from "../authentication/EditProfileModel";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
 
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    if (allAdminJobs.length > 0) {
      const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs([]);
    }
  }, [allAdminJobs, searchJobByText]);

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete functionality
    console.log("Deleting job:", jobToDelete);
    setShowDeleteConfirm(false);
    setJobToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setJobToDelete(null);
  };

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg- min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Your Recent Posted Jobs</h2>
          </div>
          <div className="overflow-x-auto">
            {/* Mobile View */}
            <div className="block md:hidden">
              {filterJobs.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-lg font-medium">No Jobs Added Yet</p>
                    <p className="text-sm">Start by posting your first job</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  {filterJobs.map((job) => {
                    const companyDetails = companies.find(
                      (c) => c._id === job.company
                    );
                    return (
                      <div
                        key={job._id}
                        className="bg-white rounded-lg shadow p-4 space-y-3"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {companyDetails?.name?.charAt(0) || "N/A"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {companyDetails?.name || "N/A"}
                            </div>
                            <div className="text-sm text-blue-600">
                              {job.title || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                          >
                            <EditProfileModel className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          >
                            View Applicants
                          </button>
                          <button
                            onClick={() => handleDeleteClick(job)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tablet and Desktop View */}
            <table className="w-full hidden md:table">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-4 sm:px-6 md:px-8 py-4 text-left font-semibold">Company Name</th>
                  <th className="px-4 sm:px-6 md:px-8 py-4 text-left font-semibold">Role</th>
                  <th className="px-4 sm:px-6 md:px-8 py-4 text-left font-semibold">Date</th>
                  <th className="px-4 sm:px-6 md:px-8 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterJobs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 md:px-8 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-medium">No Jobs Added Yet</p>
                        <p className="text-sm">Start by posting your first job</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filterJobs.map((job) => {
                    const companyDetails = companies.find(
                      (c) => c._id === job.company
                    );
                    return (
                      <tr
                        key={job._id}
                        className="group hover:bg-blue-200 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        <td className="px-4 sm:px-6 md:px-8 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                              <span className="text-blue-600 font-semibold text-lg group-hover:text-blue-700">
                                {companyDetails?.name?.charAt(0) || "N/A"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {companyDetails?.name || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4">
                          <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full group-hover:bg-blue-200 group-hover:text-blue-800 transition-all duration-300">
                            {job.title || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                          {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-4 sm:px-6 md:px-8 py-4 text-right">
                          <div className="flex justify-end space-x-2 sm:space-x-3 md:space-x-4">
                            <button
                              onClick={() => navigate(`/admin/companies/${job._id}`)}
                              className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                            >
                              <EditProfileModel className="w-4 h-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                              className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                              View Applicants
                            </button>
                            <button
                              onClick={() => handleDeleteClick(job)}
                              className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 text-center mb-2">Delete Job</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
                Are you sure you want to delete this job? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 sm:px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobsTable;
