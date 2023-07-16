import type { NextApiRequest, NextApiResponse } from "next";
import { searchRecipes } from "@/lib/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    const data = await searchRecipes(
      req.query.search as string,
      req.query.category as string,
      req.query.page as string,
      "8"
    );
    return res.status(200).json(data);
  }

  return res.status(405).end();
}
