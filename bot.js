const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const ayarlar = require("./ayarlar.json");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

//READY.JS

const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

  client.user.setActivity(`e!yardım 🔥 Kullanıcı 🔥 Koruma 🔥 Moderasyon 🔥 Chat 🔥 Eğlence 🔥 `, { type: "PLAYING" });

  console.log("Botun Komutlarını Yenilemeye Geldim!");
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.login(process.env.token);

//-----------------------KOMUTLAR-----------------------\\

//ANTİ RAİD

client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var darknesyt = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let darknesguardv2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız ** e!bot-izni kaldır <BOT ID>**.`
        );
      darknesyt.send(darknesguardv2);
    } else {
      let izinverilmemişbot = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız " +
            " e!bot-izni ver <BOT ID>"
        );
      member.ban(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      darknesyt.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SON

//CAPS ENGEL

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`${msg.member}, Capslock Kapat Lütfen!`)
              .then(nordx => nordx.delete({ timeout: 5000 }));
          }
        }
      }
    }
  }
});

//CAPS ENGEL SON

//OTO ROL

client.on("guildMemberAdd", member => {
  let kanal = db.fetch(`otorolk_${member.guild.id}`);
  let rol = db.fetch(`otorol_${member.guild.id}`);
  if (!rol) return;
  member.roles.add(rol);

  const help = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(
      `<a:795995745186349066:795995745186349066> \`${member.user.tag}\` **İsimli Üye Sunucuya Giriş Yaptı!** **Otomatik Olarak** <@&${rol}> **Rolünü Aldı!**`
    );
  member.guild.channels.cache.get(kanal).send(help);
});

//OTO ROL

//-----------------------KOMUTLAR-----------------------\\

//KAYIT

client.on("ready", () => {
  setInterval(function() {
    let knl = client.channels.cache.get("776728215480696852");
    if (knl) {
      knl.send(
        "**Kayıt olmak için** ``e!kayıtol <isim> <yaş> `` **şeklinde doldurunuz.**"
      );
    }
  }, 1800000); //1000 = 1 Saniye 1800000
});
//KAYIT

//SA-AS

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);

  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply(
        "**Aleyküm Selam, Hoşgeldin** <a:796324937375809557:796324937375809557>"
      );
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);

  if (i === "açık") {
    if (msg.content.toLowerCase() === "s.a") {
      msg.reply(
        "**Aleyküm Selam, Hoşgeldin** <a:796324937375809557:796324937375809557>"
      );
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);

  if (i === "açık") {
    if (msg.content.toLowerCase() === "Sa") {
      msg.reply(
        "**Aleyküm Selam, Hoşgeldin** <a:796324937375809557:796324937375809557>"
      );
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);

  if (i === "açık") {
    if (msg.content.toLowerCase() === "selam") {
      msg.reply(
        "**Aleyküm Selam, Hoşgeldin** <a:796324937375809557:796324937375809557>"
      );
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);

  if (i === "açık") {
    if (msg.content.toLowerCase() === "Selam") {
      msg.reply(
        "**Aleyküm Selam, Hoşgeldin** <a:796324937375809557:796324937375809557>"
      );
    }
  }
});

//SA-AS

//AFK

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});


//AFK

//SAYAC

client.on("guildMemberAdd", async member => {
  let sayac = db.fetch(`sayac_${member.guild.id}`);
  let sayacK = db.fetch(`sayacChannel_${member.guild.id}`);
  if (!sayac) return;
  if (!sayacK) return;
  member.guild.channels.cache
    .get(sayacK)
    .send(
      `<a:796020184774082580:796020184774082580> \`${
        member.user.tag
      }\` **Sunucuya Katıldı!** **${sayac}** **kişi olmamıza** **${sayac -
        member.guild.members.cache.size}** **kişi kaldı!**`
    );
});
client.on("guildMemberRemove", async member => {
  let sayac = db.fetch(`sayac_${member.guild.id}`);
  let sayacK = db.fetch(`sayacChannel_${member.guild.id}`);
  if (!sayac) return;
  if (!sayacK) return;
  member.guild.channels.cache
    .get(sayacK)
    .send(
      `<a:796020184635670528:796020184635670528> \`${
        member.user.tag
      }\` **Sunucudan Ayrıldı!** **${sayac}** **kişi olmamıza** **${sayac -
        member.guild.members.cache.size}** **kişi kaldı!**`
    );
});

//SAYAC

//EĞLENCE

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if (message.author.id === message.guild.ownerID) permlvl = 6;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 7;
  return permlvl;
};

//EĞLENCE

//KANAL & ROL KORUMA

client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//KANAL & ROL & EMOJİ KORUMA SON

//KÜFÜR ENGEL

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply(
              "**Bu Sunucuda Küfür Yasak!** <a:795770222425407548:795770222425407548>"
            )
            .then(nordx => nordx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply(
              "**Bu Sunucuda Küfür Yasak Bidaha Tekrarlama!** <a:795770222425407548:795770222425407548>"
            )
            .then(nordx => nordx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//KÜFÜR ENGEL SON

//REKLAM ENGEL

client.on("message", msg => {
  const veri = db.fetch(`${msg.guild.id}.reklam`);
  if (veri) {
    const reklam = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "discord.gg",
      "youtube.com"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();
          return msg
            .reply(
              "**Bu Sunucuda Reklam Paylaşmak Yasak!** <a:795770228533493830:795770228533493830>"
            )
            .then(nordx => nordx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!veri) return;
});

//REKLAM ENGEL SON

//EVERYONE-HERE ENGEL

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.delete();
        return msg
          .reply(
            "Bu Sunucuda `@everyone @here`Atmak Yasak Sadece Sunucu Sahibi Ata Bilir! <a:795770184669331456:795770184669331456>"
          )
          .then(nordx => nordx.delete({ timeout: 5000 }));
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//EVERYONE-HERE ENGEL SON

//KorumaLog

client.on("channelCreate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`nordxmodlog${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal oluşturuldu`,
      `Kanal İsmi: \`${channel.name}\`\n Kanal Türü: **${channel.type}**\nKanal ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`nordxmodlog${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.MessageEmbed()
    .addField(
      `Kanal silindi`,
      `Silinen Kanal İsmi: \`${channel.name}\`\nSilinen Kanal Türü: **${channel.type}**\nSilinen Kanal ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`nordxmodlog${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\nKanal ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`nordxmodlog${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n Gif?: **${emoji.animated}**\nEmoji ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`nordxmodlog${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n Gif? : **${emoji.animated}**\nSilinen Emoji ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`nordxmodlog${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nEmoji ID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`nordxmodlog${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `Silen Kişi: ${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL()
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Silindiği Kanal: ${message.channel.name}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.cache.get(
    db.fetch(`nordxmodlog${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async role => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`nordxmodlog${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Rol oluşturuldu`,
      `Rol ismi: \`${role.name}\`\nRol ID: ${role.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async role => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`nordxmodlog${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Rol silindi`,
      `Silinen Rol ismi: \`${role.name}\`\nSilinen Rol ID: ${role.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`nordxmodlog${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.cache.get(db.fetch(`nordxmodlog${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

//KorumaLog Son
