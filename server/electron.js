const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('electron-store');
const TrayGenerator = require('./TrayGenerator');

// Store schema
const schema = {
  launchAtStart: true,
};
const store = new Store(schema);

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
    backgroundColor: '#1f1f1f',
    width: 500,
    height: 250,
    show: false,
    frame: false,
    title: 'Dev Health',
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  // Handling dev tools if the application is currently in development mode
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

  // Loading URL based on which mode the app is in (dev vs prod)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:1234'
      : `file://${path.join(__dirname, '../client/build/index.html')}`
  );
};

app.on('ready', () => {
  // Instantiating a new main window
  createMainWindow();
  // Instantiating and creating a new tray on app start
  Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();
});

// Closes the currently open instance before a hard refresh
app.on('before-quit', function () {
  Tray.destroy();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Setting the App to open at login when the open is set in the store
app.setLoginItemSettings({
  openAtLogin: store.get('launchAtStart'),
});

// Hiding the dock icon
app.dock.hide();
