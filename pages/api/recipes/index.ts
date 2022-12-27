import { Category, Ingredient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type Data = {
    recipe: {
        id: string;
        title: any;
        category: any;
        favorite: any;
        steps: any;
        authorId: any;
        description: any;
        ingredients: any;
        images: any;
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { title, category, favorite, steps, authorEmail, description, ingredients, images } = req.body
    const recipe = await prisma.recipe.create(
        {
            data: {
                title: title,
                category: category,
                favorite: favorite,
                steps: steps,
                author: { connect: { email: authorEmail } },
                description: description,
                images: images
            }
        })
    const recipeIngredients = ingredients.map((ingredient: Ingredient) => ({ ...ingredient, recipeId: recipe.id }))
    const recipeIngredientsCreated = await prisma.ingredient.createMany({ data: recipeIngredients })
    res.status(200).json({
        recipe: {
            ...recipe,
            ingredients: recipeIngredientsCreated
        }
    })
}

export default handler;