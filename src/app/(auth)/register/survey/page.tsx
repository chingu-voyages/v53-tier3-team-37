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
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SurveyPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();

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

  const isCurrentFieldValid = !formState.errors[questions[currentQuestion].id]; //looks through form state errors and the errors object and checks if the current field is valid
  const currentFieldValue = form.watch(questions[currentQuestion].id); //watch is a hook that returns the current value of the field
  const hasValue = () => {
    const value = currentFieldValue;

    if (questions[currentQuestion].inputType === "multiselect") {
      return Array.isArray(value) && value.length > 0;
    }

    return value !== undefined && value !== "" && value !== null;
  };

  const onSubmit = async (data: SurveyData) => {
    console.log("submitted:", data);
    const healthProfile = {
      age: data.age,
      sex: data.gender,
      starting_weight: data.weight,
      target_weight: data.targetWeight,
      height: data.height,
      lifestyle: data.activityLevel,
      foodRestrictions: [...data.dietaryRestrictions, ...data.foodAllergies],
      healthIssues: data.healthConditions,
      activeDiet: data.activeDiet,
    };
    try {
      const response = await fetch("/api/user/healthProfile", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "X-User-Id": session?.user?.id || "" },
        body: JSON.stringify(healthProfile),
      });

      if (response.status === 303) {
        // Force a navigation to the login page
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error in Registration: ${errorData.error}`);
        throw new Error(errorData.error);
      }
      router.push("/profile");
    } catch (error) {
      console.error("Survey Submission Failed:", error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const data = form.getValues();
      onSubmit(data);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Form {...form}>
      <form className="relative flex flex-col items-center w-full bg-transparent space-y-4">
        <div className=" top-4 w-10/12 max-w-md">
          <Progress
            value={progress}
            className="rounded-full"
          />
        </div>

        <div className="relative w-full flex justify-center">
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={direction}>
            <QuestionCard
              key={currentQuestion}
              question={questions[currentQuestion]}
              isActive={true}
              form={form}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        <div className="  bottom-4 w-10/12 max-w-md flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevQuestion}
            className={`${currentQuestion > 0 ? "visible" : "invisible"}`}>
            Previous
          </Button>

          <Button
            type={"button"}
            onClick={nextQuestion}
            className={currentQuestion > 0 ? "ml-auto" : ""}
            disabled={!isCurrentFieldValid || !hasValue()}>
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SurveyPage;
