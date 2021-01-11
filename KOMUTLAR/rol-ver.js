const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('<a:795770153237217300:795770153237217300> Bu komutu kullanabilmek için yetkin yok.');
  let guild = message.guild
  let rol = message.mentions.roles.first()  
  let user = message.mentions.members.first() 

  if (!user) return message.reply('**Kime Rol Verceğimi Yazmadın!**').catch(console.error);
  if (rol.length < 1) return message.reply('**Rol idsini belirtmedin**');
user.roles.add(rol)
const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **kullanıcısına başarıyla** ${rol} **rolü verildi!**`)
        .setFooter('Elecus', client.user.avatarURL())
        .setColor(rol.hexColor)
        .setTimestamp()
    message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'rol-ver',
  description: 'İstediğiniz kişiyi istediğiniz rolü verir.',
  usage: 'rol-ver [kullanıcı] [@rol]'
};