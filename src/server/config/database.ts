import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg

export const databasePool = new Pool({
  connectionString: env.DATABASE_URL,
})

export async function checkDatabaseConnection(): Promise<boolean> {
  const client = await databasePool.connect()

  try {
    await client.query('SELECT 1')
    return true
  } finally {
    client.release()
  }
}
