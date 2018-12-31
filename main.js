'use strict';

/* Electron */
const {app, BrowserWindow} = require('electron');

/* IPC */
const ipcMain = require('electron').ipcMain;

/* Global Electron Window Values */
let mainWindow = null;

/* Main Window */
function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
    });

    //Load the main page
    mainWindow.loadFile('./index.html');

    //Hide the menu bar
    mainWindow.setMenu(null);

    //Show the Development Tools
    mainWindow.toggleDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

/* Electron Application */
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    //Process is different with Darwin (Mac OS/OS X)
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null){
        createWindow();
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

    winLauncher.loadFile('index.html');

    const exec = require('child_process');
    var pidVal;
    pidVal = exec.spawn('node', ['discord-link.js', clientAppID]);
    console.log(pidVal.pid);
    
    winLauncher.setMenu(null);
    winLauncher.toggleDevTools();
    
    winLauncher.on('closed', () => {
        winLauncher = null;        
        const pk = require('child_process');
        if (process.platform === 'win32'){
            console.log ("This is on Windows");
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

ipcMain.on('disconnect', function(event){
    if (winLauncher !== null){
        winLauncher.destroy();
    }
});