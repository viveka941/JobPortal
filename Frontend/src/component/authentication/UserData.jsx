import React, { useEffect, useState } from "react";

export default function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/userDetails/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data?.data || {}); // Ensure we access the 'data' object inside the response
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold text-blue-600">
        Loading user details...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-600">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        User Details
      </h2>

      <div className="space-y-3">
        <p>
          <strong className="text-gray-700">Name:</strong> {user?.userName || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Phone:</strong> {user?.phone || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Email:</strong> {user?.email || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Address:</strong> {user?.address || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Education:</strong> {user?.education || "N/A"}
        </p>

        {/* Show Master's Degree Info if available */}
        {user?.masterDegree && (
          <>
            <p>
              <strong className="text-gray-700">Master's Degree:</strong> {user.masterDegree}
            </p>
            <p>
              <strong className="text-gray-700">Master's Year:</strong> {user.masterYear || "N/A"}
            </p>
          </>
        )}

        <p>
          <strong className="text-gray-700">Graduation Degree:</strong> {user?.graduationDegree || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Graduation Year:</strong> {user?.graduationYear || "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Class 12 Percentage:</strong> {user?.class12 ? `${user.class12}%` : "N/A"}
        </p>
        <p>
          <strong className="text-gray-700">Class 10 Percentage:</strong> {user?.class10 ? `${user.class10}%` : "N/A"}
        </p>
      </div>

      {/* Technical Skills */}
      <h3 className="text-xl font-semibold text-gray-800 mt-6">Technical Skills</h3>
      <ul className="list-disc pl-6 text-gray-700">
        {user?.technicalSkill?.length > 0 ? (
          user.technicalSkill.map((skill, index) => (
            <li key={index}>{skill}</li> // Fix: Use skill directly since it's a string
          ))
        ) : (
          <li>No technical skills listed</li>
        )}
      </ul>

      {/* Certifications */}
      <h3 className="text-xl font-semibold text-gray-800 mt-6">Certifications</h3>
      <ul className="list-disc pl-6 text-gray-700">
        {user?.certification?.length > 0 ? (
          user.certification.map((cert, index) => (
            <li key={index}>
              <strong>{cert?.name || "Unknown Certification"}</strong> ({cert?.language || "N/A"}) -{" "}
              {cert?.date ? new Date(cert.date).toLocaleDateString() : "N/A"}
            </li>
          ))
        ) : (
          <li>No certifications available</li>
        )}
      </ul>

      <p className="mt-4">
        <strong className="text-gray-700">Experience:</strong> {user?.experience || "N/A"} years
      </p>
      <p>
        <strong className="text-gray-700">Achievements:</strong> {user?.achievement || "No achievements listed"}
      </p>
    </div>
  );
}
