// Imports
import { Client, Events } from 'discord.js';
import Logger from '../utils/logger';
import BotEvent from 'src/interfaces/botEvent';
import DeployCommands from '../utils/deployCommands';
import { rest } from '../index';

const readyEvent: BotEvent = {
	name: 'ready',
	once: true,
	async execute(client: Client) {
		// Logging when client is ready.
		if (client.user) Logger.log('Client', `Logged in as ${client.user.tag}!`);
		else Logger.log('Client', 'Not Logged in!');

		// Deploying Commands.
		(async () => {
			try {
				DeployCommands.deployCommands(rest);
			} catch (error) {
				console.error(error);
			}
		})();
	},
};

module.exports = readyEvent;