import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

// Helpers
import { dispatchConnections } from '../listeners/connections.db'

// Constant
import { Constant } from '../../common/constants'

import {
  IRaffleCommands,
  IRaffles,
  IRaffle,
  IPostRaffle,
  IDateObject,
  LowWithChain,
} from '../../common/types'

// To code
const { DateFormat } = Constant.general

const cli = async (name: string, data: any) =>
  console.info(`::: ${name} :::\n`, data ?? '')

const raffleCommands = async (_, command: IRaffleCommands, data?: any) => {
  let localDb: LowWithChain<IRaffles> | null = null

  if (!localDb) {
    const { raffleDb: db } = await dispatchConnections(localDb)
    localDb = db
  }

  const raffleDb = localDb

  cli('Raffle Command', command)
  const rafflesData = raffleDb?.data?.raffles
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
      const response = raffleDb?.chain.get('raffles').find(data).value()
      cli('\n Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByDate: () => {
      data.date = momentDate
      cli(`Get Raffle By date: ${data?.date}`, data)
      const response = raffleDb?.chain.get('raffles').filter(data).value()
      cli('Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByRange: () => {
      cli(`Get Raffle By Range: `, data?.data)
      const { startDate, endDate } = data?.data as IDateObject
      const preResponse = raffleDb?.chain.get('raffles').value()

      const response = preResponse?.filter((raffle: IRaffle) => {
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
      cli('raffle', { raffleDb, data: raffleDb?.data })
      // Validate data
      if (!raffleDb?.data?.raffles) {
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
      const response = raffleDb?.data?.raffles?.filter(
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
      raffleDb.data.raffles = response as IRaffle[]
      raffleDb?.write()

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
      if (!raffleDb?.data?.raffles?.length) {
        return {
          success: false,
          data: {},
        }
      }

      // Filter data by date
      const response = raffleDb?.chain
        .get('raffles')
        .filter(({ date }: any) => {
          return date !== momentDate
        })
        .value()

      // Save into db
      raffleDb.data.raffles = raffleDb.data.raffles.filter(
        ({ date }: any) => date !== momentDate
      )

      raffleDb.write()
    },
  }

  const commandResult = commands[command] as () => any

  return commandResult()
}

export async function registerRaffleDbListeners() {
  // Send Message
  ipcMain.on('dispatchRaffleConnections', async () => {})
  ipcMain.handle('raffleCommands', raffleCommands)
}
