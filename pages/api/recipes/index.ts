import type { NextApiRequest, NextApiResponse } from "next";
import { getRecipes, createRecipe } from "../../../lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "GET") {
    const recipes = await getRecipes();
    return res.status(200).json(recipes);
  }

  if (method === "POST") {
    const { ...data } = JSON.parse(body);
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

  return res.status(405).end();
}
