import type { NextApiRequest, NextApiResponse } from "next";
import { searchMenus } from "@/lib/menus";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const menus = await searchMenus(
      req.query.search as string,
      req.query.category as string,
      req.query.page as string,
      "8"
    );
    return res.status(200).json(menus);
  }

  return res.status(405).end();
}
