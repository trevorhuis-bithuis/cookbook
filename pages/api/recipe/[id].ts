import { Category, Ingredient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id: string = req.query.id as string

    const recipe = await prisma.recipe.findUnique({ where: { id }, include: { ingredients: true } })
    res.status(200).json({ recipe })
}

export default handler;