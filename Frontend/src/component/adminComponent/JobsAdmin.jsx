import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import UseGetAllAdminJobs from "../../hook/UseGetAllAdminJobs";
import Navbar from "../Navbar";
import { setSearchJobByText } from "../redux/jobSlice";
 

const AdminJobs = () => {
  UseGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input)); // Update Redux on input change
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white-50 to-purple-100">
      <Navbar />
      <div className="max-w-6xl my-10 mx-auto h-[calc(100vh-11rem)] p-8 bg-gray-50 backdrop-blur-sm rounded-xl shadow-lg overflow-auto">
        <div className="flex items-center justify-between mb-4 bg-gradient-to-b from-gray-200 to-gray-100 p-4 rounded-lg shadow-lg">
          <input
            className="border p-2 rounded-lg w-72 focus:ring-2 bg-white focus:ring-blue-500 focus:border-transparent"
            placeholder="Filter by Company Name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
          >
            Post New Job
          </button>
        </div>
        <div className="h-[calc(100%-4rem)]">
          <AdminJobTable /> {/* Display table */}
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
