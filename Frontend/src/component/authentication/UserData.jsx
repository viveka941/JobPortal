import React, { useEffect, useState } from "react";
import UpdateDetails from "./UpdateDetails";
import axios from "axios";

export default function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/getUserDetails/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

 
  }, [userId]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold text-blue-600 mt-5">
        Loading user details...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-600 mt-5">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b pb-4">
        User Details
      </h2>
      <div className="text-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Update Details
        </button>
      </div>

      <div className="space-y-4 text-lg">
        <p>
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-900">{user?.userName || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-700">Phone:</strong>{" "}
          <span className="text-gray-900">{user?.phone || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-700">Email:</strong>{" "}
          <span className="text-gray-900">{user?.email || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-700">Address:</strong>{" "}
          <span className="text-gray-900">{user?.address || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-700">Education:</strong>{" "}
          <span className="text-gray-900">{user?.education || "N/A"}</span>
        </p>

        {user?.masterDegree && (
          <>
            <p>
              <strong className="text-gray-700">Master's Degree:</strong>{" "}
              <span className="text-gray-900">{user.masterDegree}</span>
            </p>
            <p>
              <strong className="text-gray-700">Master's Year:</strong>{" "}
              <span className="text-gray-900">{user.masterYear || "N/A"}</span>
            </p>
          </>
        )}

        <p>
          <strong className="text-gray-700">Graduation Degree:</strong>{" "}
          <span className="text-gray-900">
            {user?.graduationDegree || "N/A"}
          </span>
        </p>
        <p>
          <strong className="text-gray-700">Graduation Year:</strong>{" "}
          <span className="text-gray-900">{user?.graduationYear || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-700">Class 12 Percentage:</strong>{" "}
          <span className="text-gray-900">
            {user?.class12 ? `${user.class12}%` : "N/A"}
          </span>
        </p>
        <p>
          <strong className="text-gray-700">Class 10 Percentage:</strong>{" "}
          <span className="text-gray-900">
            {user?.class10 ? `${user.class10}%` : "N/A"}
          </span>
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-8 border-t pt-4">
        Technical Skills
      </h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        {user?.technicalSkill?.length > 0 ? (
          user.technicalSkill.map((skill, index) => (
            <li key={index} className="hover:text-blue-600 transition">
              {skill}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No technical skills listed</li>
        )}
      </ul>

      <h3 className="text-2xl font-semibold text-gray-800 mt-8 border-t pt-4">
        Certifications
      </h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        {user?.certification?.length > 0 ? (
          user.certification.map((cert, index) => (
            <li key={index}>
              <strong>{cert?.name || "Unknown Certification"}</strong> (
              {cert?.language || "N/A"}) -{" "}
              {cert?.date ? new Date(cert.date).toLocaleDateString() : "N/A"}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No certifications available</li>
        )}
      </ul>

      <p className="mt-6">
        <strong className="text-gray-700">Experience:</strong>{" "}
        <span className="text-gray-900">{user?.experience || "N/A"} years</span>
      </p>
      <p>
        <strong className="text-gray-700">Achievements:</strong>{" "}
        <span className="text-gray-900">
          {user?.achievement || "No achievements listed"}
        </span>
      </p>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">Update User Details</h3>
            <UpdateDetails userId={userId} />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
