import { SearchQueryType } from "../queryRecipes/route";
import prisma from "./prisma";
export const getRecipesFromDB = async (filters: SearchQueryType) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      ...(filters.search && {
        name: {
          contains: filters.search,
          mode: "insensitive",
        },
      }),
      nutrition: {
        some: {
          AND: [
            ...(filters.caloriesMin !== undefined
              ? [
                  {
                    name: "Calories",
                    amount: { gte: filters.caloriesMin },
                  },
                ]
              : []),
            ...(filters.caloriesMax !== undefined
              ? [
                  {
                    name: "Calories",
                    amount: { lte: filters.caloriesMax },
                  },
                ]
              : []),
            ...(filters.proteinMin !== undefined
              ? [
                  {
                    name: "Protein",
                    amount: { gte: filters.proteinMin },
                  },
                ]
              : []),
            ...(filters.proteinMax !== undefined
              ? [
                  {
                    name: "Protein",
                    amount: { lte: filters.proteinMax },
                  },
                ]
              : []),
            ...(filters.fatMin !== undefined
              ? [
                  {
                    name: "Fat",
                    amount: { gte: filters.fatMin },
                  },
                ]
              : []),
            ...(filters.fatMax !== undefined
              ? [
                  {
                    name: "Fat",
                    amount: { lte: filters.fatMax },
                  },
                ]
              : []),
            ...(filters.carbohydratesMin !== undefined
              ? [
                  {
                    name: "Carbohydrates",
                    amount: { gte: filters.carbohydratesMin },
                  },
                ]
              : []),
            ...(filters.carbohydratesMax !== undefined
              ? [
                  {
                    name: "Carbohydrates",
                    amount: { lte: filters.carbohydratesMax },
                  },
                ]
              : []),
          ],
        },
      },
    },
    include: {
      nutrition: true, // Include nutrition JSON in the response
    },
  });

  return recipes;
};
