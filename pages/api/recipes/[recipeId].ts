import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "../../../lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const recipe = await getRecipeById(req.query.recipeId as string);
    return res.status(200).json(recipe);
  }

  if (req.method === "PUT") {
    const { body } = req;
    const { ...data } = JSON.parse(body);
    const recipe = await updateRecipe(
      req.query.recipeId as string,
      data.title,
      data.description,
      data.ingredients,
      data.steps,
      data.categories,
      data.photo
    );
    return res.status(200).json(recipe);
  }

  if (req.method === "DELETE") {
    const recipe = await deleteRecipe(req.query.recipeId as string);
    return res.status(200).json(recipe);
  }

  return res.status(405).end();
}
