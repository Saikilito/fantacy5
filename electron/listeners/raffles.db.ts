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

let ticketDb: LowWithChain<IRaffles> | null

const dispatchConnections = async () => {
  ticketDb = (await getConnection()).ticketDb as LowWithChain<IRaffles>
}

const cli = async (name: string, data: any) =>
  console.info(`::: ${name} :::\n`, data ?? '')

const ticketCommands = (
  _,
  command: IRaffleCommands,
  data?: any
): (() => any) => {
  cli('Raffle Command', command)
  const rafflesData = raffles?.data?.raffles
  const momentDate = moment(data?.date, DateFormat).format(DateFormat)

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
      data.date = momentDate
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
      // Validate data
      if (!raffles?.data?.raffles) {
        return {
          success: false,
          data: {},
        }
      }

      // Generate ID
      const uid = uuidv4() as string
      const dirtyId = uid.split('-')
      const id = dirtyId.join('/')

      // Clear data
      const response = raffles?.data?.raffles?.filter(
        (data: any) => data.date !== momentDate
      )

      console.info('Exists?', response)

      // Build new raffle
      raffle = { date: moment().format(DateFormat), drawingNumbers: [] }
      response?.push({
        id,
        ...data,
        date: data.date,
      })

      // Save data base
      raffles.data.raffles = response as IRaffle[]
      raffles?.write()

      return {
        success: true,
        data: {
          id,
          ...raffle,
        },
      }
    },
    remove: async () => {
      // Validate data
      if (!raffles?.data?.raffles) {
        return {
          success: false,
          data: {},
        }
      }

      // Filter data by date
      const response = raffles?.chain
        .get('raffles')
        .filter(({ date }: any) => {
          return date !== momentDate
        })
        .value()

      // Save into db
      if (response.length) {
        raffles.data.raffles = raffles.data.raffles.filter(
          ({ date }: any) => date !== momentDate
        )

        raffles.write()
      }
    },
  }

  const commandResult = commands[command] as () => any

  return commandResult()
}

export async function registerRaffleDbListeners() {
  // Send Message
  ipcMain.on('dispatchConnections', dispatchConnections)
  ipcMain.handle('ticketCommands', ticketCommands)
}
