import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    const session = await getSession({ req })
    console.log(req.method)
    if (req.method === "DELETE") {
        if (session) {
            const recipe = await prisma.recipe.delete({
                where: { id },
            });
            res.json(recipe);
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } else if (req.method === "GET") {
        if (session) {
            const recipe = await prisma.recipe.findUnique({ where: { id } });
            res.json(recipe);
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}