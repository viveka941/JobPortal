import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

export default function Categories() {
  const navigate = useNavigate(); // ✅ Correctly placed inside component
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const searchJobHandler = (category) => {
    dispatch(setSearchQuery(category)); // ✅ Pass category to Redux
    navigate("/browse"); // ✅ Navigate after setting the query
  };

  return (
    <div className="max-w-5xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Explore Categories
      </h2>

      {/* Categories Container */}
      <div className="flex flex-wrap gap-4 justify-center px-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => searchJobHandler(category)} // ✅ Fixed function call
            className="bg-blue-600 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
