/* clientAppID -- the client ID that Discord generates when creating an app
* For more info, visit https://discordapp.com/developers/applications/
*/
let clientAppID = process.argv[2];

// If clientAppID was not set exit
if (typeof (clientAppID) === typeof (undefined)) {
  // console.log('Error: No Client/Application ID was set.');
  process.exit(126);
}

if (typeof (clientAppID) === 'number') {
  clientAppID = clientAppID.toString();
}

// Configures the user status with information passed in from the user
const client = require('discord-rich-presence')(clientAppID);

client.updatePresence({
  details: 'Super Smash Bros. Ultimate',
  largeImageKey: 'smashultimate',
  largeImageText: '大乱闘スマッシュブラザーズ SPECIAL',
});
