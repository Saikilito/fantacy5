import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
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
  const file = join(`./electron/config/${schemaName}.json`)
  const adapter = new JSONFileSync(file)
  const db = new LowSync(adapter) as LowWithChain

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

// // Create and query items using plain JS
// db.data.posts.push('hello world')
// db.data.posts[0]

// // You can also use this syntax if you prefer
// const { posts } = db.data
// posts.push('hello world')

// // Write db.data content to db.json
// await db.write()
