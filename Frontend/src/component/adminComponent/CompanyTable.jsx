import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CompanyTable() {
  const { companies = [], searchCompaniesByText = "" } = useSelector(
    (store) => store.company
  ); // Ensure default values to prevent errors

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate()

  useEffect(() => {
    if (companies.length > 0) {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchCompaniesByText.toLowerCase())
      );
      setFilteredCompanies(filtered); // ✅ Update state
    } else {
      setFilteredCompanies([]); // ✅ Reset if no companies
    }
  }, [companies, searchCompaniesByText]);

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Company Logo</th>
            <th className="p-2 border">Company Name</th>
            <th className="p-2 border">Website</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No Company Found
              </td>
            </tr>
          ) : (
            filteredCompanies.map((company, index) => (
              <tr key={index} className="text-center border-t hover:bg-gray-50">
                <td className="p-2 border">
                  <img
                    src={company.logo || "/default-logo.png"}
                    alt={company.name || "No Name"}
                    className="h-10 mx-auto rounded"
                  />
                </td>
                <td className="p-2 border">{company.name || "N/A"}</td>
                <td className="p-2 border">
                  <a
                    href={company.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {company.website || "No Website"}
                  </a>
                </td>
                <td className="p-2 border">
                  <button onClick={()=>navigate(`/admin/companies/${company._id}`)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Edit 
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
