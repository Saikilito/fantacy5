import { GenericCRUD } from './crud.type'

export enum RaffleCommands {
  getByDate = 'getByDate',
}

export type IRaffle = {
  id: string
  date: string
  drawingNumbers: number[]
}

export type IPostRaffle = {
  date: string
  drawingNumbers: number[]
}

export type IRaffles = {
  raffles: IRaffle[]
}

export type IDateObject = {
  startDate: Date
  endDate: Date
}

export type IRaffleCommands = GenericCRUD | RaffleCommands
