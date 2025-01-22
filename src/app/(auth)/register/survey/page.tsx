"use client";

import { useState } from "react";

const FirstSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is your weight?",
      inputType: "number",
      placeholder: "Enter your weight in kg",
    },
    {
      id: 2,
      question: "What is your height?",
      inputType: "number",
      placeholder: "Enter your height in cm",
    },
    {
      id: 3,
      question: "Do you have any dietary restrictions?",
      inputType: "text",
      placeholder: "e.g., Vegan, Gluten-Free",
    },
  ];

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="relative h-[calc(100vh-20rem)] w-full overflow-hidden flex items-center justify-center">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`absolute top-0 left-0 h-full w-full flex items-center justify-center transform transition-transform duration-500 ${
            index === currentQuestion
              ? "translate-x-0"
              : index < currentQuestion
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div className="bg-white shadow-lg p-6 rounded-md w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">{q.question}</h2>
            <input
              type={q.inputType}
              placeholder={q.placeholder}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={nextQuestion}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FirstSurvey;
