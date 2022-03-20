import { GenericCRUD } from './crud.type'

export enum TicketCommands {
  getByDate = 'getByDate',
}

export type ITicket = {
  id: string
  date: string
  serialHeaders: number[]
  selectedNumbers: number[]
  matrixTickets: number[]
}

export type IPostTicket = {
  date: string
  serialHeaders: number[]
  selectedNumbers: number[]
  matrixTickets: number[]
}

export type ITickets = {
  tickets: ITicket[]
}

export type ITicketCommands = GenericCRUD | TicketCommands
