# Switch RP
## Introduction

Switch RP (Rich Presence) is an electron application for that allows users to update their game status via Discord's Rich Presence. This application was created because I wanted to share with other Discord users when I was playing on my Switch, but wanted an easier way to update my status apart from going into the settings every time.

![Switch RP main screen](./docs/readme/img/mainScreen.PNG)

_Image of the main screen as of v0.6.0_

## Prerequisites
This application requires the desktop version of Discord. If you don't already have it installed, you can download a fresh copy from [Discord](https://discordapp.com/download).

## Installation
### Installing from Source
#### Prerequisites
If running the program from source, you must have [Node.js](https://nodejs.org/) installed on your computer before continuing with this guide.

#### Downloading Node Packages
Direct a terminal to the downloaded/cloned directory where `package.json` is located. Install the following dependencies by typing `npm install` into a terminal:
* [`discord-rich-presence`](https://www.npmjs.com/package/discord-rich-presence)

Note: When installing the required packages, you may receive `WARN` messages from npm asking you to install peer dependencies. This application does not make use of those dependencies, and can be safely ignored.

#### Running the Application
After installing the required packages, type `npm start` into a terminal to start the program.

## Development Information
As of v0.7.1, this application used the following packages:
* `Node.js v11.2.0`
* `npm v6.4.1`
* `electron: 4.0.1`
* `discord-rich-presence: 0.0.7`

## Limitations
### Application
This app doesn't allow users to create their own entries from within the application. In the meantime, users who have created a custom Discord Application ID may add their entry to the JSON.

### Discord
A limitation from Discord only allows users to update their status once every 15 seconds. Your status may not be displayed immediately after pressing the "Update Status" button.
