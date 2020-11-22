const Discord = require("discord.js");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Je Hebt Niet De Juiste Permissions.").then(msg => msg.delete(10000));


        let BotEmbed = new Discord.RichEmbed()
            BotEmbed.setColor(botconfig["bot_setup"].main_embed_color)
            BotEmbed.setAuthor("Utility Module", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
	    BotEmbed.setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            BotEmbed.addField("**Ping:**", "**-ping**", true)
	    BotEmbed.addField("**Poll:**", "**-poll**", true)
            BotEmbed.addField("**Timer:**", "**-timer**", true)
	    BotEmbed.addField("**Uptime:**", "**-uptime**", true)

            BotEmbed.addBlankField(true)

            if(message.author.avatarURL) {
                BotEmbed.setFooter("Meto", "https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
            }
        message.channel.send(BotEmbed)
}

module.exports.help = {
    name: "utility"
}