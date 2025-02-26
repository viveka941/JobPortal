import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function EditProfileModel({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "", // Convert array to string
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileHandler = (e) => {
    const file = e.target.files?.[0]; // Corrected from `e.target.file`
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    const formDatas = new FormData();
    formDatas.append("name", input.fullName);
    formDatas.append("email", input.email);
    formDatas.append("phone", input.phoneNumber);
    formDatas.append("bio", input.bio);
    formDatas.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Comma-separated skills"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Resume</label>
            <input
              type="file"
              name="file"
              onChange={handleFileHandler} // Fixed function call
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
