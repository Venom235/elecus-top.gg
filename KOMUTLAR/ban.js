const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`<a:795770153237217300:795770153237217300> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor('RANDOM')
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('Uyarı', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let dızcılaraselam = message.mentions.users.first();

  if (message.mentions.users.size < 1) return message.channel.send(`**Lütfen sunucudan yasaklamak istediğin kişiyi etiketleyin.**`).catch(console.error);

  if (!message.guild.member(dızcılaraselam).bannable) return message.channel.send(`<a:795770153237217300:795770153237217300> **Belirttiğiniz kişinin Yetkisi Benden Daha Üstün!**`);
  message.guild.member(dızcılaraselam).ban();

  message.channel.send(" Başarılı, `" + dızcılaraselam + "` İD'li kullanıcı sunucudan yasaklandı.")
     
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 0,
    kategori: "moderasyon",
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban <@kullanıcı> <sebep>',
 
};