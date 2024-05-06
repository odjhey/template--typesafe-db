import { Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { DB } from './tables'
import { DB_PATH } from './config'

const dialect = new SqliteDialect({
  database: async () => new Database(DB_PATH),
})
// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})
