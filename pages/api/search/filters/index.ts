import type { NextApiRequest, NextApiResponse } from "next";
import { getAllRecipeCategories } from "@/lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const categories = await getAllRecipeCategories();
    return res.status(200).json(categories);
  }

  return res.status(405).end();
}
