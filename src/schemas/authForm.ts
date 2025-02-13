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
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
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
  activityLevel: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "VERY", "SUPER"]),
  gender: z.enum(["MALE", "FEMALE"]),
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
      "PEANUTS",
      "TREENUTS",
      "FISH",
      "SHELLFISH",
      "SOY",
      "EGG",
      "WHEAT",
      "DAIRY",
      "SESAME",
      "MUSTARD",
      "GLUTEN",
      "ALCOHOL",
      "BEEF",
      "PORK",
      "NONE",
    ])
  ),
  healthConditions: z.array(
    z.enum([
      "IBS",
      "DIABETES",
      "HBP",
      "CANCER",
      "OBESITY",
      "KIDNEY_DISEASE",
      "HEART_DISEASE",
      "NONE",
    ])
  ),
  activeDiet: z.enum([
    "MEDITERRANEAN",
    "KETO",
    "PALEO",
    "VEGAN",
    "CARNIVORE",
    "ATKINS",
    "NONE",
  ]),
});

export const userBaseSchema = surveySchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SurveyData = z.infer<typeof surveySchema>;
