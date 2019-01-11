/* index.js
* Functions used by the client-side window
* Includes functions used by both HTML and electron
*/

/* eslint-disable */

/** IPC Renderer
 * Variables that allow the webpage to communicate with main.js
*/
const { ipcRenderer } = require('electron');

// Provides functionality to the 'Update Status' button in index.html
const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  ipcRenderer.send('updateStat', document.getElementById('titleName').value);
});

/** Game Titles
 * Functions that insert a list of games found from the specified JSON file.
*/
// File containing list of games
const gameList = require('./titles.json');

// Add titles from gameList into the dropdown menu
document.addEventListener('DOMContentLoaded', () => {
  const dropdownDiv = document.createDocumentFragment();

  for (let x = 0; x < Object.keys(gameList).length; x++) {
    const gameItem = document.createElement('button');
    const listObj = Object.values(gameList)[x];

    /* Produces a clickable dropdown item:
    <button class="dropdown-item" type="button" onclick="setTitle ${listObj.id}">
      listObj.longName
    </button>
    */
    gameItem.setAttribute('class', 'dropdown-item');
    gameItem.setAttribute('type', 'button');
    gameItem.setAttribute('onclick', `setTitle("${listObj.id}")`);
    gameItem.setAttribute('value', listObj.id);
    gameItem.innerHTML = listObj.longName;
    dropdownDiv.appendChild(gameItem);
  }

  document.getElementById('gameList').appendChild(dropdownDiv);
});

// Sets the text of the dropdown menu to what the user selected
function setTitle(id) {
  const titleName = document.getElementById('titleName');
  const listObj = Object.values(gameList)[id];
  document.getElementById('gameName').value = listObj.longName;
  document.getElementById('gameID').value = listObj.clientAppID;
  titleName.value = listObj.clientAppID;
  titleName.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Game selected';
}

/** Themes 
 * Allows the user to select between a light and dark theme
*/
// Toggles the interface between its light and dark variants
function toggleScheme() {
  const core = document.getElementById('bodyMain');
  const lightbulb = document.getElementById('lightToggle');
  const resetButton = document.getElementById('reset-btn');

  if (lightbulb.value == '0') {
    // Light -> Dark
    lightbulb.value = '1';
    lightbulb.innerHTML = '<i class="fas fa-lightbulb"></i>';
    core.classList.add('body-dark');
    core.classList.remove('body-light');
    resetButton.classList.add('btn-outline-light');
    resetButton.classList.remove('btn-outline-dark');
  } else {
    // Dark -> Light
    lightbulb.value = '0';
    lightbulb.innerHTML = '<i class="far fa-lightbulb"></i>';
    core.classList.add('body-light');
    core.classList.remove('body-dark');
    resetButton.classList.add('btn-outline-dark');
    resetButton.classList.remove('btn-outline-light');
  }
}

/** Page Reset
 * Restores the initial values on the form to its initial state
*/
function resetValues() {
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game';
  document.getElementById('gameName').value = '';
  document.getElementById('gameID').value = '';
  document.getElementById('gameDetails').value = '';
}
