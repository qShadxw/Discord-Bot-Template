// Imports
import { Client, Events } from 'discord.js';
import Logger from '../utils/logger';
export default{
	name: () => {
		console.log(Events.ClientReady);

		return Events.ClientReady},
	once: true,
	async execute(client: Client) {
		// Logging when client is ready.
		if (client.user) Logger.log('Client', `Logged in as ${client.user.tag}!`);
		else Logger.log('Client', 'Not Logged in!');
	},
};