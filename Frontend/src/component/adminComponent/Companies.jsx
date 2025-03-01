import React from 'react'
import Navbar from '../Navbar'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom';

export default function Companies() {
  const navigate  = useNavigate()
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex justify-between items-center my-5">
          <input type="text" placeholder="filter by name" />
          <button onClick={() => navigate("/admin/companies/create")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
