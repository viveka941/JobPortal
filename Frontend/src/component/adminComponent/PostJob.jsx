import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { JOB_API_ENDPOINT } from "../utils/data";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company._id === e.target.value
    );
    setInput({
      ...input,
      companyId: selectedCompany ? selectedCompany._id : "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      alert("Please select a company.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
       navigate("/admin/jobs");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-purple-300">
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
        
          onSubmit={submitHandler}
          
          className="p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-blue-300 rounded-lg bg-white"
        >
          <div className="grid grid-cols-2 gap-5">
            {[
              { name: "title", placeholder: "Enter job title if non it plesae metion" },
              { name: "description", placeholder: "Enter job description" },
              { name: "location", placeholder: "Enter job location" },
              {
                name: "salary",
                placeholder: "Enter job salary",
                type: "number",
              },
              {
                name: "position",
                placeholder: "Enter job position",
                type: "number",
              },
              { name: "requirements", placeholder: "Enter job requirements in String" },
              {
                name: "experience",
                placeholder: "Enter job experience in number",
                type: "number",
              },
              { name: "jobType", placeholder: "Enter job type" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <label className="font-medium text-gray-700">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                <input
                  type={type}
                  name={name}
                  value={input[name]}
                  placeholder={placeholder}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full p-2 border rounded bg-white transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
            ))}

            {/* Company Selection */}
            <div>
              <label className="font-medium text-gray-700">Company</label>
              <select
                value={input.companyId}
                onChange={selectChangeHandler}
                className="w-full p-2 border rounded bg-white transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            {loading ? (
              <button
                type="button"
                className="w-full px-4 py-2 text-sm text-white bg-black rounded-md flex items-center justify-center"
                disabled
              >
                <span className="mr-2 h-4 w-4 animate-spin border-t-2 border-white border-solid rounded-full"></span>
                Please wait...
              </button>
            ) : (
              <button onClick={()=>navigate("/admin/jobs")}
                type="submit"
                className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-blue-600 transition"
              >
                Post Job
              </button>
            )}
          </div>

          {companies.length === 0 && (
            <p className="text-sm font-bold my-3 text-center text-red-600">
              *Please register a company to post jobs.*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
