import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id as string

    const supabase = createServerSupabaseClient({ req, res })

    if (req.method === 'DELETE') {
        const { data, error } = await supabase
            .from('recipes')
            .delete()
            .match({ id: id })
        if (error) {
            res.status(500).json({ error })
            return
        }
        res.status(200).json({ data })
    } else if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .match({ id: id })
            .single()
        if (error) {
            res.status(500).json({ error })
            return
        }
        res.status(200).json(data)
    } else if (req.method === 'PUT') {
        const categories: string[] = req.body.categories;

        const { data, error } = await supabase
            .from('recipes')
            .update({
                title: req.body.title,
                steps: req.body.steps,
                ingredients: req.body.ingredients,
                description: req.body.description,
                image_url: req.body.imageUrl,
            })
            .eq('id', id)
            .select()
        if (error) {
            res.status(500).json({ error })
            return
        }

        const { data: categoriesData, error: categoriesError } = await supabase
            .from('recipe_categories')
            .delete()
            .match({ recipe_id: id })
        if (categoriesError) {
            res.status(500).json({ categoriesError })
            return
        }

        const { data: newCategoriesData, error: newCategoriesError } = await supabase
            .from('recipe_categories')
            .insert(
                categories.map((category: string) => {
                    return {
                        recipe_id: id,
                        name: category,
                    }
                })
            )
        if (newCategoriesError) {
            res.status(500).json({ newCategoriesError })
            return
        }

        res.status(200).json({ data, categories: newCategoriesData })
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

export default handler
