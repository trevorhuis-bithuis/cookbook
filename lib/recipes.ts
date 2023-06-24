import prisma from "./prisma";

async function getAllRecipeIds() {
  const data = await prisma.recipe.findMany({
    select: {
      id: true,
    },
  });

  return data.map((recipe) => {
    return {
      params: {
        recipeId: recipe.id,
      },
    };
  });
}

async function getRecipeById(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
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
      author: {
        connect: {
          email: authorEmail,
        },
      },
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
  photo: string
) {
  const recipe = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      ingredients,
      categories,
      steps,
      photo,
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

async function getAllRecipeCategories() {
  const categories = await prisma.recipe.findMany({
    distinct: ["categories"],
    select: {
      categories: true,
    },
  });
  let categoriesArray: string[] = [];
  categories.forEach((category) => {
    categoriesArray = categoriesArray.concat(category.categories);
  });
  return categoriesArray;
}

async function searchRecipes(
  query: string,
  category: string,
  page: string,
  limit: string
): Promise<any> {
  let recipes: any[] = [];

  if (query.length === 0 && category.toLowerCase() === "all") {
    recipes = await prisma.recipe.findMany({
      skip: parseInt(page),
      take: parseInt(limit),
    });
  } else if (query.length === 0 && category.toLowerCase() !== "all") {
    recipes = await prisma.recipe.findMany({
      where: {
        categories: {
          has: category,
        },
      },
      skip: parseInt(page),
      take: parseInt(limit),
    });
  } else if (query.length !== 0 && category.toLowerCase() === "all") {
    recipes = await prisma.recipe.findMany({
      where: {
        title: {
          search: query,
        },
      },
      skip: parseInt(page),
      take: parseInt(limit),
    });
  }
  return recipes;
}

export {
  getAllRecipeIds,
  getRecipeById,
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipeCategories,
  searchRecipes,
};
