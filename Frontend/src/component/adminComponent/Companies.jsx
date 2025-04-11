import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import UseGetAllCompany from "../../hook/UseGetAllCompany";
import { useDispatch } from "react-redux";
import { searchCompaniesByText } from "../redux/companySlice";

export default function Companies() {
  UseGetAllCompany();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchCompaniesByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white-50 to-purple-50">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies by name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="ml-4 bg-blue-700 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Company
          </button>
        </div>
      </div>
      <div>
        <CompanyTable />
      </div>
    </div>
  );
}
