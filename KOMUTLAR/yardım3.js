const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Moderasyon Menüsü!**`,
      `:trident: » **__Ban__** \n \`e!ban [ETİKET] (SEBEB)\`\n :trident: » **__Un Ban__** \n \`e!unban [ID] (SEBEB)\`\n:trident: » **__Kick__**\n \`e!kick [ETİKET] (SEBEB)\`\n :trident: » **__İsim Değistir__**\n \`e!isimdeğiştir [ETİKET] (İsim Yaş)\`\n :trident: » **__Rol Ver__**\n \`e!rol-ver [ETİKET] @ROL\`\n :trident: » **__Rol Al__**\n \`e!rol-al [ETİKET] @ROL\`\n:trident: » **__Çek__**\n \`e!çek [ETİKET]\`\n :trident: » **__Git__**\n \`e!git [ETİKET]\`\n :trident: » **__Say__**\n \`e!say\`\n:trident: » **__Duyuru__**\n \`e!duyuru\`\n:trident: » **__Kayıt Bilgi__**\n \`e!kayıtbilgi\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["moderasyon","mod","yardım3","y-m"],
  permLevel: 0
};

exports.help = {
  name: "moderasyon"
};
