const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Chat Menüsü!**`,
      `:thought_balloon: » **__Sohbet Aç__** \n \`e!sohbet-aç\`\n :thought_balloon: » **__Sohbet Kapat__** \n \`e!sohbet-kapat\`\n:thought_balloon: » **__Sa-As Sistemi__**\n \`e!sa-as aç & kapat\`\n :thought_balloon: » **__Chat Süre__**\n \`e!yavaşmod [SÜRE]\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["chat","sohbet","yardım4","y-c"],
  permLevel: 0
};

exports.help = {
  name: "chat"
};
