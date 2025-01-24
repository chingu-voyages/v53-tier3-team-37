export const questions = [
  {
    id: "weight",
    question: "What is your current weight (lbs)?",
    inputType: "number",
    placeholder: "Enter your weight",
    validation: {
      required: "Weight is required",
      min: { value: 50, message: "Weight must be at least 50 lbs" },
      max: { value: 500, message: "Weight must be less than 500 lbs" },
    },
  },
  {
    id: "targetWeight",
    question: "What is your target weight (lbs)?",
    inputType: "number",
    placeholder: "Enter your target weight",
    validation: {
      required: "Target weight is required",
      min: { value: 50, message: "Target weight must be at least 50 lbs" },
      max: { value: 500, message: "Target weight must be less than 500 lbs" },
    },
  },
  {
    id: "height",
    question: "What is your height (inches)?",
    inputType: "number",
    placeholder: "Enter your height",
    validation: {
      required: "Height is required",
      min: { value: 36, message: "Height must be at least 36 inches" },
      max: { value: 96, message: "Height must be less than 96 inches" },
    },
  },
  {
    id: "age",
    question: "What is your age?",
    inputType: "number",
    placeholder: "Enter your age",
    validation: {
      required: "Age is required",
      min: { value: 13, message: "Must be at least 13 years old" },
      max: { value: 120, message: "Age must be less than 120" },
    },
  },
  {
    id: "activityLevel",
    question: "What is your activity level?",
    inputType: "select",
    placeholder: "Select your activity level",
    options: [
      { value: "sedentary", label: "Sedentary (little or no exercise)" },
      {
        value: "light",
        label: "Lightly active (light exercise 1-3 days/week)",
      },
      {
        value: "moderate",
        label: "Moderately active (moderate exercise 3-5 days/week)",
      },
      { value: "very", label: "Very active (hard exercise 6-7 days/week)" },
      {
        value: "extra",
        label: "Extra active (very hard exercise & physical job)",
      },
    ],
    validation: {
      required: "Activity level is required",
    },
  },
  {
    id: "dietaryRestrictions",
    question: "Do you have any dietary restrictions?",
    inputType: "multiselect",
    placeholder: "Select all that apply",
    options: [
      { value: "none", label: "None" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "gluten_free", label: "Gluten-free" },
      { value: "dairy_free", label: "Dairy-free" },
      { value: "kosher", label: "Kosher" },
      { value: "halal", label: "Halal" },
    ],
    validation: {
      required: "Please select at least one option",
    },
  },
  {
    id: "healthConditions",
    question: "Do you have any health conditions?",
    inputType: "multiselect",
    placeholder: "Select all that apply",
    options: [
      { value: "none", label: "None" },
      { value: "diabetes", label: "Diabetes" },
      { value: "hypertension", label: "Hypertension" },
      { value: "heart_disease", label: "Heart Disease" },
      { value: "celiac", label: "Celiac Disease" },
      { value: "other", label: "Other" },
    ],
    validation: {
      required: "Please select at least one option",
    },
  },
  {
    id: "goal",
    question: "What is your primary goal?",
    inputType: "select",
    placeholder: "Select your goal",
    options: [
      { value: "weight_loss", label: "Weight Loss" },
      { value: "muscle_gain", label: "Muscle Gain" },
      { value: "maintenance", label: "Maintain Weight" },
      { value: "health", label: "General Health" },
    ],
    validation: {
      required: "Goal is required",
    },
  },
  {
    id: "weeklyGoal",
    question: "What is your weekly weight goal?",
    inputType: "select",
    placeholder: "Select your weekly goal",
    options: [
      { value: "0.5", label: "Lose 0.5 lbs per week" },
      { value: "1.0", label: "Lose 1.0 lbs per week" },
      { value: "1.5", label: "Lose 1.5 lbs per week" },
      { value: "2.0", label: "Lose 2.0 lbs per week" },
      { value: "maintain", label: "Maintain weight" },
      { value: "+0.5", label: "Gain 0.5 lbs per week" },
      { value: "+1.0", label: "Gain 1.0 lbs per week" },
    ],
    validation: {
      required: "Weekly goal is required",
    },
  },
] as const;
