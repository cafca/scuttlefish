const { app, BrowserWindow, protocol } = require("electron")
const path = require("path")
const os = require("os")

let mainWindow = null
app.allowRendererProcessReuse = true

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.loadFile(path.join(__dirname, "dist/index.html"))
  mainWindow.loadURL("http://localhost:8080")

  mainWindow.on("closed", () => {
    mainWindow = null
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
    mainWindow.focus()
  })
}

app.on("ready", () => {
  BrowserWindow.addDevToolsExtension(
    path.join(
      os.homedir(),
      "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.5.0_0/"
    )
  )

  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(7) /* all urls start with 'file://' */
      callback({ path: path.normalize(`${__dirname}/${url}`) })
    },
    err => {
      if (err) console.error("Failed to register protocol")
    }
  )

  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
  if (mainWindow === null) createWindow()
})
