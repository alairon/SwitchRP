/** main.js
 * Functions used by the "server"
 * Utilizes Node.js
 */

/* Electron */
const { app, BrowserWindow } = require('electron');

/* IPC */
const { ipcMain } = require('electron');

/* Child Processes */
const exec = require('child_process');

/* Global Electron Window Values */
let mainWindow = null;

/* Main Window */
function createLauncherWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 800,
    height: 600,
    resizable: true,
  });

  // Load the main page
  mainWindow.loadFile('./index.html');

  // Hide the menu bar
  mainWindow.setMenu(null);

  // Show the Chrome development tools when launched
  // mainWindow.toggleDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/* Electron Application */
app.on('ready', () => {
  /* Start the application if it's the only instance */
  const singleInstance = app.requestSingleInstanceLock();

  if (!singleInstance) {
    app.quit();
  } else {
    createLauncherWindow();
  }
});

app.on('window-all-closed', () => {
  // Process is different with Darwin (Mac OS/OS X)
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createLauncherWindow();
  }
});

/* IPC -- Update Function */
let winLauncher = null;
function statusWindow(clientAppID) {
  winLauncher = new BrowserWindow({
    width: 800,
    height: 250,
    resizable: false,
  });

  // Shift control of windows
  mainWindow.minimize();
  mainWindow.hide();
  winLauncher.loadFile('gameConfig-temp.html');

  const pidVal = exec.spawn('node', ['discordConnect.js', clientAppID]);

  // Hide the menu bar
  winLauncher.setMenu(null);

  winLauncher.on('closed', () => {
    winLauncher = null;

    if (process.platform === 'win32') {
      const cmd = `taskkill /pid  ${pidVal.pid} /t /f`;
      exec.exec(cmd);
    } else {
      pidVal.kill('SIGINT');
    }

    // Restore control to the main interface
    mainWindow.show();
    mainWindow.restore();
  });
}

ipcMain.on('updateStat', (event, clientAppID) => {
  if (winLauncher === null) {
    statusWindow(clientAppID);
  }
});
