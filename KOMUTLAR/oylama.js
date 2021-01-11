const Discord = require("discord.js");
exports.run = (client, message, args) => {
  message.delete();
  let question = args.join(" ");
  let user = message.author.username;
  if (!question)
    return message.channel
      .send(
        new Discord.MessageEmbed().addField(`<a:795770184669331456:795770184669331456> **Yazı Yazman Gerek** <a:795770184669331456:795770184669331456>`)
      )
      .then(m => m.delete(5000));
  console.log(
    "Oylama komutu " +
      message.author.username +
      "#" +
      message.author.discriminator +
      " Tarafından kullanıldı."
  );
  message.channel
    .send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter("Oylama Sistemi", client.user.avatarURL())
        .addField(`**Oylama**`, `**${question}**`)
    )
    .then(function(message) {
      message.react("795770170445398046");
      message.react("795770153237217300");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oylama"],
  permLevel: 2
};
exports.help = {
  name: "oylama",
  description: "Oylama yapmanızı sağlar.",
  usage: "oylama <oylamaismi>"
};