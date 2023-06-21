import { NextApiRequest, NextApiResponse } from "next";
import { deleteRecipe, getRecipeById } from "../../../lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const recipe = await getRecipeById(req.query.recipeId as string);
    return res.status(200).json(recipe);
  }

  if (req.method === "PUT") {
  }

  if (req.method === "DELETE") {
    const { body } = req;
    const { ...data } = JSON.parse(body);
    const recipe = await deleteRecipe(data.id);
    return res.status(200).json(recipe);
  }

  return res.status(405).end();
}
