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
        const { data, error } = await supabase
            .from('recipes')
            .update({
                title: req.body.title,
                categories: req.body.categories,
                steps: req.body.steps,
                ingredients: req.body.ingredients,
                description: req.body.description,
            })
            .eq('id', id)
            .select()
        if (error) {
            res.status(500).json({ error })
            return
        }
        console.log(data)
        res.status(200).json({ data })
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

export default handler
