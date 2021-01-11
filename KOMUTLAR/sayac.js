const Discord = require(`discord.js`)
const db = require("quick.db")
exports.run = async(client, message, args)=> {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:795770153237217300:795770153237217300> Bu Komutu Kullana Bilmek İçin \`Rolleri Yönet\` Yetkisine Sahip Olmalısın!");
var sayi = args[0]
var sayackanal = message.mentions.channels.first();
if(sayi === "sıfırla"){
     db.delete(`sayacChannel_${message.guild.id}`);
     db.delete(`sayac_${message.guild.id}`);
     message.channel.send("Başarıyla Sayaç Sistemi Sıfırlandı!")
} else{
if(!sayi)return message.channel.send("**Bir Sayı Belirtmelisin! Kullanım :** `e!sayaç <SAYI> #KANAL`")
if(!sayackanal)return message.channel.send("**Bir Kanal Etiketlemelisin! Kullanım :** `e!sayaç <SAYI> #KANAL`")
   db.set(`sayacChannel_${message.guild.id}`, sayackanal.id);
   db.set(`sayac_${message.guild.id}`, sayi);
message.channel.send("Başarıyla Sayaç Sistemi Ayarlandı!")
}; };

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
}

exports.help = {
name: 'sayaç',
description: 'sayaç',
usage: '𝕍𝕖𝕟𝕠𝕞#9999 İle Deneyler'
}