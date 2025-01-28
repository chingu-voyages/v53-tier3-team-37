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
  weight: z.coerce.number().min(50).max(500).or(z.literal("")),
  targetWeight: z.coerce.number().min(50).max(500).or(z.literal("")),
  height: z.coerce.number().min(36).max(96).or(z.literal("")),
  age: z.coerce.number().min(13).max(120).or(z.literal("")),
  activityLevel: z.enum(["sedentary", "light", "moderate", "very", "extra"]),
  gender: z.enum(["male", "female", "non-binary"]),
  goal: z.enum(["weight_loss", "muscle_gain", "maintenance", "health"]),
  weeklyGoal: z.enum(["0.5", "1.0", "1.5", "2.0", "maintain", "+0.5", "+1.0"]),
  mealPrepTime: z.enum(["under_30", "30_60", "60_120", "over_120"]),
  preferredCuisine: z.array(
    z.enum([
      "asian",
      "mediterranean",
      "american",
      "mexican",
      "indian",
      "no_preference",
    ])
  ),
  foodAllergies: z.array(
    z.enum(["none", "nuts", "dairy", "eggs", "soy", "shellfish", "other"])
  ),
  trackingPreferences: z.array(
    z.enum([
      "water_intake",
      "nutrients",
      "calories",
      "exercise",
      "sleep",
      "weight",
    ])
  ),
  mealPreferences: z.array(
    z.enum([
      "home_cooked",
      "meal_prep",
      "quick_meals",
      "new_recipes",
      "budget_friendly",
    ])
  ),
  dietaryRestrictions: z.array(
    z.enum([
      "none",
      "vegetarian",
      "vegan",
      "gluten_free",
      "dairy_free",
      "kosher",
      "halal",
    ])
  ),
  healthConditions: z.array(
    z.enum([
      "none",
      "diabetes",
      "hypertension",
      "heart_disease",
      "celiac",
      "other",
    ])
  ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SurveyData = z.infer<typeof surveySchema>;
