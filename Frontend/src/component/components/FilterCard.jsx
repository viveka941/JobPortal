import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
      "Desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: [],
    Technology: [],
    Experience: [],
    Salary: []
  });
  
  const [expandedSections, setExpandedSections] = useState({
    Location: true,
    Technology: true,
    Experience: true,
    Salary: true
  });
  
  const dispatch = useDispatch();

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const toggleSection = (filterType) => {
    setExpandedSections(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  useEffect(() => {
    // Transform filters into query parameters format
    const queryParams = Object.entries(selectedFilters).reduce((acc, [key, values]) => {
      if (values.length > 0) {
        acc[key.toLowerCase()] = values.join(",");
      }
      return acc;
    }, {});

    dispatch(setSearchQuery(queryParams));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white rounded-md p-4 shadow-md border">
      <h1 className="font-bold text-lg mb-4 text-gray-800">Filter Jobs</h1>
      
      {filterData.map((data) => (
        <div key={data.filterType} className="mb-4 border-b border-gray-200 pb-3 last:border-b-0">
          <button 
            onClick={() => toggleSection(data.filterType)}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <h2 className="font-semibold text-gray-700">{data.filterType}</h2>
            {expandedSections[data.filterType] ? 
              <FaChevronUp className="text-gray-500" /> : 
              <FaChevronDown className="text-gray-500" />
            }
          </button>
          
          {expandedSections[data.filterType] && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2">
                {data.array.map((item) => {
                  const inputId = `${data.filterType}-${item.replace(/\s+/g, "-")}`;
                  return (
                    <div key={inputId} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={inputId}
                        checked={selectedFilters[data.filterType].includes(item)}
                        onChange={() => handleCheckboxChange(data.filterType, item)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={inputId}
                        className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button 
          onClick={() => setSelectedFilters({
            Location: [],
            Technology: [],
            Experience: [],
            Salary: []
          })}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
