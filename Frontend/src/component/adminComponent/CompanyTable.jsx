import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CompanyTable() {
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
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
            <tr>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Company Logo
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Company Name
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Website
              </th>
              <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCompanies.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-blue-50 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                      <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg font-medium">No Companies Found</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredCompanies.map((company, index) => (
                <tr key={index} className="hover:bg-blue-100 transition-colors duration-150">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 bg-white rounded-full shadow-sm p-1 border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name || "No Name"}
                            className="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center transform transition-all duration-300 hover:from-blue-200 hover:to-blue-300">
                            <span className="text-sm sm:text-xl font-bold text-blue-600 transform transition-all duration-300 hover:scale-110">
                              {company.name ? company.name.charAt(0).toUpperCase() : '?'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[100px] sm:max-w-none">
                      {company.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <a
                      href={company.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="truncate">{company.website || "No Website"}</span>
                    </a>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 shadow-sm"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
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
