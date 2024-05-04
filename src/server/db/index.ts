import { neon } from '@neondatabase/serverless'
import { DATABASE_URL } from '@/configs/constants'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(DATABASE_URL!)

const db = drizzle(sql)

export default db
