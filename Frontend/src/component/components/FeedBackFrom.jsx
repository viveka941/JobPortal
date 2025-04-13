import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FeedBackForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Feedback Submitted:", data);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/feedback",
        data, // Pass the data to be submitted in the request body
        {
          headers: {
            "Content-Type": "application/json", // Corrected the typo here
          },
        }
      );

      // Handle the response
      console.log("Server Response:", response);
      setMessage(response.data.message);
      reset();
      navigate("/");
    } catch (error) {
      // Handle error
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Submit Your Feedback
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-gray-700 font-medium">
            Your Experience
          </label>
          <textarea
            {...register("userExperience", {
              required: "Experience is required",
            })}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Tell us how your experience was..."
          />
          {errors.userExperience && (
            <p className="text-red-500 text-sm">
              {errors.userExperience.message}
            </p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700 font-medium">
            Rating (1 to 5)
          </label>
          <input
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Minimum rating is 1" },
              max: { value: 5, message: "Maximum rating is 5" },
            })}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 4"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>
      <p className="p-1.5 text-red-600 ">{message}</p>
    </div>
  );
}
