const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'ralf_jr',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [
    'interpointstation'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!frames') {
    client.say(target, `https://interpoint-station.itch.io/intercorp`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!discord') {
    client.say(target, `https://discord.gg/pBvrH77D`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!patreon') {
    client.say(target, `https://www.patreon.com/interpoint`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!youtube') {
    client.say(target, `https://www.youtube.com/channel/UCV88ITZdBYnLpRGDFYXymKA/playlists`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!assets') {
    client.say(target, `https://interpoint-station.itch.io/lancer-rpg-pixel-art-maps-assets`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

