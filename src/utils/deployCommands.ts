// Imports
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import Command from '../interfaces/Command';
import commandHandler from './commandHandler';
import * as fileSystem from 'fs';
import * as filePath from 'path';
import Logger from './logger';
import config from '../config';

export default {
	/**
	 * Creates a JSON representation of all registered Commands for global deployment.
	 * @returns {RESTPostAPIChatInputApplicationCommandsJSONBody[]} The JSON body for the deployment.
	 */
	getDeploymentJson: function () {
		// Creates new collection for commands.
		const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

		const commandList = commandHandler.getCommands();

		commandList.forEach((command, name) => {


			// Checks if the command has a valid structure.
			if (!command || !command.data || !command.execute) {
				console.log(command);
				Logger.log('DeploymentCommands', `${name} does not have a valid command structure.`);
				return;
			}
			// Adds the command to the collection.
			commands.push(command.data.toJSON());
		});

		return commands;
	},

	/**
	 * PUTs the global commands to Discord.
	 * @param rest The REST object to use for deployment.
	 */
	deployCommands: async function (rest: REST) {
		console.log('Started refreshing application (/) commands.');
		const data = await rest.put(
			Routes.applicationCommands(config.clientId),
			{ body: this.getDeploymentJson() },
		).then(() => {
			console.log('Successfully reloaded application (/) commands.');
			// Retrieve the list of global commands.
			const globalCommands = rest.get(
				Routes.applicationCommands(config.clientId),
			).then((commandsList) => {
				// Creates new collection for commands.
				const commands: Command[] = commandsList as Command[];
				console.log(`${commands.length} global commands registered.`);
			});
		});
	},
};