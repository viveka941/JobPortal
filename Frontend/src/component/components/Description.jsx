import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/data";

const Description = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Already applied for this job");
        setIsApplied(true);
      } else {
        console.log("Error applying:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/jobs")}
        className="text-[#6B3AC2] hover:text-[#552d9b] font-medium mb-6"
      >
        &larr; Back to Jobs
      </button>

      {/* Job Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-[#E8F0FE] text-[#4A90E2] px-3 py-1 rounded-full text-sm">
                {singleJob?.position} Open Positions
              </span>
              <span className="bg-[#FFEDED] text-[#FF6B6B] px-3 py-1 rounded-full text-sm">
                {singleJob?.salary} LPA
              </span>
              <span className="bg-[#F0E8FF] text-[#6B3AC2] px-3 py-1 rounded-full text-sm">
                {singleJob?.location}
              </span>
              <span className="bg-[#E8F5E9] text-[#50C878] px-3 py-1 rounded-full text-sm">
                {singleJob?.jobType}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={!isApplied ? applyJobHandler : null}
              disabled={isApplied}
              className={`rounded-lg px-6 py-3 text-white font-semibold ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6B3AC2] hover:bg-[#552d9b]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-[#2D2D2D] mb-4">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {singleJob?.description}
        </p>
      </div>

      {/* Job Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-[#2D2D2D] mb-4">Job Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {singleJob?.position}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span>{" "}
              {singleJob?.location}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span> {singleJob?.salary}{" "}
              LPA
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {singleJob?.experienceLevel} Year
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Applicants:</span>{" "}
              {singleJob?.applications?.length}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Job Type:</span>{" "}
              {singleJob?.jobType}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Post Date:</span>{" "}
              {singleJob?.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
