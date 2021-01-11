const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.MessageEmbed()
    .addField(
      `**Elecus Bot Kullanıcı Menüsü!**`,
      `:cyclone: » **__Üye Mejaz Sil__** \n \`e!sil-üye [ETİKET] (MİKTAR)\`\n :cyclone: » **__Mejaz Sil__** \n \`e!sil [MİKTAR]\`\n:cyclone: » **__Oto Rol__**\n \`e!otorol @ROL #KANAL\`\n :cyclone: » **__Sayaç Ayarla__**\n \`e!sayaç <SAYI> #KANAL\`\n :cyclone: » **__Oylama Yap__**\n \`e!oylama [OYLAMA MEJAZ]\`\n :cyclone: » **__Botun İstatistik__**\n \`e!istatistik\`\n :cyclone: » **__Botun Pingi__**\n \`e!ping \`\n :cyclone: » **__Botun Bağlantıları__**\n \`e!davet\``
    )
    .setColor("DARK BLUE")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kullanıcı","kullan","yardım2","y-k"],
  permLevel: 0
};

exports.help = {
  name: "kullanıcı"
};
