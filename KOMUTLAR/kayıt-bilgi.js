const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**__ElecusBot Kayıt Bilgi Menüsü!__**`,
      `<a:796061900076875858:796061900076875858> \`e!kayıtayarla aç & kapat #KANAL @ROL\`\n <a:796061900076875858:796061900076875858> \`e!kayıtol [İSİM] (YAŞ)\`\n <a:796061900076875858:796061900076875858> \`İlk Öncelikle e!kayıtayarla Ayarlıyoruz Sonra e!kayıtol [İSİM] (YAŞ)\``
    )
.setDescription("<a:795770160136716302:795770160136716302> [Botun Davet Linki](https://discord.com/api/oauth2/authorize?client_id=795050785532411914&permissions=8&scope=bot) | [Destek Sunucusu](https://discord.gg/3VyJMWrh3K) ")
    .setColor("DARK BLUE")
  .setFooter(`${message.author.tag} Tarafından İstendi`, message.author.avatarURL)
  .setTimestamp()
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıtbilgi","kayıtbil","kayıt-bilgi","kayıtcı"],
  permLevel: 0
};

exports.help = {
  name: "kayıtbilgi"
};
