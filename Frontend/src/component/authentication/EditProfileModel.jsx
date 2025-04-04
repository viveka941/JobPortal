import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data";
import { setUser } from "../redux/authSlice";
import axios from "axios";

export default function EditProfileModel({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    file: user?.profile?.resume || null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDatas = new FormData();
    formDatas.append("fullName", formData.fullName);
    formDatas.append("email", formData.email);
    formDatas.append("phoneNumber", formData.phoneNumber);
    formDatas.append("bio", formData.bio);
    formDatas.append("skills", formData.skills);
    if (formData.file) {
      formDatas.append("file", formData.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formDatas,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Try again.");
      }

      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-blue-0 p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <p className="text-sm text-white mt-1">Update your personal information</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                placeholder="Comma-separated skills"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Resume</label>
            <div className="flex items-center space-x-4">
              <div className="w-full">
                <input
                  type="file"
                  name="file"
                  onChange={handleFileHandler}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer
                    border border-gray-200 rounded-lg bg-gray-50"
                />
                <p className="mt-1 text-xs text-white">Upload your resume in PDF or DOC format</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-2.5 text-white bg-red-500 rounded-lg hover:bg-red-800 transition-colors font-medium"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving Changes</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
