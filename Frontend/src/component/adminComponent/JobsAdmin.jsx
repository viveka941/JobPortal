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
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <input
            className="border p-2 rounded-lg w-72"
            placeholder="Filter by Company Name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post New Job
          </button>
        </div>
        <AdminJobTable /> {/* Display table */}
      </div>
    </div>
  );
};

export default AdminJobs;
