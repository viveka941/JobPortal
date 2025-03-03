import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfileModel from "../authentication/EditProfileModel";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
 
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );
  console.log(allAdminJobs)
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

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

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <caption className="text-lg font-bold my-4">
          Your Recent Posted Jobs
        </caption>
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3 border">Company Name</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-5 text-gray-500">
                No Job Added
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
                  className="text-center border hover:bg-gray-200 transition duration-300"
                >
                  <td className="p-3 border">
                    {companyDetails?.name || "N/A"}
                  </td>
                  <td className="p-3 border">{job.title || "N/A"}</td>
                  <td className="p-3 border">
                    {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                  </td>
                  <td className="p-3 border text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        <EditProfileModel className="w-4" /> Edit
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        View Applicants
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
  );
};

export default AdminJobsTable;
