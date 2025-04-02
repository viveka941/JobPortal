import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applications } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Status updated successfully");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <caption className="p-3 font-bold text-lg bg-gray-100 border-b">
            List of Recent Applicants
          </caption>
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Resume</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Action</th>          
            </tr>
          </thead>
          <tbody>
            {applications?.length > 0 ? (
              applications.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="px-4 py-2">
                    {item?.applicant?.fullName || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {item?.applicant?.email || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {item?.applicant?.phoneNumber || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {item?.applicant?.profile?.resume ? (
                      <a
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Download
                      </a>
                    ) : (
                      "NA"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {item?.createdAt?.split("T")[0]}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {shortlistingStatus.map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`status-${item._id}`}
                          value={status}
                          className="accent-blue-600"
                          onClick={() => statusHandler(status, item._id)}
                        />
                        {status}
                      </label>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No Applicants Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
