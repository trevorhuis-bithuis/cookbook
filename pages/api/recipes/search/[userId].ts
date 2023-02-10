import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.query.userId as string

    const supabase = createServerSupabaseClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session)
        return res.status(401).json({
            error: 'not_authenticated',
            description:
                'The user does not have an active session or is not authenticated',
        })

    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('author_id', userId)
    if (error) {
        res.status(500).json({ error })
        return
    }
    const recipes = data || []
    res.status(200).json({ recipes })
}

export default handler
