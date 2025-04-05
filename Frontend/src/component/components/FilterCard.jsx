import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

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
  const dispatch = useDispatch();

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
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
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      
      {filterData.map((data, index) => (
        <div key={data.filterType} className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">{data.filterType}</h2>
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
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
          {index < filterData.length - 1 && <hr className="my-4 border-gray-200" />}
        </div>
      ))}
    </div>
  );
};



export default Filter;
