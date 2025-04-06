import React from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiClock,
  FiList,
} from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";


export default function Test() {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test
const QuestionData = test?.QuestionData
  const handleSubmit =()=>{
    navigate("/test/test1", {state:{QuestionData}})
  }
  
  console.log(QuestionData)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Assessment Guidelines
        </h1>
        <p className="text-gray-600">
          Please follow these instructions carefully to ensure successful
          completion
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <FiClock className="text-blue-600 mr-2 text-xl" />
          <span className="font-medium">Time Limit: 90 Minutes</span>
        </div>
        <div className="bg-green-50 p-4 rounded-lg flex items-center">
          <FiCheckCircle className="text-green-600 mr-2 text-xl" />
          <span className="font-medium">Passing Score: 75%</span>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
          <FiAlertTriangle className="text-yellow-600 mr-2 text-xl" />
          <span className="font-medium">3 Attempts Allowed</span>
        </div>
      </div>

      {/* Main Instructions */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FiList className="text-xl text-purple-600 mr-2" />
          <h2 className="text-xl font-semibold">Step-by-Step Instructions</h2>
        </div>

        <ul className="space-y-4 list-disc pl-6">
          <li className="text-gray-700">
            <span className="font-medium">System Check:</span> Ensure stable
            internet connection and compatible browser (Chrome v80+ or Firefox
            v75+)
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Authentication:</span> Have your
            government-issued ID ready for identity verification
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Technical Requirements:</span>
            <ul className="list-decimal pl-6 mt-2 space-y-2">
              <li>Enable camera and microphone access</li>
              <li>Close all other browser tabs and applications</li>
              <li>Disable any VPN connections</li>
            </ul>
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Submission Protocol:</span>
            <ul className="list-[square] pl-6 mt-2 space-y-2">
              <li>Complete all answers before time expiration</li>
              <li>Review flagged questions in 'Marked for Review' section</li>
              <li>Click submit button only once</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Important Notices */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
        <div className="flex items-center">
          <FiAlertTriangle className="text-red-600 mr-2" />
          <h3 className="font-semibold">Critical Warnings</h3>
        </div>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Proctoring software will monitor your activity throughout</li>
          <li>Multiple face detection failures may void attempt</li>
          <li>Unauthorized resources will result in disqualification</li>
        </ul>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-center">
          <FiInfo className="text-blue-600 mr-2" />
          <h3 className="font-semibold">Support Information</h3>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Technical Support:</p>
            <p>
              Email: support@testportal.com
              <br />
              Phone: +1 (800) 123-4567
            </p>
          </div>
          <div>
            <p className="font-medium">Available Hours:</p>
            <p>
              Mon-Fri: 6AM - 9PM EST
              <br />
              Sat-Sun: 8AM - 6PM EST
            </p>
          </div>
        </div>
      </div>

      {/* Action Checklist */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Pre-Test Checklist</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Verified system requirements</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Closed unauthorized applications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Confirmed identity documents</span>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          > Start Test</button>
      </div>
    </div>
  );
}


