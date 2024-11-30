module.exports = async (client) => {
    client.on('ready', async () => {
        client.user.setPresence({
            activities: [
                {
                    name: `Under Development`
                }
            ],
            status: `dnd`
        })
        client.logger.log(`Logged in to ${client.user.tag}`, 'ready')
    })

}
