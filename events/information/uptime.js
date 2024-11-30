const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'uptime',
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        const duration1 = Math.round(
            (Date.now() - message.client.uptime) / 1000
        )
        const embed = new MessageEmbed()
        embed.setColor(0xf7ff00)
        embed.setDescription(`I am online from <t:${duration1}:R>`)
        message.channel.send({ embeds: [embed] })
    }
}
