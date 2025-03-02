import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminJobTable() {
  const { companies = [], searchCompaniesByText = "" } = useSelector(
    (store) => store.company
  );

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    if (companies.length > 0) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchCompaniesByText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  }, [companies, searchCompaniesByText]);

  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">Company List</h2>
        <input
          type="text"
          placeholder="Search Company..."
          className="border border-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-[#50C878] w-72"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#4A90E2] text-white text-lg">
              <th className="p-3 border">Company Logo</th>
              <th className="p-3 border">Company Name</th>
              <th className="p-3 border">Website</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-5 text-gray-500">
                  No Company Found
                </td>
              </tr>
            ) : (
              filteredCompanies.map((company, index) => (
                <tr
                  key={index}
                  className="text-center border-t hover:bg-[#50C878] transition duration-300"
                >
                  <td className="p-3 border">
                    <img
                      src={company.logo || "/default-logo.png"}
                      alt={company.name || "No Name"}
                      className="h-12 w-12 mx-auto rounded-lg border"
                    />
                  </td>
                  <td className="p-3 border font-medium text-[#2D2D2D]">
                    {company.name || "N/A"}
                  </td>
                  <td className="p-3 border">
                    <a
                      href={company.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A90E2] hover:underline font-medium"
                    >
                      {company.website || "No Website"}
                    </a>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => navigate(`/admin/companies/${company.id}`)}
                      className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#D84343] transition duration-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
