# SwitchRP
## Introduction

SwitchRP is an electron application for Nintendo Switch users on Discord that allows them to update their game status via Discord Rich Presence. This application was created because I wanted to share with other Discord users what I was playing on my Switch, but didn't want to go into my settings to say I was playing "Google Chrome" first.

## Installation
When you download the files from the repository, these packages are included:<br>
* `bootstrap: 4.0`
* `jquery: 3.2.1`
* `fontawesome: 5.0`

To minimize file size and to ensure that the latest versions of some packages are included, you will need to separately install the following packages using `npm`:
* `electron`
* `discord.js`
* `discord-rpc`
* `discord-rich-presence`

Note: When installing `discord.js`, you may receive `WARN` messages from npm asking you to install several peer dependencies. This application doesn't make use of those dependencies, and doesn't need to be installed.

## Running the Development Build
If you have npm installed, type `npm start` in a terminal to start the program.

## Tested Configuration
At the time of writing, I have developed and tested this program on the following configurations:
* `electron: 4.0.0`
* `discord.js: 11.4.2`
* `discord-rpc: 3.0.1`
* `discord-rich-presence: 0.0.7` 