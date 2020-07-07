import { Message } from 'discord.js';

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'ping',
  args: false,
  usage: '',
  guildOnly: false,
	description: 'Ping!',
	execute(message: Message, args: Array<string>) {
		message.channel.send(':ping_pong: Pong.');
	},
};