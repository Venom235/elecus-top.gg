const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("<a:795770153237217300:795770153237217300> Bu komutu kullanmak için `Yönetici` yetkisine sahip olmalısın.")
  if (db.has(`antiraidK_${message.guild.id}`) === false) {
    return message.channel.send(
      "**Anti-raid açılmamış. Açmak için** `e!anti-raid aç`"
    );
  }
  if (!args[1]) return message.reply("**Lütfen bir bot ID si girin**");
 
  if (isNaN(args[1])) {
    return message.reply("**Sadece ID**");
  }
  if (args[0] == "ver") {
    client.users.cache.get(args[0]);
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + "**ID li bota izin verildi**");
  }
  if (args[0] == "kaldır") {
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + "**ID li botun izni kaldırıldı**");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "bot-izni"
};