const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!");

if (!args[0]) return message.channel.send('Sa-as sistemini açmak için; `e!sa-as aç & kapat`')

if (args[0] == 'aç') {
  
db.set(`saas_${message.guild.id}`, 'açık')
  
message.channel.send(`**<a:795770170445398046:795770170445398046> Sa-As Sistemi Başarıyla Açıldı** `)
}
  
if (args[0] == 'kapat') {
  
db.set(`saas_${message.guild.id}`, 'kapali')
  
message.channel.send(`**<a:795770170445398046:795770170445398046> Sa-As Sistemi Başarıyla Kapandı** `)
}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sa-as',
  description: 'Selamün aleyküm, Aleyküm selam',
  usage: 'sa-as'
};
