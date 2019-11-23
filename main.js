/** main.js
 * Functions used by the "server"
 * Utilizes Node.js
 */

/* Application Directories */
const appDir = `${__dirname}/app/`;
const appJSDir = `${__dirname}/app/js/`;

/* File Directories */
const indexDir = `${appDir}index.html`;
const configDir = `${appDir}gameConfig.html`;
const discordDir = `${appJSDir}discordConnect.js`;

/* Electron */
const {
  app, BrowserWindow, Menu, ipcMain,
} = require('electron');

/* Child Processes */
const exec = require('child_process');

/* Global Electron Window Values */
let mainWindow = null;

/* Remove menu bars */
Menu.setApplicationMenu(null);

/* Main Window */
function createLauncherWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 720,
    height: 520,
    resizable: true,
  });

  // Load the main page
  mainWindow.loadFile(indexDir);

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
let discordWindow = null;
function statusWindow(clientAppID, details, largeImageKey) {
  discordWindow = new BrowserWindow({
    width: 800,
    height: 250,
    resizable: false,
  });

  // Shift control of windows
  mainWindow.minimize();
  mainWindow.hide();
  discordWindow.loadFile(configDir);

  const discordProcess = exec.fork(discordDir, [clientAppID, details, largeImageKey]);

  // Restore control to the main window when closed
  discordWindow.on('closed', () => {
    discordWindow = null;

    // Destroy the node process that connected to Discord
    if (process.platform === 'win32') {
      const cmd = `taskkill /pid  ${discordProcess.pid} /t /f`;
      exec.exec(cmd);
    } else {
      discordProcess.kill('SIGINT');
    }

    // Restore control to the main interface
    mainWindow.show();
    mainWindow.restore();
  });
}

ipcMain.on('updateStat', (event, clientAppID, details, largeImageKey) => {
  if (discordWindow === null) {
    statusWindow(clientAppID, details, largeImageKey);
  }
});
