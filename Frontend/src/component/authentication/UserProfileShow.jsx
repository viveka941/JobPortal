import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import ApplidJob from "./ApplidJob";
import EditProfileModel from "./EditProfileModel";
import UseGetAllApplidJobs from "../../hook/UseGetAllApplidJobs";
import UserData from "./UserData";
import AddDetails from "./AddDetails";
import ChatBot from "./ChatBot";

export default function UserProfileShow() {
  UseGetAllApplidJobs();
  const { user } = useSelector((store) => store.auth);

  const [openEdit, setOpenEdit] = useState(false);
  const [openAddDetails, setOpenAddDetails] = useState(false);

  const resumeLink = "http://resume.com"; // Replace with actual resume link
  const hasUserData = user && user?.address;

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
            onClick={() => setOpenEdit(true)}
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
                    {skill.stype}
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
            {user?.profile?.resume ? (
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

        {/* Conditionally Render "Add Details" Button */}
        {!hasUserData && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setOpenAddDetails(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              ➕ Add Details
            </button>
          </div>
        )}

        {/* AddDetails Modal */}
        {openAddDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Add Your Details</h2>
              <AddDetails userId={user?._id} />

              <button
                onClick={() => setOpenAddDetails(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <UserData userId={user?._id} />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <div className="text-md font-bold">Applied Jobs</div>
      </div>

      {/* Applied Jobs Table */}
      <ApplidJob />

      {/* Edit Profile Modal */}
      <EditProfileModel open={openEdit} setOpen={setOpenEdit} />
      <div className="fixed top-20 right-4">
        <ChatBot />
      </div>
       
    </div>
  );
}
