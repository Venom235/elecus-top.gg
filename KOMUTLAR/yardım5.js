const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Eğlence Menüsü!**`,
      `:tada: » **__155 Ara__** \n \`e!ara155\`\n :tada: » **__Aşkını Ölç__** \n \`e!aşkölçer\`\n:tada: » **__Espiri__**\n \`e!espri\`\n :tada: » **__Fbi__**\n \`e!fbi\`\n :tada: » **__Ters Yaz__**\n \`e!tersyazı\`\n :tada: » **__Tokat At__**\n \`e!tokat\`\n :tada: » **__Aduket Çek__**\n \`e!aduketçek\`\n :tada: » **__Balık Tut__**\n \`e!balıktut\`\n :tada: » **__Beşlik__**\n \`e!beşlik\`\n :tada: » **__Kaç Cm?__**\n \`e!kaçcm\`\n :tada: » **__Kar Topu__**\n \`e!kartopu\`\n :tada: » **__Soygun Yap__**\n \`e!soygunyap\`\n :tada: » **__Atatürk__**\n \`e!atatürk\`\n :tada: » **__Bot Token__**\n \`e!token\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eğlence","eğlen","yardım5","y-e"],
  permLevel: 0
};

exports.help = {
  name: "eğlence"
};
