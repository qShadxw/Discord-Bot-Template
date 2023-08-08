// Imports
const fileSystem = require('node:fs');
const filePath = require('node:path');
const { Collection } = require('discord.js');
const Logger = require("./logger.js")

module.exports = {
	/**
	 * Gets all the commands in the commands folder.
	 * @param client {Client}
	 */
	registerCommands: function(client) {
		// Creates new collection for commands.
		client.commands = new Collection();

		// Gets all command files - Filters out non .js files.
		const commandsPath = filePath.join(__dirname, "..", "commands");
		const commandFiles = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

		// Loads all the commands in the command's folder.
		for (const file of commandFiles) {
			const command = require(filePath.join(commandsPath, file));

			// Checks if the command has a valid structure.
			if (command["data"] === undefined && command["execute"] === undefined) {
				Logger.log('CommandHandler', `${file} does not have a valid command structure.`);
				continue;
			}

			// Logs that the command has been loaded.
			Logger.log('CommandHandler', `Loaded ${file}.`);

			// Adds the command to the collection.
			client.commands.set(command.data.name, command);
		}
	}
}
