import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const surveySchema = z.object({
  weight: z.coerce
    .number()
    .min(50, { message: "Weight must be at least 50 lbs" })
    .max(500, { message: "Weight must be less than 500 lbs" })
    .or(z.literal("")),
  targetWeight: z.coerce
    .number()
    .min(50, { message: "Target weight must be at least 50 lbs" })
    .max(500, { message: "Target weight must be less than 500 lbs" })
    .or(z.literal("")),
  height: z.coerce
    .number()
    .min(36, { message: "Height must be at least 36 inches" })
    .max(96, { message: "Height must be less than 96 inches" })
    .or(z.literal("")),
  age: z.coerce
    .number()
    .min(13, { message: "Must be at least 13 years old" })
    .max(120, { message: "Age must be less than 120" })
    .or(z.literal("")),
  activityLevel: z.enum(["sedentary", "light", "moderate", "very", "extra"], {
    message: "Please select an activity level",
  }),
  dietaryRestrictions: z.array(z.string()),
  mealType: z.array(z.string()),
  healthConditions: z.array(z.string()),
  goal: z.enum(["weight_loss", "muscle_gain", "maintenance", "health"]),
  weeklyGoal: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SurveyData = z.infer<typeof surveySchema>;
