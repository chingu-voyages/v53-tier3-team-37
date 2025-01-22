"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type Question = {
  id: number;
  question: string;
  inputType: string;
  placeholder: string;
};

type Answers = {
  [key: number]: string;
};

const FirstSurvey: React.FC = () => {
  
    const questions: Question[] = [
      { id: 1, question: "What is your weight (lbs)?", inputType: "number", placeholder: "Enter your weight" },
      { id: 2, question: "What is your height (inches)?", inputType: "number", placeholder: "Enter your height" },
      { id: 3, question: "Do you have any dietary restrictions?", inputType: "text", placeholder: "Enter your restrictions" },
    ];
  
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [answers, setAnswers] = useState<Answers>({});
  
    const handleInputChange = (id: number, value: string) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: value,
      }));
    };
  
    // const submitSurvey = async () => {
    //   try {
    //     const response = await fetch("/api/survey", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(answers),
    //     });
  
    //     if (response.ok) {
    //       console.log("Survey submitted successfully.");
    //     } else {
    //       console.error("Failed to submit survey.");
    //     }
    //   } catch (error) {
    //     console.error("Error submitting survey:", error);
    //   }
    // };
  
    const nextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setProgress(((currentQuestion + 1) / questions.length) * 100);
      } else {
        // submitSurvey();
        console.log("survey submitted");
      }
    };
  
    const prevQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
        setProgress(((currentQuestion - 1) / questions.length) * 100);
      }
    };
  
    return (
      <div className="relative flex flex-col items-center w-full justify-center h-[calc(100vh-20rem)] bg-gray-50 overflow-hidden">
        <div className="absolute top-4 w-10/12 max-w-md">
          <Progress value={progress} className="rounded-full" />
        </div>

        <div className="relative w-full h-[calc(100%-6rem)] flex items-center justify-center overflow-hidden">
          {questions.map((q, index) => (
            <Card
              key={q.id}
              className={`absolute w-11/12 max-w-md p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-500 ${
                index === currentQuestion
                  ? "translate-x-0 opacity-100"
                  : index < currentQuestion
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
            >
              <CardHeader>
                <h2 className="text-xl font-bold mb-4 text-center">{q.question}</h2>
              </CardHeader>
              <CardContent>
                <input
                  type={q.inputType}
                  placeholder={q.placeholder}
                  value={answers[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                {currentQuestion > 0 && (
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                  >
                    Previous
                  </Button>
                )}
                <Button onClick={nextQuestion}>
                  {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

export default FirstSurvey;
