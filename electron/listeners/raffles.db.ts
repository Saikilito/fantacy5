import { ipcMain } from 'electron'
import { getConnection } from '../config/lowdb'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import { Constant } from '../../common/constants'
import {
  IRaffleCommands,
  IRaffles,
  IRaffle,
  IPostRaffle,
  IDateObject,
  LowWithChain,
} from '../../common/types'

const { DateFormat } = Constant.general

let raffles: LowWithChain<IRaffles> | null

const dispatchConnections = async () => {
  raffles = (await getConnection()).raffleDb as LowWithChain<IRaffles>
}

const cli = async (name: string, data: any) =>
  console.info(`::: ${name} :::\n`, data ?? '')

const raffleCommands = (
  _,
  command: IRaffleCommands,
  data?: any
): (() => any) => {
  cli('Raffle Command', command)
  const rafflesData = raffles?.data?.raffles
  const commands = {
    getAll: async () => {
      cli('Get All Raffles', rafflesData)
      return {
        success: true,
        data: rafflesData,
      }
    },
    getOne: () => {
      cli('flow', data)
      const id = data.id
      cli(`Get Raffle By Id: ${id}`, null)
      const response = raffles?.chain.get('raffles').find(data).value()
      cli('\n Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByDate: () => {
      cli(`Get Raffle By date: ${data?.date}`, data)
      const response = raffles?.chain.get('raffles').filter(data).value()
      cli('\n Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByRange: () => {
      cli(`Get Raffle By Range: `, data?.data)
      const { startDate, endDate } = data?.data as IDateObject
      const preresponse = raffles?.chain.get('raffles').value()

      const response = preresponse?.filter((raffle: IRaffle) => {
        const dateIsAfter = moment(raffle.date, DateFormat).isAfter(
          moment(startDate, DateFormat).subtract(1, 'day')
        )
        const dateIsBefore = moment(raffle.date, DateFormat).isBefore(
          moment(endDate, DateFormat).add(1, 'day')
        )
        cli('Raffle Date', raffle.date)
        console.info(
          'Date if after',
          moment(startDate, DateFormat).format(DateFormat),
          dateIsAfter
        )
        console.info(
          'Date if before',
          moment(endDate, DateFormat).format(DateFormat),
          dateIsBefore,
          '\n'
        )
        return dateIsAfter && dateIsBefore
      })
      cli('Response', response)
      return {
        success: true,
        data: response,
      }
    },
    create: async (raffle: IPostRaffle) => {
      const uid = uuidv4() as string
      const dirtyId = uid.split('-')
      const id = dirtyId.join('/')

      // Verify if exist
      const response = raffles?.chain.get('raffles').filter(data).value()
      console.info('Exists?', !!response, response)
      raffles?.chain.delete('raffles').filter(data).value()

      raffle = { date: moment().format(DateFormat), drawingNumbers: [] }
      console.info('data', data)
      raffles?.data?.raffles.push({
        id,
        ...data,
        date: data.date,
      })

      raffles?.write()

      return {
        success: true,
        data: {
          id,
          ...raffle,
        },
      }
    },
  }

  const commandResult = commands[command] as () => any

  return commandResult()
}

export async function registerRaffleDbListeners() {
  // Send Message
  ipcMain.on('dispatchConnections', dispatchConnections)
  ipcMain.handle('raffleCommands', raffleCommands)
}
