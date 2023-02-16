import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient({ req, res })

    if (req.method === 'POST') {
        const { data: recipe, error: recipeError } = await supabase
            .from('recipes')
            .insert({
                title: req.body.title,
                steps: req.body.steps,
                ingredients: req.body.ingredients,
                description: req.body.description,
                author_id: req.body.author_id,
                image_url: req.body.imageUrl,
            })
            .select()
            .single()

        if (recipeError || !recipe) {
            res.status(500).json({ recipeError })
            return
        }

        const { data: categories, error: categoriesError } = await supabase
            .from('recipe_categories')
            .insert(
                req.body.categories.map((category: string) => {
                    return {
                        recipe_id: recipe.id,
                        name: category,
                    }
                })
            )
            .select()

        if (categoriesError) {
            res.status(500).json({ categoriesError })
            return
        }

        res.status(200).json({ recipe, categories })
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

export default handler
