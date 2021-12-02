if (process.env.NODE_ENV === 'development') {
  require('dotenv-flow').config()
}

const tmi = require("tmi.js");
const leaderboardSvc = require("./leaderboard.service.js");

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!elo") {
    const stats = await leaderboardSvc();
    const prefixStreak = stats.streak > 0 ? "+" : "";
    client.say(target, `😉 [${stats.clan}] ${stats.name}`);
    client.say(target, `🎖️ Rank #${stats.rank}`);
    client.say(target, `🎮 ELO ${stats.rating}`);
    client.say(target, `📈 Racha de ${prefixStreak}${stats.streak}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
