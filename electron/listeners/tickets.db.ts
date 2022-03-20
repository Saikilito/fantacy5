import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

// Helpers
import { dispatchConnections } from '../listeners/connections.db'

// Constant
import { Constant } from '../../common/constants'

import {
  ITicketCommands,
  ITickets,
  ITicket,
  IPostTicket,
  IDateObject,
  LowWithChain,
} from '../../common/types'

const { DateFormat } = Constant.general

const cli = async (name: string, data: any) =>
  console.info(`::: ${name} :::\n`, data ?? '')

const ticketCommands = async (_, command: ITicketCommands, data?: any) => {
  let localDb: LowWithChain<ITickets> | null = null

  if (!localDb) {
    const { ticketDb: db } = await dispatchConnections(localDb)
    localDb = db
  }

  const ticketDb = localDb

  cli('Ticket Command', command)
  const ticketsData = ticketDb?.data?.tickets
  const momentDate = moment(data?.date, DateFormat).format(DateFormat)

  const commands = {
    getAll: async () => {
      cli('Get All tickets', ticketsData)
      return {
        success: true,
        data: ticketsData,
      }
    },
    getOne: () => {
      cli('flow', data)
      const id = data.id
      cli(`Get Ticket By Id: ${id}`, null)
      const response = ticketDb?.chain.get('tickets').find(data).value()
      cli('\n Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByDate: () => {
      data.date = momentDate
      cli(`Get Ticket By date: ${data?.date}`, data)
      const response = ticketDb?.chain.get('tickets').filter(data).value()
      cli('\n Response:', response)
      return {
        success: true,
        data: response,
      }
    },
    getByRange: () => {
      cli(`Get Ticket By Range: `, data?.data)
      const { startDate, endDate } = data?.data as IDateObject
      const preResponse = ticketDb?.chain.get('tickets').value()

      const response = preResponse?.filter((ticket: ITicket) => {
        const dateIsAfter = moment(ticket.date, DateFormat).isAfter(
          moment(startDate, DateFormat).subtract(1, 'day')
        )
        const dateIsBefore = moment(ticket.date, DateFormat).isBefore(
          moment(endDate, DateFormat).add(1, 'day')
        )
        cli('Ticket Date', ticket.date)
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
    create: async (ticket: IPostTicket) => {
      // Validate data
      cli('Ticket', { ticketDb, data: ticketDb?.data })
      if (!ticketDb?.data?.tickets) {
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
      const response = ticketDb?.data?.tickets?.filter(
        (data: any) => data.date !== momentDate
      )

      console.info('Exists?', response)

      // Build new ticket
      ticket = {
        date: moment().format(DateFormat),
        serialHeaders: [],
        selectedNumbers: [],
        matrixTickets: [],
      }

      response?.push({
        id,
        ...data,
        date: data.date,
      })

      // Save data base
      ticketDb.data.tickets = response as ITicket[]
      ticketDb?.write()

      return {
        success: true,
        data: {
          id,
          ...ticket,
        },
      }
    },
    remove: async () => {
      // Validate data
      if (!ticketDb?.data?.tickets?.length) {
        return {
          success: false,
          data: {},
        }
      }

      // Filter data by date
      const response = ticketDb?.chain
        .get('tickets')
        .filter(({ date }: any) => {
          console.info('into', date, momentDate)
          return date !== momentDate
        })
        .value()
      console.info('no entiendo', { date: data.date, momentDate, response })

      // Save into db
      ticketDb.data.tickets = response
      console.info('cono la madre', ticketDb)
      ticketDb.write()
    },
  }

  const commandResult = commands[command] as () => any

  return commandResult()
}

export async function registerTicketDbListeners() {
  // Send Message
  ipcMain.on('dispatchTicketConnections', async () => {})
  ipcMain.handle('ticketCommands', ticketCommands)
}
