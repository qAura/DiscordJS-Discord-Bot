const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log("Bot Rewrite")
  console.log("Developed By Aura <3")
  console.log(`${bot.user.username} Is Online`)

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}help`){

  let helpEmbed = new Discord.RichEmbed()
   .setColor("#f700df")
   .setThumbnail(message.guild.iconURL)
   .setTitle("Help For Bot <3", message.guild.iconURL)
   .addField("**>Userinfo**", "**To Lazy To Fix You Fix It? <3**")
   .addField("**>Botinfo**", "**Replys With Bots Infomation**")
   .addField("**>Serverinfo**", "**Replys With Server Infomation**")
   .addField("**>Report**", "**Report A A User Example >Report @Hi Racism**")
   .addField("**>Purge**", "**Purges The Chat**")
   .addField("**>Say**", "**Talk In An Embed**")
   .addField("**>Kick**", "**Kicks A Mentoined User**")
   .addField("**>Ban**", "**Bans A Mentoined User**")
   .addField("**>Mute**", "**Mute Someone**")
   .addField("**>Setstream**", "**Set Bots Status**")
   .setTimestamp()
   .setFooter(`${message.guild.name}`, message.guild.iconURL)

   message.reply(helpEmbed);
 }

 if(cmd === `${prefix}botinfo`){
	 let bicon = bot.user.displayAvatarURL;
	 let botembed = new Discord.RichEmbed()
	 .setColor("#f700df")
	 .setDescription("**Bot Infomation**")
	 .setThumbnail(bicon)
	 .addField("**Bot Name**", bot.user.username)
	 .addField("**Joined At**", message.guild.joinedAt)
	 .addField("**Created On**", bot.user.createdAt);
	 
	 return message.reply(botembed);
    
}


    if(cmd === `${prefix}serverinfo`){
	let sicon = message.guild.iconURL;
	let sEmbed = new Discord.RichEmbed()
	.setDescription("**Server Infomation**")
	.setColor("#f700df")
	.setThumbnail(sicon)
	.addField("**Server Name**", message.guild.name)
	.addField("**Created On**", message.guild.createdAt)
	.addField("**You Joined**", message.guild.joinedAt)
	.addField("**Total Members**", message.guild.memberCount)
	.addField("**Server Owner**", `${message.guild.owner}`)
	
	 message.channel.send({ embed: sEmbed})


	
}

if(cmd === `${prefix}kick`){


    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("KICK_USERS")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**~Kick~**")
    .setColor("#F700df")
    .addField("**Kicked User**", `${kUser} with ID ${kUser.id}`)
    .addField("**Kicked By**", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("**Kicked In**", message.channel)
    .addField("**Time**", message.createdAt)
    .addField("**Reason**", kReason);

    let kickChannel = message.guild.channels.find(`name`, "log");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}report`){


    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#f700df")
    .addField("**Reported User**", `${rUser} with ID: ${rUser.id}`)
    .addField("**Reported By**", `${message.author} with ID: ${message.author.id}`)
    .addField("**Channel**", message.channel)
    .addField("**Time**", message.createdAt)
    .addField("**Reason**", rreason);

    let reportschannel = message.guild.channels.find(`name`, "⚡reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.reply("Successfully Reported The User The Staff Will Look At This Soon");

    return;
  }
  
    if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("BAN?_USERS")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("**Banned User**", `${bUser} with ID ${bUser.id}`)
    .addField("**Banned By**", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("**Banned In**", message.channel)
    .addField("**Time**", message.createdAt)
    .addField("**Reason**", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "log");
    if(!incidentchannel) return message.channel.send("Cant Find Logs Channel");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }
  
      if(cmd === `${prefix}purge`){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Purged ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

      if(cmd === `${prefix}mute`){
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));



}

      if(cmd === `${prefix}setstream`){
      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{});
      bot.user.setPresence({
        game: {
             name: (sayMessage),
             type: "STREAMING",
             url: "https://www.twitch.tv/qAura"
           }
     });
  }

      if(cmd === `${prefix}say`){
	  // Launchs The Command
      const sayMessage = args.join(" ");
	  // Grabs What They Say
      message.delete().catch(O_o=>{})
	  // Deletes The Message Sneaky Right?
      const botEmbed = new Discord.RichEmbed()
	  // Set And Embed For Sexyness
     .setTitle(sayMessage)
	 // Say The Message
     .setColor("#f700df")
	 // Set The Colour Of Them Embed In Hex

      message.reply(botEmbed);
	  // Reply With And Embed

    // I Wrote This Bit For A Reason As I Want You Guys To Expand This Bot So I Decided To Show How To Do Embeds Cause They Sexy (wise quote from aura)
    }




});

bot.login(botconfig.token);
