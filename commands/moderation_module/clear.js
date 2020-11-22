const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Je hebt geen rechten om deze chat te clearen.").then(msg => msg.delete(10000));
    if(!args[0]) return message.channel.send("Use a number. Eg `clear 5`.").then(msg => msg.delete(5000));
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(1000));
    });
}

module.exports.help = {
    name: "clear",
    name2: "purge"
}