import * as pg from 'pg'
const { Pool } = pg

let pool

export default async function handler(request, response) {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL
        pool = new Pool({
            connectionString,
            max: 1
        })
    }

    const resp = await readText(pool)

    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  }


const readText = async (p) => {
    const client = await p.connect()
    try {
        await client.query('SELECT * from sample;')
    } catch (err) {
        console.log(err.stack)
    } finally {
        client.release()
    }
}