import React from "react";

export default function AppliedJob() {
  const jobApplications = [
    {
      date: "23-12-2025",
      title: "Software Engineer",
      company: "Microsoft",
      status: "Selected",
    },
    {
      date: "10-01-2025",
      title: "Frontend Developer",
      company: "Google",
      status: "Pending",
    },
    {
      date: "15-02-2025",
      title: "Backend Developer",
      company: "Amazon",
      status: "Rejected",
    },
    {
      date: "05-03-2025",
      title: "Full Stack Developer",
      company: "Facebook",
      status: "Interview Scheduled",
    },
    {
      date: "12-04-2025",
      title: "UI/UX Designer",
      company: "Adobe",
      status: "Selected",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Applied Jobs</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3 text-left">Date</th>
            <th className="border p-3 text-left">Job Title</th>
            <th className="border p-3 text-left">Company</th>
            <th className="border p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((job, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-3">{job.date}</td>
              <td className="border p-3">{job.title}</td>
              <td className="border p-3">{job.company}</td>
              <td
                className={`border p-3 font-medium ${
                  job.status === "Selected"
                    ? "text-green-600"
                    : job.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {job.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
