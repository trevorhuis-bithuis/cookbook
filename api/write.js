import * as pg from 'pg';

let pool

export default async function handler(request, response) {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL
        pool = new pg.Pool({
            connectionString,
            max: 1
        })
    }

    const resp = await insertText(pool, request.body.text)

    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  }

const insertText = async (p, text) => {
    const client = await p.connect()
    try {
        await client.query('INSERT INTO sample (text) VALUES ($1)', [text])
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.release()
    }
}
