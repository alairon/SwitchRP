'use strict';

/* Electron */
const {app, BrowserWindow} = require('electron');

/* IPC */
const ipcMain = require('electron').ipcMain;

/* Global Electron Window Values */
let mainWindow = null;

/* Main Window */
function createLauncherWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
    });

    //Load the main page
    mainWindow.loadFile('./index.html');

    //Hide the menu bar
    mainWindow.setMenu(null);

    //Show the Chrome development tools when launched
    //mainWindow.toggleDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

/* Electron Application */
app.on('ready', createLauncherWindow);

app.on('window-all-closed', () => {
    //Process is different with Darwin (Mac OS/OS X)
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null){
        createLauncherWindow();
    }
});

/* Process Functions */
//Uncaught Rejection, in case of Discord Timeouts
process.on('unhandledRejection', function (reason){
    console.log(reason.stack || reason);
});

/* IPC -- Update Function */
let winLauncher = null;
function mainW(clientAppID){
    winLauncher = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
    });

    winLauncher.loadFile('gameConfig-temp.html');

    const exec = require('child_process');
    const pidVal = exec.spawn('node', ['discord-link.js', clientAppID]);
    
    //Hide the menu bar
    winLauncher.setMenu(null);
    
    winLauncher.on('closed', () => {
        winLauncher = null;        
        const pk = require('child_process');
        if (process.platform === 'win32'){
            pk.exec('taskkill /pid ' + pidVal.pid + ' /t /f', function (error, out, errorMsg){
                console.log(errorMsg);
            });
        }
        mainWindow.show();
    });
}

ipcMain.on('updateStat', function(event, clientAppID) {
    if (winLauncher === null){
        mainW(clientAppID);
    }
});