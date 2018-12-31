/** index.js
 * Functions used to by the client-side window.
 * Includes functions used by both electron and HTML.
*/

/* eslint-disable */

// IPC
const { ipcRenderer } = require('electron');

const updateStatus = document.getElementById('updateStatus');
updateStatus.addEventListener('click', () => {
  ipcRenderer.send('updateStat', '525817582431764495');
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

// Sets the text of the dropdown menu to what the user selected
function setTitle(title) {
  const titleName = document.getElementById('titleName');
  titleName.innerHTML = title;
  titleName.value = title;
}

// Restores the initial values on the form
function resetValues() {
  document.getElementById('titleName').innerHTML = 'Choose your title';
}
