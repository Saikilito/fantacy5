import { ITicketCommands } from '../../common/types'

const { ticketCommands } = window.Main

export const getAll = async () => {
  const data = await ticketCommands('getAll' as ITicketCommands)
  console.info('Exec Get All Tickets Command Data\n', data)
  return data
}

export const getOne = async (whereType: string, value: any) => {
  const where: any = {}
  where[whereType] = value

  const data = await ticketCommands('getOne' as ITicketCommands, where)
  console.info('Exec Get One Ticket Command Data\n', data)
  return data
}

export const getByDate = async (date: string) => {
  const data = await ticketCommands('getByDate' as ITicketCommands, { date })
  console.info('Exec Get By Date Tickets Data\n', data)
  return data
}

export const getByRange = async (data: any) => {
  const response = await ticketCommands('getByRange' as ITicketCommands, {
    data,
  })
  console.info('Exec Get By Range Tickets Command Data\n', response)
  return response
}

export const create = async (objectNumbers: any, date: string) => {
  const data = { date, objectNumbers }
  const response = await ticketCommands('create' as ITicketCommands, data)
  console.info('Exec Crate Ticket Command Data\n', response)
  return data
}

export const removeTicket = async (date: string) => {
  const response = await ticketCommands('remove' as ITicketCommands, { date })
  console.info('Exec Remove Ticket Command\n', response)
  return response
}

export const findRaffle = async (date: string, raffle: number[]) => {
  const data = { date, raffle }
  const response = await ticketCommands('findRaffle' as ITicketCommands, data)
  console.info('Find Raffle result: ', response)
  return response
}
