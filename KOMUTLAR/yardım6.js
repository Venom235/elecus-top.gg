const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Koruma Menüsü!**`,
      `:man_police_officer: » **__Kanal Koruma__** \n \`e!kanalkoruma aç & kapat\`\n :man_police_officer: » **__Rol Koruma__** \n \`e!rolkoruma aç & kapat\`\n:man_police_officer: » **__Antiraid Koruma__**\n \`e!antiraid aç & kapat\`\n :man_police_officer: » **__Emoji Koruma__**\n \`e!emojikoruma aç & kapat\`\n :man_police_officer: » **__Koruma Log__**\n \`e!korumalog #kanal\`\n :man_police_officer: » **__Küfür Engel__**\n \`e!küfürengel aç & kapat\`\n :man_police_officer: » **__Reklam Engel__**\n \`e!reklamengel aç & kapat\`\n :man_police_officer: » **__Caps Engel__**\n \`e!capsengel aç & kapat\`\n :man_police_officer: » **__Ever Engel__**\n \`e!everengel aç & kapat\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["koruma","guard","yardım6","y-k"],
  permLevel: 0
};

exports.help = {
  name: "koruma"
};
