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
  const [input, setInput] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchCompaniesByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex justify-between items-center my-5">
          <input
            type="text"
            placeholder="filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {" "}
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
