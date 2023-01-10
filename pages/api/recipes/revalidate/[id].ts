import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    if (req.method === "POST") {
        res.revalidate(`/recipes/${id}`)
        res.status(200).json({ revalidated: true })
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}