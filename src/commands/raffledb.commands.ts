import { IRaffleCommands } from '../../common/types'

const { raffleCommands } = window.Main

export const getAll = async () => {
  const data = await raffleCommands('getAll' as IRaffleCommands)
  console.info('Exec Command Data\n', data)
  return data
}

export const getOne = async (whereType: string, value: any) => {
  const where: any = {}
  where[whereType] = value

  const data = await raffleCommands('getOne' as IRaffleCommands, where)
  console.info('Exec Command Data\n', data)
  return data
}

export const getByDate = async (date: string) => {
  const data = await raffleCommands('getByDate' as IRaffleCommands, { date })
  console.info('Exec Command Data\n', data)
  return data
}

export const getByRange = async (data: any) => {
  const response = await raffleCommands('getByRange' as IRaffleCommands, {
    data,
  })
  console.info('Exec Command Data\n', response)
  return response
}

export const create = async (drawingNumbers: string[], date: string) => {
  const data = { date, drawingNumbers }
  const response = await raffleCommands('create' as IRaffleCommands, data)
  console.info('Exec Command Data\n', response)
  return data
}
