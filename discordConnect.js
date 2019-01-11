/** For info on creating application IDs, visit
* https://discordapp.com/developers/applications/
*/

function adjustAppID(appID) {
  let clientAppID = appID;
  // Convert a raw number into a string, if necessary
  if (typeof (clientAppID) === 'number') {
    clientAppID = clientAppID.toString();
  }

  return (clientAppID);
}

/* eslint-disable */
// An object that holds clientAppID, details, and largeImageKey
const appPresence = {
  'clientAppID': adjustAppID(process.argv[2]),
  'details': process.argv[3],
  'largeImageKey': process.argv[4]
};
/* eslint-enable */

// Configures the user status with information passed in from the user
const client = require('discord-rich-presence')(appPresence.clientAppID);

function updatePresence() {
  client.updatePresence({
    details: appPresence.details,
    largeImageKey: appPresence.largeImageKey,
  });
}

updatePresence();

/* Process Functions */
// Uncaught Rejection, in case of Discord Timeouts
process.on('unhandledRejection', (reason) => {
  console.log(appPresence);
  console.log(reason.stack || reason);
});
