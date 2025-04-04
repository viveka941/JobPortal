import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applications } = useSelector((store) => store.application);
  const [selectedReasons, setSelectedReasons] = useState({});

  const statusHandler = async (status, id) => {
    try {
      const reason = selectedReasons[id] || "";

      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status, reason },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Status updated successfully");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleReasonChange = (id, value) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 text-xl font-semibold">
          📝 List of Recent Applicants
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Full Name",
                  "Email",
                  "Contact",
                  "Resume",
                  "Date",
                  "Action",
                  "Reason",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600 tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications?.length > 0 ? (
                applications.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm">
                      {item?.applicant?.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item?.applicant?.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item?.applicant?.phoneNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item?.applicant?.profile?.resume ? (
                        <a
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Download
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item?.createdAt?.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-4">
                        {shortlistingStatus.map((status) => (
                          <label
                            key={status}
                            className="flex items-center gap-2 cursor-pointer text-gray-700"
                          >
                            <input
                              type="radio"
                              name={`status-${item._id}`}
                              value={status}
                              className="accent-blue-600"
                              onClick={() => statusHandler(status, item._id)}
                            />
                            <span className="text-sm">{status}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-2">
                        <select
                          name="rejectionReason"
                          value={selectedReasons[item._id] || ""}
                          onChange={(e) =>
                            handleReasonChange(item._id, e.target.value)
                          }
                          className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Reason</option>
                          <option value=" Lack of required technical skills">
                            Lack of required technical skills
                          </option>
                          <option value=" Poor communication or soft skills">
                            Poor communication or soft skills
                          </option>
                          <option value=" Not enough relevant experience">
                            Not enough relevant experience
                          </option>
                          <option value=" Failed the technical test or interview round">
                            Failed the technical test or interview round
                          </option>
                          <option value=" Cultural or team fit mismatch">
                            Cultural or team fit mismatch
                          </option>
                        </select>

                        <button
                          type="button"
                          onClick={() => statusHandler("Rejected", item._id)}
                          className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded-md text-sm shadow-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Applicants Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsTable;
