# SwitchRP
## Introduction

SwitchRP is an electron application for Nintendo Switch users on Discord that allows them to update their game status via Discord Rich Presence. This application was created because I wanted to share with other Discord users what I was playing on my Switch, but didn't want to go into my settings to say I was playing "Google Chrome" first.

## Current Limitations
### Application 
This app doesn't allow users to create their own entries from within the application. In the meantime, users who have created a custom Discord Application ID may add their entry to the JSON.

A limitation from Discord only allows users to update their status once every 15 seconds. Your status may not be displayed immediately after pressing the "Update Status" button.

## Installation
You will need to have `node` installed on your computer before continuing with this guide.

You will need to install the following dependencies by typing `npm install` into a terminal:
* [`discord.js`](https://www.npmjs.com/package/discord.js)
* [`discord-rpc`](https://www.npmjs.com/package/discord-rpc)
* [`discord-rich-presence`](https://www.npmjs.com/package/discord-rich-presence)

Note: When installing `discord.js` and `discord-rpc`, you may receive `WARN` messages from npm asking you to install several peer dependencies. These [dependencies](https://www.npmjs.com/package/discord.js#optional-packages) are for WebSockets and the voice support, which this application doesn't use. You can safely ignore them.

## Running the Application
If you have npm installed, type `npm start` into a terminal to start the program.

## Development Configuration
At the time of writing, this application used the following packages:
* `Node.js v11.2.0`
* `npm v6.4.1`
* `electron: 4.0.1`
* `discord.js: 11.4.2`
* `discord-rpc: 3.0.1`
* `discord-rich-presence: 0.0.7`