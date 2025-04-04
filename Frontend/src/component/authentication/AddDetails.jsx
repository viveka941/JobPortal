import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddDetails({ userId }) {
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
      navigate("/profile"); // Redirect to user profile page

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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Professional Profile Setup
      </h2>

      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {serverError}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                {...register("userName", { required: "Full name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <textarea
                {...register("address")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Education Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Highest Education
              </label>
              <select
                {...register("education")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Master's Degree
                  </label>
                  <input
                    {...register("masterDegree", {
                      required: "Master's degree is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.masterDegree && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.masterDegree.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Graduation Year (Master's)
                  </label>
                  <input
                    {...register("masterYear", {
                      required: "Master's year is required",
                      min: { value: 1900, message: "Invalid year" },
                      max: { value: 2099, message: "Invalid year" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.masterYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.masterYear.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Graduation Degree
              </label>
              <input
                {...register("graduationDegree")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Graduation Year
              </label>
              <input
                {...register("graduationYear", {
                  min: { value: 1900, message: "Invalid year" },
                  max: { value: 2099, message: "Invalid year" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.graduationYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.graduationYear.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Academic History */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Academic History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                12th Grade (%)
              </label>
              <input
                {...register("class12", {
                  min: { value: 0, message: "Invalid percentage" },
                  max: { value: 100, message: "Invalid percentage" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.class12 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class12.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                10th Grade (%)
              </label>
              <input
                {...register("class10", {
                  min: { value: 0, message: "Invalid percentage" },
                  max: { value: 100, message: "Invalid percentage" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.class10 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class10.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Development */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Professional Development
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Technical Skills (Comma-separated)
              </label>
              <input
                {...register("technicalSkill", {
                  required: "Technical skills are required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              {errors.technicalSkill && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.technicalSkill.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Work Experience
              </label>
              <input
                {...register("experience")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3" placeholder="exprience year in number "
              ></input>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Certifications
              </label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 p-4 rounded-lg mb-4 bg-white"
                >
                  <input
                    {...register(`certification.${index}.name`, {
                      required: "Certification name is required",
                    })}
                    placeholder="Certification Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  {errors.certification?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.certification[index].name.message}
                    </p>
                  )}

                  <input
                    {...register(`certification.${index}.language`, {
                      required: "Certification language is required",
                    })}
                    placeholder="Certification Language"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  {errors.certification?.[index]?.language && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.certification[index].language.message}
                    </p>
                  )}

                  <input
                    type="date"
                    {...register(`certification.${index}.date`, {
                      required: "Certification date is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.certification?.[index]?.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.certification[index].date.message}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: "", language: "", date: "" })}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                + Add Certification
              </button>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Achievements
          </h3>
          <textarea
            {...register("achievement")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
