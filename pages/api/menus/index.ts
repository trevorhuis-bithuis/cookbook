import { NextApiRequest, NextApiResponse } from "next";
import { createMenu, getMenus } from "../../../lib/menus";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === "GET") {
    const recipes = await getMenus();
    return res.status(200).json(recipes);
  }

  if (method === "POST") {
    const { ...data } = JSON.parse(body);
    const menu = await createMenu(
      data.title,
      data.description,
      data.recipes,
      data.authorEmail
    );
    return res.status(200).json(menu);
  }
}
