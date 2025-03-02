import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar.jsx";

import UseGetCompanyById from "../../hook/UseGetCompanyById.jsx";

const CompanySetup = () => {
  const params = useParams();
  UseGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200 && res.data.message) {
        navigate("/admin/companies");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/admin/companies")}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            ⬅️ Back
          </button>
          <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
        </div>
        <form onSubmit={submitHandler} className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Website</label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 w-full text-gray-700 bg-white border border-gray-300 rounded-md file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                disabled
              >
                ⏳ Updating...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Update Company
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
