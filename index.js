/** index.js
 * Functions used to by the client-side window.
 * Includes functions used by both electron and HTML.
*/

/* eslint-disable */

// IPC
const { ipcRenderer } = require('electron');

// JSON containing game titles
const gameList = require('./titles.json');

// Add functionality to the 'Update Status' button
const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  ipcRenderer.send('updateStat', document.getElementById('titleName').value);
});

/* Gets a clientAppID based on the game's title*/
function getclientAppID(title) {
  let clientAppID;

  switch(title) {
    case 'Super Smash Bros. Ultimate':
      clientAppID = gameList.SmashUltimate.clientAppID;
      break;
    case 'Splatoon 2':
      clientAppID = gameList.Splatoon2.clientAppID;
      break;
    default:
      clientAppID = 0;
  }

  return clientAppID;
}

// Sets the text of the dropdown menu to what the user selected
function setTitle(title) {
  const titleName = document.getElementById('titleName');
  document.getElementById('gameName').value = title;
  document.getElementById('gameID').value = getclientAppID(title);
  titleName.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Game selected';
}

// Restores the initial values on the form
function resetValues() {
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game';
  document.getElementById('gameName').value = "";
  document.getElementById('gameID').value = "";
  document.getElementById('gameDetails').value = "";
}