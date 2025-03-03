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
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const currentValues = prevFilters[filterType] || [];

      // Toggle selection: Add if not selected, remove if selected
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...prevFilters, [filterType]: updatedValues };
    });
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedFilters));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white rounded-md p-4 shadow-md border">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 border-gray-300" />

      <div className="mt-4">
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold text-lg text-gray-800">
              {data.filterType}
            </h2>
            {data.array.map((item, indx) => {
              const itemId = `filter-${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <input
                    type="checkbox"
                    id={itemId}
                    value={item}
                    checked={
                      selectedFilters[data.filterType]?.includes(item) || false
                    }
                    onChange={() => handleCheckboxChange(data.filterType, item)}
                    className="cursor-pointer accent-blue-600"
                  />
                  <label
                    htmlFor={itemId}
                    className="text-gray-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
