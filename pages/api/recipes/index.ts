import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient({ req, res })

    console.log(req.body)

    if (req.method === 'POST') {
        const { data, error } = await supabase.from('recipes').insert({
            title: req.body.title,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            description: req.body.description,
            categories: req.body.categories,
            author_id: req.body.author_id,
        })
        console.log(data)
        if (error) {
            res.status(500).json({ error })
            return
        }
        res.status(200).json({ data })
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

export default handler
