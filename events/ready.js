// Imports
const { Events } = require('discord.js');
const Logger = require("../utils/logger.js")

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		// Logging when client is ready.
		Logger.log('Client', `Logged in as ${client.user.tag}!`);
	}
}