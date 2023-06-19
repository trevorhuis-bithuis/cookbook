import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllRecipeIds() {
  const data = await prisma.recipe.findMany({
    select: {
      id: true,
    },
  });

  return data.map((recipe) => {
    return {
      params: {
        id: recipe.id,
      },
    };
  });
}

async function getRecipeData(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });

  return recipe;
}

async function getRecipes() {
  const recipes = await prisma.recipe.findMany();
  return recipes;
}

async function createRecipe(
  title: string,
  description: string,
  ingredients: string[],
  steps: string[],
  categories: string[],
  photo: string,
  authorEmail: string
) {
  const recipe = await prisma.recipe.create({
    data: {
      title,
      description,
      ingredients,
      steps,
      categories,
      photo,
      authorEmail,
    },
  });

  return recipe;
}

async function updateRecipe(
  id: string,
  title: string,
  description: string,
  ingredients: string[],
  steps: string[],
  categories: string[],
  photo: string,
  authorEmail: string
) {
  const recipe = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      ingredients,
      steps,
      photo,
      authorEmail,
    },
  });

  return recipe;
}

async function deleteRecipe(id: string) {
  const recipe = await prisma.recipe.delete({
    where: {
      id,
    },
  });

  return recipe;
}

export {
  getAllRecipeIds,
  getRecipeData,
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
