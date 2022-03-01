import { ipcMain } from 'electron'

const message = (_, message: any) => {
  console.log(message)
}

export async function registerHelperListeners() {
  // Send Message
  ipcMain.on('message', message)
}
