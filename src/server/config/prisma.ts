import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { env } from './env.js'
import { PrismaClient } from '../generated/prisma/client.js'

const { Pool } = pg
const databasePool = new Pool({
  connectionString: env.DATABASE_URL,
})

const adapter = new PrismaPg(databasePool)

export const prisma = new PrismaClient({ adapter })
