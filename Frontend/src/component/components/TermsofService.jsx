import React from "react";

export default function TermsofService() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Terms of Service
      </h1>

      {/* Introduction */}
      <p className="text-gray-600">
        Welcome to JobHub! These Terms of Service outline the rules and
        regulations for using our platform. By accessing or using our website,
        you agree to comply with these terms.
      </p>

      {/* User Responsibilities */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        1. User Responsibilities
      </h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>
          Provide accurate and truthful information while creating an account.
        </li>
        <li>Use the platform legally and ethically.</li>
        <li>Do not share your login credentials with others.</li>
      </ul>

      {/* Job Posting Guidelines */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        2. Job Posting Guidelines
      </h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>
          All job listings must be legitimate and comply with employment laws.
        </li>
        <li>Recruiters must not post misleading job descriptions.</li>
        <li>Fake or spam job postings will be removed immediately.</li>
      </ul>

      {/* Account & Security */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        3. Account & Security
      </h2>
      <p className="text-gray-600">
        Users are responsible for maintaining the security of their accounts. If
        you suspect unauthorized access, report it to us immediately.
      </p>

      {/* Content Ownership */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        4. Content Ownership
      </h2>
      <p className="text-gray-600">
        All content uploaded by users, including resumes, job posts, and company
        details, remains their property. However, by posting content on our
        platform, you grant us a non-exclusive right to display and promote it.
      </p>

      {/* Limitation of Liability */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        5. Limitation of Liability
      </h2>
      <p className="text-gray-600">
        JobHub is a job search platform and does not guarantee employment. We
        are not responsible for any direct or indirect damages arising from job
        applications or employment decisions.
      </p>

      {/* Termination of Services */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        6. Termination of Services
      </h2>
      <p className="text-gray-600">
        We reserve the right to terminate user accounts that violate these
        terms, engage in fraudulent activities, or misuse our platform.
      </p>

      {/* Contact Us */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        7. Contact Us
      </h2>
      <p className="text-gray-600">
        If you have any questions about our Terms of Service, please contact us
        at:
      </p>
      <p className="text-gray-800 font-semibold mt-2">
        📧 Email: support@jobhub.com
      </p>
      <p className="text-gray-800 font-semibold">📞 Phone: +91 9454004249</p>

      <p className="text-gray-500 text-sm mt-8">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
