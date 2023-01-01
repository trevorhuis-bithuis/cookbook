import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const email = req.query.email as string

    const userWithRecipes = await prisma.user.findUnique({ where: { email }, include: { recipes: true } })
    const recipes = userWithRecipes?.recipes || []
    res.status(200).json({ recipes })
}

export default handler;