import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../../../../lib/supabase-server'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createClient()
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) {
        res.status(500).json({ error })
        return
    }
    res.status(200).json({ data })
}

export default handler
