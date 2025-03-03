import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import ApplidJob from "./ApplidJob";
import EditProfileModel from "./EditProfileModel";
import UseGetAllApplidJobs from "../../hook/UseGetAllApplidJobs";

export default function UserProfileShow() {
  UseGetAllApplidJobs();
  const { user } = useSelector((store) => store.auth);

  const isResume = true; // Change this based on user data
  const [open, setOpen] = useState(false);
  const resumeLink = "http://resume.com"; // Replace with actual user resume link

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-yellow-400 transition">
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24">
            <img
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border"
            />
          </div>

          {/* User Details */}
          <div className="flex-1">
            <h1 className="font-semibold text-2xl text-gray-800">
              {user?.fullName}
            </h1>
            <p className="text-gray-600">{user?.profile?.bio}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
          >
            ✒️
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            📧 <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            📞 <span className="font-medium">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h1 className="text-lg font-semibold">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length > 0
              ? user?.profile?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                  >
                    {skill.stype}{" "}
                    {/* Access the 'stype' property instead of rendering the object */}
                  </span>
                ))
              : "NA"}
          </div>
        </div>

        {/* Resume Upload/Download Section */}
        <div className="mt-6">
          <label className="text-md font-bold block mb-2">
            Upload Your Resume
          </label>
          <div>
            {isResume ? (
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                download="resume.pdf"
                className="text-blue-500 underline hover:text-blue-700 transition"
              >
                📄 Download Resume
              </a>
            ) : (
              <span className="text-gray-500">No Resume Found</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <div className="text-md font-bold">Applid Jobs</div>
      </div>
      {/* add application table  */}
      <ApplidJob />

      {/* edit profile model  */}
      <EditProfileModel open={open} setOpen={setOpen} />
    </div>
  );
}
