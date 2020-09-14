process.on("uncaughtException", function(err) {
  console.error(err);
  process.exit();
});

const { app, BrowserWindow, protocol } = require("electron");
const WindowState = require("electron-window-state");
const path = require("path");
const os = require("os");

let mainWindow = null;
app.allowRendererProcessReuse = true;

const createWindow = async () => {
  const windowState = WindowState({
    defaultWidth: 1200,
    defaultHeight: 800
  });

  mainWindow = new BrowserWindow({
    minWidth: 800,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: true,
    title: "Scuttlefish",
    show: true,
    backgroundColor: "#EEE",
    webPreferences: {
      nodeIntegration: true
    }
  });

  windowState.manage(mainWindow);
  mainWindow.setSheetOffset(40);

  // mainWindow.loadFile(path.join(__dirname, "dist/index.html"))
  mainWindow.loadURL("http://localhost:8080");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

app.on("ready", () => {
  try {
    BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.8.2_0/"
      )
    );
  } catch (e) {
    console.error(
      "Unable to register Chrome's React developer tools. Please adjust extension path in electron.js"
    );
  }

  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(7); /* all urls start with 'file://' */
      // eslint-disable-next-line standard/no-callback-literal
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    err => {
      if (err) console.error("Failed to register protocol");
    }
  );

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
