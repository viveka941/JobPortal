import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function MockTest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const mockTests = [
    {
      id: 1,
      title: "Full Stack Developer Mock Test",
      category: "Technical",
      difficulty: "Advanced",
      duration: "120 mins",
      questions: 100,
      passingMarks: 50,
      attempts: 2450,
      rating: 4.8,
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      progress: 65,
      highestScore: 82,
    },
    {
      id: 2,
      title: "Aptitude Master Test",
      category: "Aptitude",
      difficulty: "Intermediate",
      duration: "90 mins",
      questions: 80,
      passingMarks: 40,
      attempts: 1845,
      rating: 4.5,
      img: "https://cdn-icons-png.flaticon.com/512/4712/4712043.png",
      progress: 40,
      highestScore: 68,
    },
    {
      id: 3,
      title: "Programming Fundamentals",
      category: "Technical",
      difficulty: "Beginner",
      duration: "60 mins",
      questions: 60,
      passingMarks: 30,
      attempts: 3250,
      rating: 4.7,
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
      progress: 85,
      highestScore: 95,
    },
    {
      id: 4,
      title: "Logical Reasoning Challenge",
      category: "Logical",
      difficulty: "Advanced",
      duration: "180 mins",
      questions: 120,
      passingMarks: 60,
      attempts: 1420,
      rating: 4.6,
      img: "https://cdn-icons-png.flaticon.com/512/4712/4712055.png",
      progress: 25,
      highestScore: 58,
    },
  ];

  const categories = ["All", "Technical", "Aptitude", "Logical", "Practice"];

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = test.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Practice Mock Tests
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simulate real exam conditions, track your progress, and improve
              your performance with our curated collection of practice tests.
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search tests..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border hover:bg-gray-50"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Banner */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockTests.length}
              </p>
              <p className="text-gray-600">Total Tests</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">98%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">24/7</p>
              <p className="text-gray-600">Availability</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">10k+</p>
              <p className="text-gray-600">Attempts</p>
            </div>
          </div>

          {/* Test Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={test.img}
                      alt={test.title}
                      className="w-16 h-16"
                    />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : test.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{test.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {test.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {test.questions} Questions
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {test.duration}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Your Progress</span>
                      <span>{test.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all"
                        style={{ width: `${test.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Test Info */}
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Highest Score</span>
                      <span className="font-medium">{test.highestScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Attempts</span>
                      <span className="font-medium">{test.attempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span className="flex items-center">
                        ⭐ {test.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/test/${test.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                    >
                      Start Test
                    </Link>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4 mx-auto">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tests found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
