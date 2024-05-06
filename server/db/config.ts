import 'dotenv/config'
import path from 'path'

export const DB_PATH = path.join(
  __dirname,
  process.env.DATABASE_URL ? `../${process.env.DATABASE_URL}` : 'db.sqlite'
)
