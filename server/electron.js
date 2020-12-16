const { app, BrowserWindow } = require('electron');
const path = require('path');
const TrayGenerator = require('./TrayGenerator');

// Windows
let mainWindow = null;
let Tray = null;
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
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  if (isDev) {
    // Loading in React Dev Tools
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      // eslint-disable-next-line import/no-extraneous-dependencies
      // eslint-disable-next-line global-require
    } = require('electron-devtools-installer');
    // Installing Devtools Extension
    installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
      console.log('Error loading React DevTools: ', err)
    );
    // Opening Dev Tools
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:1234'
      : `file://${path.join(__dirname, '../client/build/index.html')}`
  );
};

app.on('ready', () => {
  createMainWindow();
  // Instantiating and creating a new tray on app start
  Tray = new TrayGenerator(mainWindow);
  Tray.createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Hiding the dock icon
app.dock.hide();
