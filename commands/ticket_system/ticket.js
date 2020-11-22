// © 2019 Fraffel Media. MultiBot is created by FAXES (FAXES#8655). View the license!
const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    const channel = bot.channels.find('name', '🎫support');
if (message.channel != channel) return message.channel.send('Gebruik Deze Commando In Het ' + channel + ' Kanaal! ').then(msg => message.delete(2500));;
         
    if (!message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role)) return message.channel.send(`Rol kon niet worden gemaakt.`).then(msg => msg.delete(15000));
    
    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        moveTicket(c)
        let roleSupportRole = message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role);
        let roleEveryone = message.guild.roles.find(role => role.name === "@everyone");
        c.overwritePermissions(roleSupportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(roleEveryone, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.setTopic(`Ticket ID: ${message.author.id} | Gemaakt door: ${message.author.username}`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> Jouw ticket is gemaakt, <#${c.id}>.***`).then(msg => msg.delete(2500));
        const embed = new Discord.RichEmbed()
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setDescription(`**Hallo <@${message.author.id}>!**\n\nBedankt dat je contact hebt opgenomen met ons ondersteuningsteam! \n\n We nemen zo snel mogelijk contact met u op. \n Gebruik dit ticket om te sluiten \`-sluit\`.`)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Gemaakt door Meto`)
            .setThumbnail("https://media.discordapp.net/attachments/717466556006793248/717472044547178526/95fa68627efaf312326ac6ae601d5cb2.gif")
        c.send(embed)

        if(botconfig["ticket_system"].auto_reply) {
            if(!message.guild.channels.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botconfig["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botconfig["channel_setup"].ticket_category);
    };
}

module.exports.help = {
    name: "new"
}
