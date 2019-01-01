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
app.on('ready', createLauncherWindow);

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

/* Process Functions */
// Uncaught Rejection, in case of Discord Timeouts
process.on('unhandledRejection', (reason) => {
  console.log(reason.stack || reason);
});

/* IPC -- Update Function */
let winLauncher = null;
function mainW(clientAppID) {
  winLauncher = new BrowserWindow({
    width: 800,
    height: 250,
    resizable: false,
  });
  mainWindow.minimize();
  mainWindow.hide();
  winLauncher.loadFile('gameConfig-temp.html');

  const pidVal = exec.spawn('node', ['discord-link.js', clientAppID]);

  // Hide the menu bar
  winLauncher.setMenu(null);

  winLauncher.on('closed', () => {
    winLauncher = null;
    const cmd = `taskkill /pid  ${pidVal.pid} /t /f`;
    if (process.platform === 'win32') {
      exec.exec(cmd);
    }
    mainWindow.show();
    mainWindow.restore();
  });
}

ipcMain.on('updateStat', (event, clientAppID) => {
  if (winLauncher === null) {
    mainW(clientAppID);
  }
});
