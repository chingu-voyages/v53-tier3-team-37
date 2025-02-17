import z from "zod";
import {
  HealthIssue,
  Sensitivity,
  Roles,
  Gender,
  CredentialType,
  ActivityLevel,
  Diet,
  TrackingType,
} from "@prisma/client";

const userLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => User);
const favoriteLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Favorite);
const recipeLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Recipe);
// const credentialLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Credential);
const otpLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => OneTimePassword);
const logLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => DailyHealthLog);
const goalLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Goal);
const trackingLazy: z.ZodLazy<z.ZodTypeAny> = z.lazy(() => Tracking);

export const User = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(2, "at least 2 chars").max(60, "at most 60 chars"),
  age: z.number().int().min(13),
  sex: z.nativeEnum(Gender),
  password: z.string().optional(),
  createdAt: z.date().optional(),
  starting_weight: z.number().optional(),
  target_weight: z.number().optional(),
  current_weight: z.number().optional(),
  weight: z.number().optional(),
  height: z.number().int().optional(),
  lifestyle: z.nativeEnum(ActivityLevel).optional(),
  foodRestrictions: z.nativeEnum(Sensitivity).array().optional(),
  healthIssues: z.nativeEnum(HealthIssue).array().optional(),
  activeDiet: z.nativeEnum(Diet).optional(),
  goals: z.array(goalLazy).optional(),
  favorites: z.array(favoriteLazy).optional(),
  roles: z.nativeEnum(Roles).array().optional(),
  oneTimePassword: otpLazy.optional(),
  healthLogs: logLazy.optional(),
});

export const Goal = z.object({
  id: z.string().optional(),
  user: userLazy.optional(),
  userId: z.string().optional(),
  type: z.nativeEnum(TrackingType),
  threshold: z.number().int(),
});

export const DailyHealthLog = z.object({
  id: z.string().optional(),
  date: z.date().optional(),
  calories: z.number().int().optional(),
  protein: z.number().int().optional(),
  water: z.number().int().optional(),
  userId: z.string().optional(),
  user: userLazy.optional(),
});

export const GoalTracking = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  user: userLazy.optional(),
  foodSetId: z.string().optional(),
  exerciseSetId: z.string().optional(),
  sleepSetId: z.string().optional(),
  food: trackingLazy.optional(),
});

export const Tracking = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(TrackingType),
  amount: z.array(
    z.object({
      amount: z.number().int(),
      date: z.date().optional(),
    })
  ),
  goalSet: GoalTracking.optional(),
});

export const TrackingData = z.object({
  date: z.date(),
  amount: z.number().int(),
});

export const TrackingUpdate = z.object({
  type: z.nativeEnum(TrackingType),
  amount: z.number().int(),
});

export const OneTimePassword = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  otp: z.string().optional(),
  createdAt: z.date().optional(),
  expiresAt: z.string().optional(),
  userId: z.string().optional(),
  user: userLazy.optional(),
});

export const Credential = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.nativeEnum(CredentialType),
  value: z.string(),

  user: userLazy.optional(),
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
  email: true,
})
  .extend({
    password: z
      .string()
      .min(8, "at least 8 chars")
      .refine(
        passwordHasRequirements,
        "Your password must contain a number, a special character, and an uppercase letter"
      ),
  })
  .strict();

// so the user cant do sneaky tricks to make itself an admin or data account
export const UserUpdate = User.partial().omit({ roles: true }).strict();

export const PasswordUpdate = Account.pick({ password: true }).strict();

export const HealthProfile = UserUpdate.partial()
  .omit({
    id: true,
    email: true,
    name: true,
    password: true,
    createdAt: true,
    favorites: true,
    oneTimePassword: true,
    healthLogs: true,
    goals: true,
  })
  .strict();

export type HealthProfileData = z.infer<typeof HealthProfile>;

export const Login = User.pick({
  password: true,
})
  .extend({
    email: z.string().email(),
  })
  .strict();

// finished?

// query schemas

export const SearchQuery = z.object({
  search: z.string().optional(),
  caloriesMin: z.number().default(0).optional(),
  caloriesMax: z.number().default(0).optional(),
  proteinMin: z.number().default(0).optional(),
  proteinMax: z.number().default(0).optional(),
  fatMin: z.number().default(0).optional(),
  fatMax: z.number().default(0).optional(),
  carbohydratesMin: z.number().default(0).optional(),
  carbohydratesMax: z.number().default(0).optional(),
});
