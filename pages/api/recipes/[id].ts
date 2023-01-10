import type { NextApiRequest, NextApiResponse } from 'next'
import Ingredient from "../../../interfaces/Ingredient"
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    const session = await getSession({ req })
    if (req.method === "DELETE") {
        if (session) {
            const recipe = await prisma.recipe.delete({
                where: { id },
            });
            res.json(recipe);
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } else if (req.method === "GET") {
        if (session) {
            const recipe = await prisma.recipe.findUnique({ where: { id }, include: { ingredients: true, author: true } });
            res.json(recipe);
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } else if (req.method === "PUT") {
        if (session) {
            const { ingredients } = req.body
            const recipe = await prisma.recipe.update({
                where: { id },
                data: { title: req.body.title, category: req.body.category, steps: req.body.steps, description: req.body.description },
            });
            await prisma.ingredient.deleteMany({ where: { recipeId: id } })
            const recipeIngredients = ingredients.map((ingredient: Ingredient) => ({ ...ingredient, recipeId: recipe.id }))
            const recipeIngredientsCreated = await prisma.ingredient.createMany({ data: recipeIngredients })
            await res.revalidate(`/recipes/${id}`)
            res.status(200).json({
                recipe: {
                    ...recipe,
                    ingredients: recipeIngredientsCreated
                }
            })
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}