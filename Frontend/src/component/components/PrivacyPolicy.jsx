import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      {/* Introduction */}
      <p className="text-gray-600">
        Welcome to JobHub. Your privacy is important to us, and we are committed
        to protecting your personal information. This Privacy Policy explains
        how we collect, use, and safeguard your data when you use our platform.
      </p>

      {/* Information We Collect */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        1. Information We Collect
      </h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>
          <strong>Account Information:</strong> Full name, email, phone number,
          and password.
        </li>
        <li>
          <strong>Profile Details:</strong> Resume, skills, bio, and profile
          photo.
        </li>
        <li>
          <strong>Job Applications:</strong> Jobs applied for, saved jobs, and
          recruiter messages.
        </li>
        <li>
          <strong>Recruiter Information:</strong> Company name, job postings,
          and candidate interactions.
        </li>
      </ul>

      {/* How We Use Your Information */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-600">We use the collected information to:</p>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Enable users to search and apply for jobs.</li>
        <li>Allow recruiters to find and contact suitable candidates.</li>
        <li>Improve platform functionality and personalize user experience.</li>
        <li>Send important updates and notifications.</li>
      </ul>

      {/* Cookies & Tracking */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        3. Cookies & Tracking Technologies
      </h2>
      <p className="text-gray-600">
        We use cookies to enhance your experience, analyze site usage, and
        improve our services. You can manage cookie settings through your
        browser.
      </p>

      {/* Security Measures */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        4. Security of Your Information
      </h2>
      <p className="text-gray-600">
        We implement strong security measures to protect your data. However, we
        recommend users take necessary precautions while sharing personal
        information online.
      </p>

      {/* User Rights */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        5. Your Rights & Choices
      </h2>
      <ul className="list-disc ml-6 text-gray-600">
        <li>Access and update your profile information anytime.</li>
        <li>Request data deletion by contacting our support team.</li>
        <li>Opt-out of promotional emails at any time.</li>
      </ul>

      {/* Contact Us */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        6. Contact Us
      </h2>
      <p className="text-gray-600">
        If you have any questions about this Privacy Policy, please contact us
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
