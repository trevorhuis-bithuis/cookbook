import type { NextApiRequest, NextApiResponse } from "next";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../../lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { ...data } = JSON.parse(body);

  if (method === "GET") {
    const recipes = await getRecipes();
    return res.status(200).json(recipes);
  }

  if (method === "POST") {
    const recipe = await createRecipe(
      data.title,
      data.description,
      data.ingredients,
      data.steps,
      data.categories,
      data.photo,
      data.authorEmail
    );
    return res.status(200).json(recipe);
  }

  if (method === "PUT") {
    const recipe = await updateRecipe(
      data.id,
      data.title,
      data.description,
      data.ingredients,
      data.steps,
      data.categories,
      data.photo,
      data.authorEmail
    );
    return res.status(200).json(recipe);
  }

  if (method === "DELETE") {
    const recipe = await deleteRecipe(data.id);
    return res.status(200).json(recipe);
  }

  return res.status(405).end();
}
