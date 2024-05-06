import { InsertQueryBuilder } from 'kysely'
import { db } from '../../db/db'

export const list = async () => {
  return db.selectFrom('person').selectAll().execute()
}

export const createEntries = async (
  values: Array<{
    first_name: string
    last_name: string
    gender: string
  }>
) => {
  return db
    .insertInto('person')
    .values(values)
    .returning(['first_name', 'last_name'])
    .executeTakeFirst()
}
