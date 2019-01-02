/** For info on creating application IDs, visit
* https://discordapp.com/developers/applications/
*/

const { ipcRenderer } = require('electron');

// Holds an appID
let clientAppID = process.argv[2];

// If clientAppID was not set exit
if (typeof (clientAppID) === typeof (undefined)) {
  process.exit(126);
}

// Convert a raw number into a string, if necessary
if (typeof (clientAppID) === 'number') {
  clientAppID = clientAppID.toString();
}

// Configures the user status with information passed in from the user
const client = require('discord-rich-presence')(clientAppID);

function updatePresence(appPresence) {
  client.updatePresence({
    details: appPresence.details,
    largeImageKey: appPresence.largeImageKey,
  });
}

const appPresence = JSON.parse('{"details":"Smash (Online)","largeImageKey":"smashultimate"}');
updatePresence(appPresence);
