import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FeedBackForm from "./FeedBackFrom";
import axios from "axios";

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]); // Initialize as empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/allfeedback"
        );
        console.log(response.data.data); // Log the response to check structure
        setData(response.data.data); // Set feedback data to state
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className="px-4 py-16 bg-gray-50 min-h-screen">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <p className="text-blue-400 font-semibold uppercase tracking-wider">
          Hear from our Users
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mt-2">
          Discover our <span className="text-blue-600">Testimonials</span>
        </h1>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {data.length > 0 ? (
          data.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-6 relative overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header: Avatar + Name + Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserCircle className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {testimonial.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="bg-yellow-100 text-yellow-800 font-semibold text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm">
                  <span>⭐</span> {testimonial.rating}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-500 font-medium mb-2 italic">
                “{testimonial.userExperience}”
              </p>
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No testimonials available</p>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      {/* Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <FeedBackForm />
          </div>
        </div>
      )}
    </div>
  );
}
