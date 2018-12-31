'use strict';

/* clientAppID -- the client ID that Discord generates when creating an app
* For more info, visit https://discordapp.com/developers/applications/
*/
var clientAppID = process.argv[2];
console.log(typeof(clientAppID));

//If clientAppID was not set, present an error, then exit
if (typeof(clientAppID) === undefined){
    console.log("Error: No Client/Application ID was set.");
    process.exit();
}
console.log("This hsouldn't apsoeifrjwe");
/*
//Converts the clientAppID into a string, if necessary
if (typeof(clientAppID) === 'number'){
    clientAppID = clientAppID.toString();
}

// Configures the user status with information passed in from the user
const client = require('discord-rich-presence')(clientAppID);
client.updatePresence({
    details: 'Super Smash Bros. Ultimate',
    largeImageKey: 'smashultimate',
    largeImageText: '大乱闘スマッシュブラザーズ SPECIAL',
});
*/