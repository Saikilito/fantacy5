import { join } from 'path'
import { Low, JSONFile } from 'lowdb'
import lodash from 'lodash'

import { raffleMocks } from './db.init'

import { LowWithChain } from '../../common/types'

type schemaObjectType = {
  [x: string]: any
}

const schemaObjects = {
  raffle: { raffles: raffleMocks },
  tickets: { tickets: [] },
} as schemaObjectType

export async function setDBConnection(schemaName: string) {
  // Use JSON file for storage
  const file = join(__dirname, `/${schemaName}.json`)
  const adapter = new JSONFile(file)
  const db = new Low(adapter) as LowWithChain

  // Read data from JSON file, this will set db.data content
  await db.read()

  // If file.json doesn't exist, db.data will be null
  // Set default data -> db.data = db.data || { raffles: [] }
  db.data ||= schemaObjects[schemaName]

  // Write db.data content to db.json
  await db.write()

  console.info(
    `::: ${schemaName?.toUpperCase()} DB :::`,
    JSON.stringify(db.data),
    '\n'
  )

  db.chain = lodash.chain(db.data)
  return db
}

export const getConnection = async () => {
  const connectionsName = ['raffle', 'tickets']

  const [raffleDb, ticketDb] = await Promise.all(
    connectionsName.map(async schemaName => await setDBConnection(schemaName))
  )

  return { raffleDb, ticketDb }
}
