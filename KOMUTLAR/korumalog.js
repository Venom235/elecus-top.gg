const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`<a:795770153237217300:795770153237217300> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`nordxmodlog${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(new Discord.MessageEmbed().setDescription(`**KorumaLog Kanalı Zaten ayarlı değil**`).setColor("RANDOM"));
    
    db.delete(`nordxmodlog${message.guild.id}`)
   message.channel.send(new Discord.MessageEmbed().setDescription(`**KorumaLog Kanalı başarıyla sıfırlandı**`).setColor("RANDOM"));

    return
  }
  
if (!logk) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bir korumalog kanalı belirt**`).setColor("RANDOM"));
 

db.set(`nordxmodlog${message.guild.id}`, logk.id)

message.channel.send(new Discord.MessageEmbed().setDescription(`**Koruma-Log kanalı başarıyla** ${logk} **olarak ayarlandı**`).setColor("RANDOM"));

console.log(`Koruma-Log komutu ${message.author.username} Tarafından kullanıldı`)
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['koruma-log','korumalog'],
    permLevel: 0 ,
  kategori:'moderasyon'
};

exports.help = {
    name: 'koruma-log',
    description: 'Koruma-Log kanalını belirler.',
    usage: 'koruma-log <#kanal>'
};