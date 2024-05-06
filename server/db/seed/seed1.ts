import { db } from '../db'

export default async function seed1() {
  const values = [
    {
      first_name: 'John',
      last_name: 'Doe',
      gender: 'M',
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      gender: 'unk',
    },
  ]

  db.insertInto('person').values(values).execute()
}

seed1()
