import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useLocation } from "react-router-dom";

export default function MockTest1() {
  const [data, setData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const location = useLocation();
  const QuestionData = location.state.QuestionData;
  console.log(QuestionData)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(QuestionData);
      const text = await response.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      setData(parsed.data);
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (index, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const toggleAnswer = (index) => {
    if (selectedAnswers[index]) {
      setShowAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-10 text-center text-indigo-700 tracking-wide">
        🚀 MERN Stack Quiz
      </h1> */}

      {data.length > 0 ? (
        data.map((question, index) => {
          const correctAnswer = question["Correct Answer"];
          const userAnswer = selectedAnswers[index];
          const selectedOptionText = question[`Option ${userAnswer}`];
          const isCorrect =
            selectedOptionText?.trim().toUpperCase() ===
            correctAnswer?.trim().toUpperCase();

          // Find the correct option label (A/B/C/D)
          const correctOptionEntry = Object.entries(question).find(
            ([key, value]) =>
              key.startsWith("Option ") &&
              value.trim().toUpperCase() === correctAnswer.trim().toUpperCase()
          );
          const correctOptionLabel = correctOptionEntry
            ? correctOptionEntry[0].replace("Option ", "")
            : "";

          return (
            <div
              key={index}
              className="mb-8 p-6 rounded-lg shadow-lg bg-white transition-all hover:shadow-xl"
            >
              <h2 className="font-semibold text-xl mb-5 text-gray-800">
                {index + 1}. {question.Question}
              </h2>

              <ul className="space-y-3">
                {["A", "B", "C", "D"].map(
                  (option) =>
                    question[`Option ${option}`] && (
                      <li key={option}>
                        <label
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border-2 ${
                            userAnswer === option
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          } ${
                            showAnswers[index]
                              ? question[`Option ${option}`]
                                  ?.trim()
                                  .toUpperCase() ===
                                correctAnswer?.trim().toUpperCase()
                                ? "border-green-500 bg-green-50"
                                : option === userAnswer
                                ? "border-red-500 bg-red-50"
                                : ""
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`answer-${index}`}
                            value={option}
                            checked={userAnswer === option}
                            onChange={() => handleAnswerSelect(index, option)}
                            className="hidden"
                          />
                          <div
                            className={`w-6 h-6 flex items-center justify-center mr-4 rounded-full border-2 text-sm font-semibold
                            ${
                              userAnswer === option
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "border-gray-400 text-gray-600"
                            }
                            ${
                              showAnswers[index] &&
                              question[`Option ${option}`]
                                ?.trim()
                                .toUpperCase() ===
                                correctAnswer?.trim().toUpperCase()
                                ? "bg-green-600 text-white border-green-600"
                                : ""
                            }`}
                          >
                            {option}
                          </div>
                          <span className="text-gray-800">
                            {question[`Option ${option}`]}
                          </span>
                        </label>
                      </li>
                    )
                )}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => toggleAnswer(index)}
                  disabled={!selectedAnswers[index]}
                  className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                    !selectedAnswers[index]
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {showAnswers[index] ? "Hide Explanation" : "Check Answer"}
                </button>

                {showAnswers[index] && (
                  <div className="ml-4 text-sm">
                    <span
                      className={`font-bold ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                    </span>
                    <span className="text-gray-700 ml-3">
                      Right Answer:{" "}
                      <strong>
                        {correctOptionLabel}. {correctAnswer}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 animate-pulse">📚 Loading questions...</p>
        </div>
      )}
    </div>
  );
}
