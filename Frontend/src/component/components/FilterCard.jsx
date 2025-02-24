import React from "react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Surat",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Manufacturing",
      "Retail",
      "Telecommunications",
      "Real Estate",
      "Transportation",
      "Energy",
    ],
  },
];

export default function FilterCard() {
  return (
    <div
      className="w-64 bg-white shadow-md rounded-lg p-5 border border-gray-200 
      "
    >
      {/* Filter Title */}
      <h1 className="text-lg font-semibold text-gray-800">Filter Jobs</h1>
      <hr className="mt-3 border-gray-300" />

      {/* Filters List */}
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="text-md font-medium text-gray-700 mb-2">
            {data.filterType}
          </h2>
          {data.array.map((item, subIndex) => (
            <div key={subIndex} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                id={`filter-${data.filterType}-${subIndex}`}
                name={item}
                value={item}
                className="cursor-pointer accent-blue-600"
              />
              <label
                htmlFor={`filter-${data.filterType}-${subIndex}`}
                className="text-gray-600 text-sm cursor-pointer hover:text-blue-600"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
