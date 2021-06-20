import { Message, MessageEmbed } from 'discord.js';
import search from 'yt-search';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando 8ball', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Retorna uma resposta da toda poderosa bola 8')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}8ball <pergunta>\` - Entrega uma resposta da bola 8 baseada na pergunta que foi feita.` },
    { name: 'Parâmetros', value: `\`pergunta\` - A pergunta a ser respondida.` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

  const playSong = (message: Message, args: Array<string>, queues: Map<String, Array<any>>, song: any) => {
    if (!song) {
      console.log('Musica nao existe');
      
    }
  }

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'play',
  args: true,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Escolhe uma música para tocar com base na url ou no nome da musica.',
	async execute(message: Message, args: Array<string>, queues: Map<String, Array<any>>) {
      const musicName = args.join(' ')


      try {
        search(musicName, (err, result) => {
          if (err) {
            throw err
          }
          else {
            if (result && result.all.length > 0) {
              const song = result.all[0]
              console.log(song)
            }

          }
        })        
      } catch (error) {
        console.log(error);
      }
    },
};