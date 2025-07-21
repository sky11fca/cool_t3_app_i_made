import { app, BrowserWindow, shell } from "electron";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },

  });
  win.setMenu(null);
  win.webContents.setWindowOpenHandler(({url}) => {
    if(url.startsWith("https://www.youtube.com/")) {
      shell.openExternal(url);
      return{action: "deny"};
    }

    return {action: "allow"};
  })
  win.webContents.on('will-navigate', (/** @type {{ preventDefault: () => void; }} */ event, /** @type {string} */ url) => {
    if (url.startsWith('https://www.youtube.com/')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

    const startURL = "http://localhost:3000";
  win.loadURL(startURL);
}

app.whenReady().then(createWindow);