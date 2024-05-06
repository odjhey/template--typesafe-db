import Database from 'better-sqlite3'
import * as path from 'path'
import { promises as fs } from 'fs'
import { Kysely, Migrator, FileMigrationProvider, SqliteDialect } from 'kysely'
import { DB_PATH } from './config'

async function migrateToLatest() {
  console.log('start migrate', DB_PATH)

  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: async () => new Database(DB_PATH),
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, './migrations'),
    }),
  })
  console.log('__dir', path.join(__dirname, './migrations'))

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
