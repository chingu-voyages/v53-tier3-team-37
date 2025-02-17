import { z } from "zod";

export const recipeSearchSchema = z.object({
  search: z.string().optional(),
  caloriesMin: z.number().optional(),
  caloriesMax: z.number().optional(),
  proteinMin: z.number().optional(),
  proteinMax: z.number().optional(),
  fatMin: z.number().optional(),
  fatMax: z.number().optional(),
  carbohydratesMin: z.number().optional(),
  carbohydratesMax: z.number().optional(),
});

export const tempRecipeSearchSchema = recipeSearchSchema
  .pick({
    search: true,
  })
  .extend({ includeIngredients: z.string().array().optional() });

export type RecipeSearchValues = z.infer<typeof recipeSearchSchema>;

export type RecipeSearchParams = z.infer<typeof tempRecipeSearchSchema>;
