import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/data";


export default function Description() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [successMessage, setSuccessMessage] = useState(""); // For success message

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  
  const isApplied = singleJob?.applications?.includes(user?._id);

 const applyJobHandler = async () => {
   try {
     const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, {
       withCredentials: true,
     });

     if (res.data.success) {
       dispatch(setSingleJob(res.data.job));
       setSuccessMessage("You have successfully applied for this job! 🎉");
     }
   } catch (error) {
     if (error.response && error.response.status === 400) {
       // Display the backend message (if user has already applied)
       setSuccessMessage(error.response.data.message);
     } else {
       console.error("Error applying for job:", error);
     }
   }
 };


  return (
    <div className="p-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {/* Company Logo & Details */}
      <div className="flex items-center space-x-4 mt-4">
        <img
          src="https://i.pinimg.com/736x/32/37/b1/3237b1527fdb7d4445f6e3febbb2f759.jpg"
          width="50px"
          className="rounded-full border"
          alt="Company Logo"
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            {singleJob?.company || "Company Name"}
          </h1>
          <p className="text-gray-500 text-sm">
            🏢 {singleJob?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title & Details */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900">
          {singleJob?.title || "Job Title"}
        </h2>
      </div>

      {/* Job Info Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
          🏢 {singleJob?.position || "N/A"}
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
          💰 {singleJob?.salary || "N/A"}
        </span>
        <span className="bg-purple-100 text-purple-600 text-xs font-medium px-3 py-1 rounded-full">
          🌍 {singleJob?.jobType || "N/A"}
        </span>
      </div>

      {/* Apply Button */}
      <button
        onClick={!isApplied ? applyJobHandler : undefined}
        className={`mt-4 w-full py-2 font-semibold text-white rounded-lg transition-all ${
          isApplied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isApplied}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </button>

      {/* Job Description */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
        <div className="mt-2 space-y-2 text-gray-700">
          <p>
            <strong>Role:</strong>{" "}
            <span className="text-gray-900">
              {singleJob?.description || "N/A"}
            </span>
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <span className="text-gray-900">
              {singleJob?.location || "N/A"}
            </span>
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            <span className="text-gray-900">
              {singleJob?.experienceLevel || "N/A"}
            </span>
          </p>
          <p>
            <strong>Job Type:</strong>{" "}
            <span className="text-gray-900">{singleJob?.jobType || "N/A"}</span>
          </p>
          <p>
            <strong>Total Applicants:</strong>{" "}
            <span className="text-gray-900">
              {singleJob?.applications?.length || "0"}
            </span>
          </p>
          <p>
            <strong>Salary:</strong>{" "}
            <span className="text-gray-900">{singleJob?.salary || "N/A"}</span>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            <span className="text-gray-900">
              {singleJob?.createdAt?.split("T")[0] || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
