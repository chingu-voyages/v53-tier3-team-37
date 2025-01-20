import z from "zod";
import { HealthIssue, MealType, Roles } from "@prisma/client";

const userLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => User);
const favoriteLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Favorite);
const recipeLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Recipe);

export const User = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  name: z.string().min(2, "at least 2 chars").max(60, "at most 60 chars"),
  password: z.string(),
  roles: z.nativeEnum(Roles).array().optional(),
  starting_weight: z.number().optional(),
  current_weight: z.number().optional(),
  foodRestrictions: z.nativeEnum(MealType).array().optional(),
  healthIssue: z.nativeEnum(HealthIssue).array().optional(),
  favorites: z.array(favoriteLazy).optional(),
});

export const Favorite = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  recipeId: z.string().optional(),
  createdAt: z.date().optional(),

  user: userLazy.optional(),
  recipe: recipeLazy.optional(),
});

export const Recipe = z.object({
  id: z.string().optional(),
  ingredients: z.string(),
  instructions: z.string(),
  favorites: z.array(favoriteLazy).optional(),
});

function passwordHasRequirements(value: string): boolean {
  const reArray = [
    /\d/, // checks for a number
    /[A-Z]/, // checks for an uppercase letter
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, // checks for a special character
  ];

  for (const regex of reArray) {
    if (!regex.test(value)) return false;
  }
  return true;
}

// on account creation
export const Account = User.pick({
  name: true,
  username: true,
  email: true,
}).extend({
  password: z
    .string()
    .min(8, "at least 8 chars")
    .refine(passwordHasRequirements, "Your password must contain a number, a special character, and an uppercase letter"),
}).strict();

// so the user cant do sneaky tricks to make itself an admin or data account
export const UserUpdate = User.partial().omit({ roles: true }).strict();

export const Login = User.pick({
  password: true,
}).extend({
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
}).strict();

// finished?