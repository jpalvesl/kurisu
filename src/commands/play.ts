import { Message, MessageEmbed } from 'discord.js';
import search from 'yt-search';
import ytdl from 'ytdl-core-discord';

const helpEmbed = new MessageEmbed()
  .setAuthor('Ajuda do comando 8ball', 'https://cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png')
  .setThumbnail('https://cdn.discordapp.com/attachments/728421824521830452/730598731132436480/682055.png')
  .setDescription('Retorna uma resposta da toda poderosa bola 8')
  .addFields([
    { name: 'Modo de usar', value: `\`${process.env.PREFIX}8ball <pergunta>\` - Entrega uma resposta da bola 8 baseada na pergunta que foi feita.` },
    { name: 'Parâmetros', value: `\`pergunta\` - A pergunta a ser respondida.` }
  ])
  .setFooter('Não inclua <> ou [] no comando.')

  const playSong = async (message: Message, args: Array<string>, queues: Map<String, Array<any>>, song: any) => {
    let queue = queues.get(message.guild?.id)

    if (!song) {
      if (queue) {
        queue.connection.disconect()
        queues.delete(message.member?.guild.id)
      }
    }
    if (!message.member?.voice.channel) {
      return message.reply('Você precisa estar em um canal de voz para adicionar a música')
    }

    if (!queue) {
      const conn = await message.member.voice.channel.join()
      queue = {
        volume: 10,
        connection: conn,
        dispatcher: null,
        songs: [song]
      }
      queue.dispatcher = await queue.connection.play(await ytdl(song.url, {
        highWaterMark: 1 << 25
      }), {
        type: 'opus'
      })
      queue.dispatcher.on('finish', () => {
        queue.songs.shift()
        playSong(message, args, queues, queue.songs[0])
      })
      queues.set(message.member.guild.id, queue)
    }
    else {
      queue.songs.push(song)
      queues.set(message.member.guild.id)
    }


  }

module.exports = { // como está utilizando require para importar os comandos vou usar o module.exports nessa parte
  name: 'play',
  args: true,
  usage: helpEmbed,
  guildOnly: true,
	description: 'Escolhe uma música para tocar com base na url ou no nome da musica.',
  execute(message: Message, args: Array<string>, queues: Map<String, Array<any>>) {
      const musicName = args.join(' ')


      try {
        search(musicName, (err, result) => {
          if (err) {
            throw err
          }
          else if (result && result.all.length > 0) { 
              const song = result.all[0]
              playSong(message, args, queues, song)
          }
          else {
            return message.reply('Não conseguimos encontrar a música')
          }
        })        
      } catch (error) {
        console.log(error);
      }
    },
};