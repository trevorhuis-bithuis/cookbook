import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../../../../lib/supabase-server'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.query.userId as string

    const supabase = createClient()

    const { data, error } = await supabase.from('recipes').select('*').eq('author_id', userId)
    if (error) {
        res.status(500).json({ error })
        return
    }
    const recipes = data || []
    res.status(200).json({ recipes })
}

export default handler
