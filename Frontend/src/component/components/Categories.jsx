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
  "Non IT fields", // This will have a different color
];

export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (category) => {
    dispatch(setSearchQuery(category));
    navigate("/browse");
  };

  return (
    <div className="max-w-5xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Explore Categories
      </h2>

      <div className="flex flex-wrap gap-4 justify-center px-4">
        {categories.map((category, index) => {
          const isNonIT = category.toLowerCase().includes("non it");

          return (
            <button
              key={index}
              onClick={() => searchJobHandler(category)}
              className={`${
                isNonIT
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
