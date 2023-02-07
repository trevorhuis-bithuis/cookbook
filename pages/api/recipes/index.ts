import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../../../lib/supabase-server'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const supabase = createClient()
}

export default handler
