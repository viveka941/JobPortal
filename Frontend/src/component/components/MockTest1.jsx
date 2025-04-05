import React, { useEffect, useState } from "react";
import Papa from "papaparse";

export default function MockTest1() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/mern.csv"); // ✅ No import
      const text = await response.text();

      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      setData(parsed.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">MERN Stack Quiz</h1>
      {data.length > 0 ? (
        data.map((question, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h2 className="font-semibold text-lg">
              {index + 1}. {question.Question}
            </h2>
            <ul className="ml-4 list-disc">
              <li>A) {question["Option A"]}</li>
              <li>B) {question["Option B"]}</li>
              <li>C) {question["Option C"]}</li>
              <li>D) {question["Option D"]}</li>
            </ul>
            <p className="text-green-600 mt-2">
              Correct Answer: <strong>{question["Correct Answer"]}</strong>
            </p>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
