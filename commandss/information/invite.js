const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

// Command
module.exports = {
    name: 'invite',
    aliases: ['inv', 'i'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Click to invite')
                .setStyle('LINK')
                .setURL(
                    `https://discord.com/oauth2/authorize?client_id=1168527223414865920&permissions=8&integration_type=0&scope=bot`
                )
        )

        // Sending
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(0xf7ff00)
                    .setDescription(
                        `Invite Me On Your Server..!!!`
                    )
            ],
            components: [button]
        })
    }
}
