const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
this.config = require(`${process.cwd()}/config.json`)
module.exports = {
    name: 'eval',
    aliases: ['ev', 'jaduexe'],
    category: 'owner',
    run: async (client, message, args) => {
        if (!this.config.owner.includes(message.author.id)) return
        const content = message.content.split(' ').slice(1).join(' ')
        const result = new Promise((resolve) => resolve(eval(content)))

        return result
            .then((output) => {
                if (typeof output !== 'string') {
                    output = require('util').inspect(output, { depth: 0 })
                }
                output = output
                    .replaceAll(client.token, 'T0KEN')
                    .replaceAll(client.config.MONGO_DB, 'T0KEN')
                const user = new MessageEmbed()
                    .setColor(0xf7ff00)
                    .setDescription(`\`\`\`js\n${output}\`\`\``)
                message.channel.send({ embeds: [user] })
            })
            .catch((err) => {
                err = err.toString()
                err = err.replaceAll(client.token, 'T0KEN')
                err = err.replaceAll(client.config.MONGO_DB, 'T0KEN')
                message.channel.send(err, {
                    code: 'js'
                })
            })
    }
}
