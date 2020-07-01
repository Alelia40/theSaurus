require('dotenv').config();
const Discord = require('discord.js');
const processMessage = require('./processing.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN; //discord bot token


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  processMessage(msg);
});
