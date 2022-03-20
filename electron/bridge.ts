import { contextBridge, ipcRenderer } from 'electron'
import { IRaffleCommands, ITicketCommands } from '../common/types'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  createConnections: async () => {
    ipcRenderer.send('dispatchRaffleConnections')
    ipcRenderer.send('dispatchTicketConnections')
  },

  raffleCommands: async (command: IRaffleCommands, data?: any) => {
    console.info('Invoke Command')
    return ipcRenderer.invoke('raffleCommands', command, data)
  },

  ticketCommands: async (command: ITicketCommands, data?: any) => {
    console.info('Invoke Command')
    return ipcRenderer.invoke('ticketCommands', command, data)
  },

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
