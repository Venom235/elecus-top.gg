const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Yardım Menüsü!**`,
      `:cyclone: » **__Kullanıcı Komutları__** \n \`e!kullanıcı\`\n :man_police_officer: » **__Koruma Komutları__**\n \`e!koruma\`\n :trident: » **__Moderasyon Komutları__** \n \`e!moderasyon\`\n:thought_balloon: » **__Chat Komutları__**\n \`e!chat\`\n :tada: » **__Eğlence Komutları__**\n \`e!eğlence\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","help","yardım1","y-h"],
  permLevel: 0
};

exports.help = {
  name: "yardım"
};
