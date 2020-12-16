const { Tray, Menu } = require('electron');
const path = require('path');

class TrayGenerator {
  constructor(mainWindow, store) {
    this.tray = null;
    this.store = store;
    this.mainWindow = mainWindow;
  }

  // Figures out x & y coordinates of tray and window so that window will open with a position relative to the tray icon.
  getWindowPosition = () => {
    // Get Bounds of the mainWindow & Tray
    const windowBounds = this.mainWindow.getBounds();
    const trayBounds = this.tray.getBounds();
    // Calculate the x & y coordinates
    const xCoordinate = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    const yCoordinate = Math.round(trayBounds.y + trayBounds.height);
    // return coordinates
    return { xCoordinate, yCoordinate };
  };

  // Sets the position of the main window based on the returns from getWindowPosition().
  showWindow = () => {
    // Get window coordinates
    const { xCoordinate, yCoordinate } = this.getWindowPosition();
    // Set window position & show window
    this.mainWindow.setPosition(xCoordinate, yCoordinate);
    this.mainWindow.show();
    // Sets visibility to true on mac for all desktops/workspaces
    this.mainWindow.setVisibleOnAllWorkspaces(true);
    // Focuses on the currently open window & sets visibility on non-focused workspaces to false
    this.mainWindow.focus();
    this.mainWindow.setVisibleOnAllWorkspaces(false);
  };

  // Toggle whether or not the window is visible based on its current status
  toggleWindow = () => {
    if (this.mainWindow.isVisible()) this.mainWindow.hide();
    else this.showWindow();
  };

  // Creates an array of options that are shown as a context menu when the usr right clicks the tray icon.
  rightClickMenu = () => {
    // Creating Array of actions
    const trayMenu = [
      {
        label: 'Launch at startup',
        type: 'checkbox',
        checked: this.store.get('launchAtStart'),
        click: (event) => this.store.set('launchAtStart', event.checked),
      },
      {
        role: 'quit',
        accelerator: 'Command+Q',
      },
    ];
    // Instantiating tray menu
    this.tray.popUpContextMenu(Menu.buildFromTemplate(trayMenu));
  };

  // Creates the tray instance via passing the path to the tray icon
  createTray = () => {
    this.tray = new Tray(path.join(__dirname, './assets/IconTemplate.png'));
    this.tray.setIgnoreDoubleClickEvents(true);

    this.tray.on('click', this.toggleWindow);
    this.tray.on('right-click', this.rightClickMenu);
  };
}

module.exports = TrayGenerator;
