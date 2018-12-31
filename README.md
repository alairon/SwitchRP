# SwitchRP
## Introduction

SwitchRP is an electron application for Nintendo Switch users on Discord that allows them to update their game status via Discord Rich Presence. This application was created because I wanted to share with other Discord users what I was playing on my Switch, but didn't want to go into my settings to say I was playing "Google Chrome" first.

## Current Limitations
### Application 
This app currently supports setting the status for Super Smash Bros. Ultimate without the ability to customize your status.
### Operating System
This app currently only works on Windows-based systems due to how Windows handles processes. Linux support will be added after the core features of the app are completed.

## Installation
You will need to have `node` installed on your computer before continuing with this guide.

When you download the files from the repository, these packages are included:
* `bootstrap: 4.0`
* `jquery: 3.2.1`
* `fontawesome: 5.0`

You will need to separately install the following packages by typing `npm install` into a terminal:
* [`electron`](https://www.npmjs.com/package/electron)
* [`discord.js`](https://www.npmjs.com/package/discord.js)
* [`discord-rpc`](https://www.npmjs.com/package/discord-rpc)
* [`discord-rich-presence`](https://www.npmjs.com/package/discord-rich-presence)

Note: When installing `discord.js` and `discord-rpc`, you may receive `WARN` messages from npm asking you to install several peer dependencies. These [dependencies](https://www.npmjs.com/package/discord.js#optional-packages) are for WebSockets and the voice support, which this application doesn't use. You can safely ignore them.

## Running the Application
If you have npm installed, type `npm start` into a terminal to start the program.

## Tested Configuration
At the time of writing, this application used the following configurations:
* `Node.js v11.2.0`
* `electron: 4.0.0`
* `discord.js: 11.4.2`
* `discord-rpc: 3.0.1`
* `discord-rich-presence: 0.0.7`