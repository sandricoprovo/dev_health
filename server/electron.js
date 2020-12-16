const { app, BrowserWindow } = require('electron');
const path = require('path');

// Windows
let mainWindow = null;
let isDev = true;

if (process.env.NODE_ENV === 'production') {
  isDev = false;
}

// Main Window
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

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:1234'
      : `file://${path.join(__dirname, '../client/build/index.html')}`
  );
};

app.on('ready', () => {
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
