/** index.js
 * Functions used to by the client-side window.
 * Includes functions used by both electron and HTML.
*/

/* eslint-disable */

/* IPC */
const { ipcRenderer } = require('electron');

/* JSON containing game titles */
const gameList = require('./titles.json');

/* Add functionality to the 'Update Status' button */
const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  ipcRenderer.send('updateStat', document.getElementById('titleName').value);
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownDiv = document.createDocumentFragment();

  for (let x = 0; x < Object.keys(gameList).length; x++) {
    const gameItem = document.createElement('button');
    const listObj = Object.values(gameList)[x];

    gameItem.setAttribute('class', 'dropdown-item');
    gameItem.setAttribute('type', 'button');
    gameItem.setAttribute('onclick', `setTitle("${listObj.id}")`);
    gameItem.setAttribute('value', listObj.id);
    gameItem.innerHTML = listObj.longName;
    dropdownDiv.appendChild(gameItem);
  }

  document.getElementById('gameList').appendChild(dropdownDiv);
});

/* Toggles between light and dark themes */
function toggleScheme() {
  const core = document.getElementById('bodyMain');
  const color = document.getElementById('lightToggle');
  const button = document.getElementById('reset-btn');

  if (color.value == '0') {
      color.value = '1';
      color.innerHTML = '<i class="fas fa-lightbulb"></i>';
      core.classList.add('body-dark');
      core.classList.remove('body-light');
      button.classList.add('btn-outline-light');
      button.classList.remove('btn-outline-dark');
  } else {
      color.value = '0';
      color.innerHTML = '<i class="far fa-lightbulb"></i>';
      core.classList.add('body-light');
      core.classList.remove('body-dark');
      button.classList.add('btn-outline-dark');
      button.classList.remove('btn-outline-light');
  }
}

function readMail(){
  const mail = document.getElementById('noticesButton');
  const notice = document.getElementById('notices');

  switch (mail.value) {
    //Open unread message
    case('0'):
      mail.value = '1';
      mail.classList.add('btn-light');
      mail.classList.remove('btn-warning');
      mail.innerHTML = '<i class="fas fa-envelope-open-text"></i>';
      notice.setAttribute ('style', 'display:block');
      break;
    //Close read message
    case('1'):
      mail.value = '2';
      mail.innerHTML = '<i class="fas fa-envelope"></i>';
      notice.setAttribute ('style', 'display:none');
      break;
    //Open read message
    default:
      mail.value = '1';
      mail.innerHTML = '<i class="fas fa-envelope-open-text"></i>';
      notice.setAttribute ('style', 'display:block');
  }
}

// Sets the text of the dropdown menu to what the user selected
function setTitle(id) {
  const titleName = document.getElementById('titleName');
  const listObj = Object.values(gameList)[id];
  document.getElementById('gameName').value = listObj.longName;
  document.getElementById('gameID').value = listObj.clientAppID;
  titleName.value = listObj.clientAppID;
  titleName.innerHTML = '<i class="fas fa-check"></i>&nbsp;&nbsp;Game selected';
}

// Restores the initial values on the form
function resetValues() {
  document.getElementById('titleName').innerHTML = '<i class="fas fa-gamepad"></i>&nbsp;&nbsp;Select your game';
  document.getElementById('gameName').value = '';
  document.getElementById('gameID').value = '';
  document.getElementById('gameDetails').value = '';
}
