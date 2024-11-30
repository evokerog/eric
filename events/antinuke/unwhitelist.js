const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'unwhitelist',
    aliases: ['uwl'],
    
    category: 'security',
    premium: false,
    run: async (client, message, args) => {
        if (message.guild.memberCount < 1) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setDescription(
                            `${client.emoji.cross} | Your Server Doesn't Meet My 1 Member Criteria`
                        )
                ]
            })
        }
        let own = message.author.id == message.guild.ownerId
        const check = await client.util.isExtraOwner(
            message.author,
            message.guild
        )
        if (!own && !check) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setDescription(
                            `${client.emoji.cross} | Only the server owner or an extra owner with a higher role than mine is authorized to execute this command.`
                        )
                ]
            })
        }
        if (
            !own &&
            !(
                message?.guild.members.cache.get(client.user.id).roles.highest
                    .position <= message?.member?.roles?.highest.position
            )
        ) {
            const higherole = new MessageEmbed()
                .setColor(0xf7ff00)
                .setDescription(
                    `${client.emoji.cross} | Only the server owner or extra owner with a higher role than mine can execute this command.`
                )
            return message.channel.send({ embeds: [higherole] })
        }
        const user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])
        const uwl = new MessageEmbed()
            .setColor(0xf7ff00)
            .setTitle(`__**Unwhitelist Commands**__`)
            .setDescription(
                `**Removes user from whitelisted users which means that there will be proper actions taken on the members if they trigger the antinuke module.**`
            )
            .addFields([
                {
                    name: `__**Usage**__`,
                    value: `<<a:im_dot:1243847404227133510> \`${message.guild.prefix}unwhitelist @user/id\`\n<<a:im_dot:1243847404227133510> \`${message.guild.prefix}uwl @user\``
                }
            ])
        const antinuke = await client.db.get(`${message.guild.id}_antinuke`)
        if (!antinuke) {
            const dissable = new MessageEmbed().setColor(0xf7ff00)
                .setDescription(` ** ${message.guild.name} security settings Ohh NO! looks like your server doesn't enabled security

Current Status : <:false:1243839986420285503><:true:1243839935128014938> To enable use antinuke enable ** `)
            message.channel.send({ embeds: [dissable] })
        } else {
            await client.db
                .get(`${message.guild.id}_${user.id}_wl`)
                .then(async (data) => {
                    let has = client.db?.has(
                        `${message.guild.id}_${user.id}_wl`,
                        {
                            ban: false,
                            kick: false,
                            prune: false,
                            botadd: false,
                            serverup: false,
                            memup: false,
                            chcr: false,
                            chup: false,
                            chdl: false,
                            rlcr: false,
                            rldl: false,
                            rlup: false,
                            meneve: false,
                            mngweb: false,
                            mngstemo: false
                        }
                    )

                    if (!has) {
                        return message.channel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(0xf7ff00)
                                    .setDescription(
                                        `${client.emoji.cross} | <@${user.id}> is not a whitelisted member.`
                                    )
                            ]
                        })
                    } else {
                        if (!user) {
                            message.channel.send({ embeds: [uwl] })
                        } else {
                            let data2 = await client.db?.get(
                                `${message.guild.id}_${user.id}_wl`
                            )
                            if (!data2) {
                                message.channel.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor(0xf7ff00)
                                            .setDescription(
                                                `${client.emoji.cross} | <@${user.id}> is not a whitelisted member.`
                                            )
                                    ]
                                })
                            } else {
                                const userId = user.id
                                await client.db.pull(
                                    `${message.guild.id}_wl.whitelisted`,
                                    userId
                                )
                                await client.db?.delete(
                                    `${message.guild.id}_${user.id}_wl`
                                )
                                return message.channel.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor(0xf7ff00)
                                            .setDescription(
                                                `${client.emoji.tick} | Successfully removed <@${user.id}> from whitelisted user.`
                                            )
                                    ]
                                })
                            }
                        }
                    }
                })
        }
    }
}
