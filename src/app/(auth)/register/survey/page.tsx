"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SurveyData, surveySchema } from "@/schemas/authForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { questions } from "./config";
import { QuestionCard } from "./question-card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const SurveyPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    mode: "onBlur",
    defaultValues: {
      weight: "",
      targetWeight: "",
      height: "",
      age: "",
      activityLevel: undefined,
      dietaryRestrictions: [],
      mealPreferences: [],
      healthConditions: [],
      goal: undefined,
      weeklyGoal: undefined,
      mealPrepTime: undefined,
      preferredCuisine: [],
      foodAllergies: [],
      trackingPreferences: [],
    },
  });

  const { formState } = form;

  const isCurrentFieldValid = !formState.errors[questions[currentQuestion].id]; //looks through formstaate errors and the errors object and checks if the current field is valid
  const currentFieldValue = form.watch(questions[currentQuestion].id); //watch is a hook that returns the current value of the field
  const hasValue = () => {
    const value = currentFieldValue;

    if (questions[currentQuestion].inputType === "multiselect") {
      return Array.isArray(value) && value.length > 0;
    }

    return value !== undefined && value !== "" && value !== null;
  };

  const onSubmit = async (data: SurveyData) => {
    try {
      // API call here
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Form {...form}>
      <form className="relative flex flex-col  items-center w-full justify-center h-[calc(100vh-17rem)] bg-transparent overflow-hidden">
        <div className="absolute top-4 w-10/12 max-w-md">
          <Progress value={progress} className="rounded-full" />
        </div>

        <div className="relative w-full h-[calc(100%-6rem)] flex justify-center overflow-hidden">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id}
              question={q}
              isActive={index === currentQuestion}
              position={
                index === currentQuestion
                  ? "current"
                  : index < currentQuestion
                  ? "before"
                  : "after"
              }
              form={form}
            />
          ))}
        </div>

        <div className="absolute bottom-4 w-10/12 max-w-md flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevQuestion}
            className={`${currentQuestion > 0 ? "visible" : "invisible"}`}
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={nextQuestion}
            className={currentQuestion > 0 ? "ml-auto" : ""}
            disabled={!isCurrentFieldValid || !hasValue()}
          >
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SurveyPage;
