const codework1 = require('discord.js')

exports.run = function(client, message, args) {
  const codework = new codework1.MessageEmbed() 
                            
.setDescription("<a:elecus_baglatilar:797028053414576128> **ElecusBOT Bağlantılar** <a:elecus_baglatilar:797028053414576128> \n\n [Botu Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=795050785532411914&permissions=8&scope=bot) \n [Botun Destek Sunucusu](https://discord.gg/3VyJMWrh3K)")
.setColor("BLACK")

return message.channel.send(codework)
}

exports.conf = {
enabled: false,
guildOnly: false,
aliases: ["invite"],
permLevel: 0
  
};
  
exports.help = {
name: 'davet'
};