import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaGraduationCap, FaBriefcase, FaTrophy } from "react-icons/fa";

export default function UpdateDetails({ userId }) {
  const { user } = useSelector((store) => store.auth);
  const [serverError, setServerError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.fullName || "",
      phone: user?.phoneNumber || "",
      email: user?.email || "",
      address: "",
      education: "",
      masterDegree: "",
      masterYear: "",
      graduationDegree: "",
      graduationYear: "",
      class12: "",
      class10: "",
      technicalSkill: "",
      certification: [{ name: "", language: "", date: "" }],
      experience: "",
      achievement: "",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "certification",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError("");
    setSuccess("");

    try {
      const updatedData = {
        ...data,
        technicalSkill: data.technicalSkill
          .split(",")
          .map((skill) => skill.trim()),
      };

      const res = await axios.post(
        `http://localhost:8000/api/users/addDetails/${userId}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess("Details submitted successfully!");
      reset();
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError(
        error.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const educationLevel = watch("education");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-xl p-8 mt-10 border border-blue-100"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Professional Profile Setup
      </motion.h2>

      {serverError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 shadow-md"
        >
          {serverError}
        </motion.div>
      )}

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4 shadow-md"
        >
          {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-blue-600 text-2xl" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Personal Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                {...register("userName", { required: "Full name is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="Enter your full name"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                disabled
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Invalid phone number (must be 10 digits)",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Address
              </label>
              <textarea
                {...register("address")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                rows="2"
                placeholder="Enter your address"
              ></textarea>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaGraduationCap className="text-blue-600 text-2xl" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Education Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Highest Education
              </label>
              <select
                {...register("education")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
              >
                <option value="">Select Education Level</option>
                <option value="Masters">Master's Degree</option>
                <option value="Bachelors">Bachelor's Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="High School">High School</option>
              </select>
            </div>

            {educationLevel === "Masters" && (
              <>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Master's Degree
                  </label>
                  <input
                    {...register("masterDegree", {
                      required: "Master's degree is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder="Enter master's degree"
                  />
                  {errors.masterDegree && (
                    <p className="text-red-500 text-sm">
                      {errors.masterDegree.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Graduation Year (Master's)
                  </label>
                  <input
                    {...register("masterYear", {
                      required: "Master's year is required",
                      min: { value: 1900, message: "Invalid year" },
                      max: { value: 2099, message: "Invalid year" },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder="Enter graduation year"
                  />
                  {errors.masterYear && (
                    <p className="text-red-500 text-sm">
                      {errors.masterYear.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Graduation Degree
              </label>
              <input
                {...register("graduationDegree")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="Enter graduation degree"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Graduation Year
              </label>
              <input
                {...register("graduationYear", {
                  min: { value: 1900, message: "Invalid year" },
                  max: { value: 2099, message: "Invalid year" },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="Enter graduation year"
              />
              {errors.graduationYear && (
                <p className="text-red-500 text-sm">
                  {errors.graduationYear.message}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Professional Development */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaBriefcase className="text-blue-600 text-2xl" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Professional Development
            </h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Technical Skills (Comma-separated)
              </label>
              <input
                {...register("technicalSkill", {
                  required: "Technical skills are required",
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              {errors.technicalSkill && (
                <p className="text-red-500 text-sm">
                  {errors.technicalSkill.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Work Experience
              </label>
              <textarea
                {...register("experience")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                rows="3"
                placeholder="Describe your work experience"
              ></textarea>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Certifications
              </label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-6 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-300"
                >
                  <input
                    {...register(`certification.${index}.name`, {
                      required: "Certification name is required",
                    })}
                    placeholder="Certification Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3 transition-all duration-300 hover:border-blue-400"
                  />
                  {errors.certification?.[index]?.name && (
                    <p className="text-red-500 text-sm mb-3">
                      {errors.certification[index].name.message}
                    </p>
                  )}

                  <input
                    {...register(`certification.${index}.language`, {
                      required: "Certification language is required",
                    })}
                    placeholder="Certification Language"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3 transition-all duration-300 hover:border-blue-400"
                  />
                  {errors.certification?.[index]?.language && (
                    <p className="text-red-500 text-sm mb-3">
                      {errors.certification[index].language.message}
                    </p>
                  )}

                  <input
                    type="date"
                    {...register(`certification.${index}.date`, {
                      required: "Certification date is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400"
                  />
                  {errors.certification?.[index]?.date && (
                    <p className="text-red-500 text-sm">
                      {errors.certification[index].date.message}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: "", language: "", date: "" })}
                className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span className="text-xl">+</span> Add Certification
              </button>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaTrophy className="text-blue-600 text-2xl" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Achievements
            </h3>
          </div>
          <textarea
            {...register("achievement")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
            rows="3"
            placeholder="Enter your achievements"
          ></textarea>
        </motion.div>

        {/* Submit Button */}
        {/* <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-semibold text-white transition duration-300 shadow-lg hover:shadow-xl ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Complete Profile"}
        </motion.button> */}
      </form>
    </motion.div>
  );
}
