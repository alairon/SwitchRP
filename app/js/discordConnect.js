/** discordConnect.js
 * Functions used to update the user's status
 * For info on creating application IDs, visit
 * https://discordapp.com/developers/applications/
*/

// Converts a number type into a string, if necessary
function checkAppID(appID) {
  let clientAppID = appID;
  if (typeof (clientAppID) === 'number') {
    clientAppID = clientAppID.toString();
  }
  return (clientAppID);
}

// Checks if the details field was set
function checkDetails(details) {
  if (details.length === 0) {
    return (false);
  }
  return (true);
}

// An object that holds clientAppID, details, and largeImageKey
const appPresence = {
  clientAppID: checkAppID(process.argv[2]),
  details: process.argv[3],
  largeImageKey: process.argv[4],
};

// Configures the user status with information passed in from the user
const client = require('discord-rich-presence')(appPresence.clientAppID);

function updatePresenceInit() {
  if (!checkDetails(appPresence.details)) {
    // No details set
    client.updatePresence({
      largeImageKey: appPresence.largeImageKey,
    });
  } else {
    // Details is set
    client.updatePresence({
      details: appPresence.details,
      largeImageKey: appPresence.largeImageKey,
    });
  }
}

// Update presence
updatePresenceInit();

/* Process Functions */
// Uncaught Rejection, in case of Discord Timeouts
process.on('unhandledRejection', (reason) => {
  if (typeof (reason.context) !== typeof (undefined)) {
    console.log(`Error: ${reason.context.code}, ${reason.context.message}`);
  } else {
    console.log(reason);
  }
});
