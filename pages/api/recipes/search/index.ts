import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const recipes = await prisma.recipe.findMany()
    res.status(200).json({ recipes })
}

export default handler;