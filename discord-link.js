'use strict';

var clientAppID = process.argv[2];
console.log (clientAppID);
if (clientAppID === undefined){
    console.log("No Client/Application ID was set.");
    clientAppID = '00000000000';
}

//Discord Client
const client = require('discord-rich-presence')(clientAppID);
client.updatePresence({
    details: 'Super Smash Bros. Ultimate',
    largeImageKey: 'smashultimate',
    largeImageText: '大乱闘スマッシュブラザーズ SPECIAL',
});