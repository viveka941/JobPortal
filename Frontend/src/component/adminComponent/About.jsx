import React from "react";
import Navbar from "../Navbar";

export default function About() {
  const team = [
    {
      name: "Vivek Kumar Chaurasiya",
      role: "Team Lead / Full-Stack Developer",
    },
    { name: "Ankita Sharma", role: "Frontend Developer (React.js)" },
    { name: "Rahul Verma", role: "Backend Developer (Node.js, Express)" },
    { name: "Priya Singh", role: "UI/UX Designer" },
    { name: "Aditya Mehra", role: "Database Administrator (MongoDB & MySQL)" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-10">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-700 text-center">
            About Our Job Portal
          </h1>

          <p className="text-lg mb-6 text-justify leading-relaxed">
            Our <strong className="text-blue-700">Job Portal</strong> is a
            powerful and user-friendly platform designed to connect job seekers
            with potential employers. Whether you're a fresher or an experienced
            professional, our portal provides an easy-to-use interface to
            browse, search, and apply for jobs across various domains.
          </p>

          <p className="text-md mb-8 text-justify">
            This project was initiated with a vision to simplify the hiring and
            job application process. It supports private sector jobs, government
            jobs, and displays upcoming job opportunities across India. The
            platform allows recruiters to post job openings and manage
            applications, while applicants can upload resumes, get shortlisted,
            and track their application status.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">
              🚀 Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Authentication for job seekers and employers</li>
              <li>Real-time application tracking with status updates</li>
              <li>Resume upload and download functionality</li>
              <li>Job filtering by category, location, and type</li>
              <li>Admin dashboard for managing users and jobs</li>
              <li>Rejection reason tracking and customizable status options</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">
              🛠️ Technologies Used
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Frontend:</strong> React.js, Tailwind CSS, Redux
              </li>
              <li>
                <strong>Backend:</strong> Node.js, Express.js
              </li>
              <li>
                <strong>Database:</strong> MongoDB, MySQL
              </li>
              <li>
                <strong>Authentication:</strong> JWT (JSON Web Token)
              </li>
              <li>
                <strong>Hosting:</strong> Render / Vercel (Frontend), Railway /
                Render (Backend)
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              👨‍💻 Meet the Development Team
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-md shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-blue-700">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-8 text-md text-gray-700 text-justify">
            This project is actively maintained and continuously improved by our
            dedicated team. We aim to make the job application process more
            efficient, transparent, and user-friendly for everyone involved.
          </p>

          <p className="mt-8 text-sm italic text-center text-gray-500">
            © 2025 Job Portal — Built with passion by{" "}
            <span className="font-semibold text-blue-600">Team V-Coders</span>{" "}
            💻
          </p>
        </div>
      </div>
    </>
  );
}
