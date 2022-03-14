import { GenericCRUD } from './crud.type'

export enum TicketCommands {
  getByDate = 'getByDate',
}

export type ITicket = {
  id: string
  date: string
  ticketNumbers: number[]
}

export type IPostTicket = {
  date: string
  ticketNumbers: number[]
}

export type ITickets = {
  tickets: ITicket[]
}

export type ITicketCommands = GenericCRUD | TicketCommands
