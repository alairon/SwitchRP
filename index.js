/** index.js
 * Functions used to by the client-side window.
 * Includes functions used by both electron and HTML.
*/

/* eslint-disable */

// IPC
const { ipcRenderer } = require('electron');

const titles = require('./titles.json');

const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  ipcRenderer.send('updateStat', document.getElementById('titleName').value);
});

/* Unused IPC commands -- may be used in the future
const disconnectGame = document.getElementById('disconnectGame');
disconnectGame.addEventListener('click', () => {
    ipcRenderer.send('disconnectGame', 'Successfully disconnected');
});

ipcRenderer.on('update-result', function(event, arg) {
    console.log("Discord clientID: " + arg);
});
*/

function getclientAppID(title) {
  let clientAppID;

  switch(title) {
    case 'Super Smash Bros. Ultimate':
      clientAppID = titles.SmashUltimate.clientAppID;
      break;
    case 'Splatoon 2':
      clientAppID = titles.Splatoon2.clientAppID;
      break;
    default:
      clientAppID = 0;
  }

  return clientAppID;
}

// Sets the text of the dropdown menu to what the user selected
function setTitle(title) {
  const titleName = document.getElementById('titleName');
  titleName.innerHTML = title;
  titleName.value = getclientAppID(title); //clientAppID
}

// Restores the initial values on the form
function resetValues() {
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game';
  document.getElementById('titleName').value = 0;
}