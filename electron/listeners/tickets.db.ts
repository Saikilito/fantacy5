import { ipcMain } from 'electron'
import { getConnection } from '../config/lowdb'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

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

let ticketDb: LowWithChain<ITickets> | null

const dispatchConnections = async () => {
  ticketDb = (await getConnection()).ticketDb as LowWithChain<ITickets>
}

const cli = async (name: string, data: any) =>
  console.info(`::: ${name} :::\n`, data ?? '')

const ticketCommands = (
  _,
  command: ITicketCommands,
  data?: any
): (() => any) => {
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
      ticket = { date: moment().format(DateFormat), ticketNumbers: [] }
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
      if (!ticketDb?.data?.tickets.length) {
        return {
          success: false,
          data: {},
        }
      }

      // Filter data by date
      const response = ticketDb?.chain
        .get('tickets')
        .filter(({ date }: any) => {
          return date !== momentDate
        })
        .value()

      // Save into db
      if (response.length) {
        ticketDb.data.tickets = ticketDb.data.tickets0.filter(
          ({ date }: any) => date !== momentDate
        )

        ticketDb.write()
      }
    },
  }

  const commandResult = commands[command] as () => any

  return commandResult()
}

export async function registerTicketDbListeners() {
  // Send Message
  ipcMain.on('dispatchConnections', dispatchConnections)
  ipcMain.handle('ticketCommands', ticketCommands)
}
