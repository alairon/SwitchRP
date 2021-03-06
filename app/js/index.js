/* index.js
* Functions used by the client-side window
* Includes functions used by both HTML and electron
*/

/* eslint no-unused-vars: 0 */
/* eslint import/no-unresolved: 0 */
/* eslint import/no-dynamic-require: 0 */

// IPC Renderer
const { ipcRenderer, shell } = require('electron');

// File containing list of game titles
let gameList = require(`${__dirname}/titles.json`);

const reload = require('require-reload')(require);

/** IPC Renderer Function
 * Sends a signal to main.js to update the user's discord status
 */
// Provides functionality to the 'Update Status' button in index.html
const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  const { clientAppID, largeImageKey } = gameList[document.getElementById('titleName').value];
  const gameDetails = document.getElementById('gameDetails').value;
  ipcRenderer.send('updateStat', clientAppID, gameDetails, largeImageKey);
});

/** Game Titles
 * Functions that insert a list of games found from the specified JSON file.
*/
// Add titles from gameList into the dropdown menu
document.addEventListener('DOMContentLoaded', () => {
  const dropdownDiv = document.createDocumentFragment();

  for (let x = 0; x < Object.keys(gameList).length; x += 1) {
    const gameItem = document.createElement('button');
    const listObj = Object.values(gameList)[x];
    const listKey = Object.keys(gameList)[x];

    /* Produces a HTML dropdown item via Bootstrap:
    <button class="dropdown-item" type="button" onclick="setTitle ${listObj.id}">
      listObj.longName
    </button>
    */
    gameItem.setAttribute('class', 'dropdown-item');
    gameItem.setAttribute('type', 'button');
    gameItem.setAttribute('onclick', `setTitle("${listKey}")`);
    gameItem.setAttribute('value', listKey);
    gameItem.innerHTML = listObj.longName;
    dropdownDiv.appendChild(gameItem);
  }

  document.getElementById('gameList').appendChild(dropdownDiv);
});

// Sets the text of the dropdown menu to what the user selected
function setTitle(id) {
  const titleName = document.getElementById('titleName');
  const listObj = gameList[id];
  document.getElementById('gameName').value = listObj.longName;
  document.getElementById('gameID').value = listObj.clientAppID;
  document.getElementById('updateStatus').disabled = false;
  titleName.value = id;
  titleName.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Game selected ';
}

/** Themes
 * Allows the user to select between a light and dark theme
*/
// Toggles the interface between its light and dark variants
function toggleScheme() {
  const core = document.getElementById('bodyMain');
  const lightbulb = document.getElementById('lightToggle');
  const resetButton = document.getElementById('reset-btn');

  if (lightbulb.value === '0') {
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
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game ';
  document.getElementById('titleName').value = '';
  document.getElementById('gameName').value = '';
  document.getElementById('gameID').value = '';
  document.getElementById('gameDetails').value = '';
  document.getElementById('updateStatus').disabled = true;
}

/** launchDiscordDevLink
 * Uses the user's default browser to open up Discord's Developers page.
 */
function launchDiscordDevLink() {
  shell.openExternal('https://discordapp.com/developers/');
}

/** reloadList
 * Applies changes to the titles.json file by reloading the file.
 */
function reloadList() {
  gameList = reload(`${__dirname}/titles.json`);
}

/** Tooltips
 * Activates Bootstrap tooltips
*/
$(() => {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover',
  });
});

/** Action after hiding the modal
 * Upon closing the "Add Game" modal, calls on reloadList to reload the file.
 */
$('#addGameModal').on('hidden.bs.modal', () => {
  reloadList();
});
