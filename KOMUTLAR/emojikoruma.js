const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('<a:795770153237217300:795770153237217300> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')
let prefix = ayarlar.prefix

  if (!args[0]) {
 message.channel.send(`**Örnek Kullanım:** \`e!emoji-koruma aç/kapat\``)
  }
  if (args[0] === 'aç') {
    db.set(`emojik_${message.guild.id}`, "Aktif")
     message.channel.send(`**Emoji Koruma Başarıyla Açıldı!**`)
  }
   if (args[0] === 'kapat') {
    db.delete(`emojik_${message.guild.id}`)
    message.channel.send(`**Emoji Koruma Başarıyla Kapatıldı!**`)
  }
};
exports.conf = {
  aliases: ['emojikoruma'],
  permLevel: 0
};
exports.help = {
  name: 'emoji-koruma'
}; 
