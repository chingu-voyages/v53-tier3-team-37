import prisma from "./prisma";
export const getRecipesFromDB = async () => {
  return await prisma.recipe.findMany();
};
