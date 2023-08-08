// Imports
const fileSystem = require('node:fs');
const filePath = require('node:path');
const Logger = require("./logger.js")

module.exports = {
	/**
	 * Registers all the events in the events folder.
	 * @param client {Client}
	 */
	registerEvents: function(client) {
		// Gets all command files - Filters out non .js files.
		const eventsPath = filePath.join(__dirname, "..", "events");
		const eventFiles = fileSystem.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

		// Loads all the commands in the command's folder.
		for (const file of eventFiles) {
			const eventPath = filePath.join(eventsPath, file);
			const event = require(eventPath);

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			} else {
				client.on(event.name, (...args) => event.execute(...args, client));
			}

			// Logs that the command has been loaded.
			Logger.log('EventHandler', `Registered ${file}.`);
		}
	}
}
