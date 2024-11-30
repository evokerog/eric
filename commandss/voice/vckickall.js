const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vckickall',
    category: 'voice',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MOVE_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(0xf7ff00)
                .setDescription(
                    `You must have \`Move members\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!message.guild.me.permissions.has('MOVE_MEMBERS')) {
            const error = new MessageEmbed()
                .setColor(0xf7ff00)
                .setDescription(
                    `I must have \`Move members\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!message.member.voice.channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setDescription(
                            `You must be connected to a voice channel first.`
                        )
                ]
            });
        }
        let own = message.author.id == message.guild.ownerId
        if (
            !own &&
            message.member.roles.highest.position <=
                message.guild.me.roles.highest.position
        ) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(0xf7ff00)
                        .setDescription(
                            `${client.emoji.cross} | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        try {
            let i = 0;
            message.member.voice.channel.members.forEach(async (member) => {
                i++;
                await member.voice.disconnect(`${message.author.tag} | ${message.author.id}`);
                await client.util.sleep(1000); 
            });
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setDescription(
                            `${client.emoji.tick} | Successfully Disconnected ${i} Members from ${message.member.voice.channel}!`
                        )
                ]
            });
        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setDescription(
                            `I don't have the required permissions to disconnect members.`
                        )
                ]
            });
        }
    }
};
