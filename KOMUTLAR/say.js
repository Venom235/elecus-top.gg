const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 let güvenlik = message.guild.verificationLevel
  if(güvenlik === "NONE") güvenlik = "Yok"
    if(güvenlik === "LOW") güvenlik = "Düşük"
      if(güvenlik === "MEDIUM") güvenlik = "Orta"
   if(güvenlik === "HIGH") güvenlik = "Yüksek"
     if(güvenlik === "VERY_HIGH") güvenlik = " En Yüksek"
     const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
  let guild = message.guild;
     let botlar = message.guild.members.cache.filter(m => m.user.bot).size;
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let  çevrimiçi = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size
    const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
    
        .addField(`<a:796288666732593173:796288666732593173> **Sunucudaki Toplam Üye Sayısı**`,`**\`${message.guild.memberCount}\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Seslideki Üye Sayısı**`,`**\`${count}\`**`)
    
      .addField(`<a:796288666732593173:796288666732593173> **Güvenlik Seviyesi**`,`**\`${güvenlik}\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Yazı Kanalları**`, ` **\`${textChannels}\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Ses Kanalları**`, ` **\`${voiceChannels.size}\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Roller**`,` **\`${message.guild.roles.cache.size}\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Emojiler**`,` **\`${message.guild.emojis.cache.size}\`**`)
    
       .addField(`<a:796288666732593173:796288666732593173> **Boost Seviyesi**`,` **\`${message.guild.premiumTier}/3\`**`)
    
        .addField(`<a:796288666732593173:796288666732593173> **Boost Sayısı**`,` **\`${message.guild.premiumSubscriptionCount}\`**`)
   
    message.channel.send(embed);

} 


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
}