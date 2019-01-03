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

function toggleScheme() {
  let core = document.getElementById('bodyMain');
  let color = document.getElementById('lightToggle');
  let button = document.getElementById('reset-btn');
  switch (color.value){
    case '0':
      color.value = '1';
      color.innerHTML = '<i class="fas fa-lightbulb"></i>';
      core.classList.add('body-dark');
      core.classList.remove('body-light');
      button.classList.add('btn-outline-light');
      button.classList.remove('btn-outline-dark');
      break;
    default:
      color.value = '0';
      color.innerHTML = '<i class="far fa-lightbulb"></i>';
      core.classList.add('body-light');
      core.classList.remove('body-dark');
      button.classList.add('btn-outline-dark');
      button.classList.remove('btn-outline-light');
  }
}

// Sets the text of the dropdown menu to what the user selected
function setTitle(title) {
  const titleName = document.getElementById('titleName');
  document.getElementById('gameName').value = title;
  document.getElementById('gameID').value = getclientAppID(title);
  titleName.value = getclientAppID(title); //Value
  titleName.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Game selected';
}

// Restores the initial values on the form
function resetValues() {
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game';
  document.getElementById('gameName').value = "";
  document.getElementById('gameID').value = "";
  document.getElementById('gameDetails').value = "";
}