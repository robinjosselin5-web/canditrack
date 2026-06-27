import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'
import { databasePool } from './database.js'

const adapter = new PrismaPg(databasePool)

export const prisma = new PrismaClient({ adapter })
