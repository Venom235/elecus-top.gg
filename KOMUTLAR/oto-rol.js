const Discord = require(`discord.js`)
const db = require("quick.db")
exports.run = async(client, message, args)=> {
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<a:795770153237217300:795770153237217300> Bu Komutu Kullana Bilmek İçin \`Rolleri Yönet\` Yetkisine Sahip Olmalısın!");
var sifirla = args[0]
var rol = message.mentions.roles.first();
var rolkanal = message.mentions.channels.first();
if(sifirla === "sıfırla"){
     db.delete(`otorolk_${message.guild.id}`);
     db.delete(`otorol_${message.guild.id}`);
     message.channel.send("Başarıyla Otorol Sistemi Sıfırlandı!")
}else{
if(!rol)return message.channel.send("**Bir Rol Etiketlemelisin! Kullanım :** `e!otorol @ROL #KANAL`. Eğer Sistemi Sıfırlamak İstiyorsan e!otorol sıfırla")
if(!rolkanal)return message.channel.send("**Bir Kanal Etiketlemelisin! Kullanım :** `e!otorol @ROL #KANAL`. Eğer Sistemi Sıfırlamak İstiyorsan e!otorol sıfırla")
   db.set(`otorolk_${message.guild.id}`, rolkanal.id);
   db.set(`otorol_${message.guild.id}`, rol.id);
message.channel.send("Başarıyla Otorol Sistemi Ayarlandı!")
}; };

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
}

exports.help = {
name: 'otorol',
description: 'oto-rol Sistemini Aktif/Deaktif eder',
usage: '𝕍𝕖𝕟𝕠𝕞#9999 İle Deneyler'
}