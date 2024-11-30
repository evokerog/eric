const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix;

        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Select a category')
            .addOptions([
                {
                    label: 'Security',
                    value: 'Security',
                    emoji: '<:im_antinuke:1243834677031075901>',
                    description: 'Commands related to Security',
                },
                {
                    label: 'Moderation',
                    value: 'mod',
                    emoji: '<:im_mod:1243842655499325552>',
                    description: 'Commands related to Moderation',
                },
                {
                    label: 'Utility',
                    value: 'info',
                    emoji: '<:im_utility:1243834698451517471>',
                    description: 'Utility commands',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    emoji: '<:im_welcome:1243835932495315064>',
                    description: 'Commands for Welcomer',
                },
                {
                    label: 'Voice',
                    value: 'voice',
                    emoji: '<:im_voice:1243836895742660609>',
                    description: 'Commands related to Voice',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    emoji: '<:im_customrole:1243837699144679488>',
                    description: 'Commands for Custom Roles',
                 },
               ]);

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('Security')
                .setLabel('Security')
                .setStyle('SECONDARY')
                .setEmoji('1240985690339147901'),
            new MessageButton()
                .setCustomId('mod')
                .setLabel('Moderation')
                .setStyle('SECONDARY')
                .setEmoji('1240994456426254377'),
            new MessageButton()
                .setCustomId('info')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1241373208133898312'),
            new MessageButton()
                .setCustomId('welcomer')
                .setLabel('Welcomer')
                .setStyle('SECONDARY')
                .setEmoji('1240995596257722389'),
            new MessageButton()
                .setCustomId('voice')
                .setLabel('Voice')
                .setStyle('SECONDARY')
                .setEmoji('1241372478375465010'),            
            new MessageButton()
                .setCustomId('customrole')
                .setLabel('Custom Role')
                .setStyle('SECONDARY')
                .setEmoji('1241373717037056081'),
            );
        let user = await client.users.fetch(`1141693830844915742`)
        const embed = new MessageEmbed()
            .setColor(0xf7ff00)
            .setFooter({
                text: `Made By ${user.tag}`,
                iconURL: user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setImage('https://media.discordapp.net/attachments/1239420300215582790/1242531685736644638/standard.gif?ex=664e2d4f&is=664cdbcf&hm=c11f8af930eee572722d8beaf0a816017608c06a8b6e5131e8df8a0007edb144&=&width=1440&height=83')
            .setAuthor({
                name: 'Eric',
                iconURL: (client.user.displayAvatarURL())
            })
            .setThumbnail(client.user.displayAvatarURL({ dynamic : true}))
            .setDescription(
                `**<a:im_dot:1243847404227133510> Prefix for this server \`${prefix}\`\n<a:im_dot:1243847404227133510> Total Commands: \`${client.commands.size}\`\n<a:im_dot:1243847404227133510> Type \`${prefix}antinuke enable\` \nto get started up!**`
            )
            .addField(
                'Eric Modules',
                `
                <:im_antinuke:1243834677031075901> \`:\` **Security**\n<:im_mod:1243842655499325552> \`:\` **Moderation**\n<:im_utility:1243834698451517471> \`:\` **Utility**\n<:im_welcome:1243835932495315064> \`:\` **Welcomer**\n<:im_voice:1243836895742660609> \`:\` **Voice**\n<:im_customrole:1243837699144679488> \`:\` **Customrole**
\n<:im_link:1243857653109751930> \`:\`** [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/fhKwvngN7w)**
                `);

        const helpMessage = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents(selectMenu)] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user && (i.isButton() || i.isSelectMenu())
        });

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                const category = i.customId;
                let commands = [];
                switch (category) {
                    case 'Security':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'security')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'voice':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'voice')
                            .map((x) => `\`${x.name}\``);
                        break;
                     case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                   }
                const categoryEmbed = new MessageEmbed()
                    .setColor(0xf7ff00)
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setThumbnail(i.guild.iconURL({ dynamic: true }))
                    .setDescription(`**${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} Commands**\n${commands.join(', ')}`);
                i.reply({ embeds: [categoryEmbed], ephemeral: true });
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                if (category === 'all') {
                    commands = client.commands
                        .map((x) => `\`${x.name}\``);
                    const allCommandsEmbed = new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setDescription(`**All Commands**\n${commands.join(', ')}`);
                    helpMessage.edit({ embeds: [allCommandsEmbed], components: [] });
                } else {
                    switch (category) {
                        case 'Security':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'security')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'mod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'mod')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'info':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'info')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'welcomer':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'welcomer')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'voice':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'voice')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'customrole':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'customrole')
                                .map((x) => `\`${x.name}\``);
                            break;
                     }
                    const categoryEmbed = new MessageEmbed()
                        .setColor(0xf7ff00)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setThumbnail(i.guild.iconURL({ dynamic: true }))
                        .setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
                    i.reply({ embeds: [categoryEmbed], ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                helpMessage.edit({ components: [] });
            }
        });
    }
};
