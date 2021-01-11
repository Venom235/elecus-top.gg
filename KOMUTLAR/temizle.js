const Discord = require('discord.js');
const talkedRecently = new Set();
exports.run = function(client, message,  args) {
let codeworkprefix = args.slice(0).join('!');
if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`<a:795770153237217300:795770153237217300> Bu özelliği kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olmalısınız.`);
       if (talkedRecently.has(message.author.id)) {
           return message.channel.send(`${message.member}` + ", Bu Özelliği 120 Saniyede Bir Kullanabilirsin!");
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          talkedRecently.delete(message.author.id);
        }, 120000);
    }
if(!args[0]) return message.channel.send(`${message.member}` + ", Lütfen 1-100 Arası Sayı Girin!");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`${message.member}, ${args[0]} **Adet Mesaj Başarıyla Silindi!** <a:795770174267457537:795770174267457537>`).then(nordx => nordx.delete({timeout: 5000}))
  
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil'
};