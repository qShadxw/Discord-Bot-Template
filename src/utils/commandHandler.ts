import { Client } from "discord.js";
import  Command  from "src/interfaces/Command"
import logger from "./logger";
// Imports
const fileSystem = require('node:fs');
const filePath = require('node:path');



// Define the commands array
const commands: Map<string, Command> = new Map();


export default {

	/**
	 * Gets all the commands in the commands folder.
	 * @param client {Client}
	 */
	registerCommands: function(client: Client) {

		// Gets all command files - Filters out non .js files.
		const commandsPath = filePath.join(__dirname, "..", "commands");
		const commandFiles: string[] = fileSystem.readdirSync(commandsPath).filter((file: String) => file.endsWith(".js"));

		// Loads all the commands in the command's folder.
		for (const file of commandFiles) {
			const command = require(filePath.join(commandsPath, file));

			// Checks if the command has a valid structure.
			if (command["data"] === undefined && command["execute"] === undefined) {
				logger.log('CommandHandler', `${file} does not have a valid command structure.`);
				continue;
			}

			// Logs that the command has been loaded.
			logger.log('CommandHandler', `Loaded ${file}.`);

			// Adds the command to the collection.
			commands.set(command.data.name, command);
		}
	},

	getCommands: function() {
		return commands;
	}
}
