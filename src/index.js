const Discord = require('discord.js');
const config = require('../config.json');

const Client = new Discord.Client();

Client.on('ready', () => {
  console.log(`Logged in as ${Client.user.tag}!`);
});

Client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});



Client.login(config.token)
  .then(() => console.log('Bot Logado'))
  .catch(err => console.log(err))