const Discord = require("discord.js")


exports.run = async (client, message, args) => {
  
  const fbi = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setImage("http://www.hareketligifler.net/data/media/114/polis-hareketli-resim-0023.gif")
  .setTitle("Polis Geliyor!!!")
  message.channel.send(fbi)
}


exports.conf = {
  enabled: true, 
  guildOnly: false, 
   aliases: ['ara155'],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: "ara155",
  description: "ara155 gif atar",
  usage:"ara155"
}