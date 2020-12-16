const { app, BrowserWindow } = require('electron');
// const path = require('path');

// Windows
let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 500,
    height: 250,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.loadURL('http://localhost:3000');
};

app.on('ready', () => {
  createMainWindow();
});
