import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import FeedBackForm from "./FeedBackFrom";
import axios from "axios";


export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]); // Initialize as empty array
  const daysAgo = (mongodbTime) => {
    const today = new Date();
    const postedDate = new Date(mongodbTime);
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
    <div>
     
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
                className="bg-gradient-to-tr from-white via-blue-50 to-white rounded-2xl shadow-lg p-6 relative overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Header: Avatar + Name + Time + Rating */}
                <div className="flex items-center justify-between mb-6">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-200 p-3 rounded-full shadow-inner">
                      <FaUserCircle className="text-3xl text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {daysAgo(testimonial.createdAt) === 0
                          ? "Today"
                          : `${daysAgo(testimonial.createdAt)} days ago`}
                      </p>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="bg-yellow-200 text-yellow-900 font-bold text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <span>⭐</span> {testimonial.rating}
                  </div>
                </div>

                {/* Experience Content */}
                <p className="text-gray-600 text-[15px] leading-relaxed italic">
                  “{testimonial.userExperience}”
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No testimonials available
            </p>
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
    </div>
  );
}
