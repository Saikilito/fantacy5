import { getConnection } from '../config/lowdb'

export const dispatchConnections = async (db: any) => {
  if (db) {
    return {
      raffleDb: db,
      ticketDb: db,
    }
  }
  const { raffleDb, ticketDb } = await getConnection()
  return { raffleDb, ticketDb }
}
