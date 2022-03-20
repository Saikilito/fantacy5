import path from 'path'
import { app, BrowserWindow } from 'electron'

import {
  registerHelperListeners,
  registerRaffleDbListeners,
  registerTicketDbListeners,
} from './listeners'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, './assets/raffle.ico'),
    width: 1570,
    height: 1100,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: true,
    },
  })

  // mainWindow.setIcon(path.join(__dirname, '/electron/assets/raffle.ico'))

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerHelperListeners)
  .then(registerRaffleDbListeners)
  .then(registerTicketDbListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows()?.length === 0) {
    createWindow()
  }
})

app.on(
  'certificate-error',
  function (event, webContents, url, error, certificate, callback) {
    event.preventDefault()
    callback(true)
  }
)
