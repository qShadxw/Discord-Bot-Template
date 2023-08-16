// Imports.
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import CommandHandler from './utils/commandHandler';
import DeployCommands from './utils/deployCommands';
import Logger from './utils/logger';
import EventHandler from './utils/eventHandler';
import Config from './config';

// Logging that the client is starting.
Logger.log('Client', 'Starting...');


// Create a new instance of the Client class and register events and commands.
function createClient() {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
		],
	});

	EventHandler.registerEvents(client);
	CommandHandler.registerCommands(client);

	return client;
}

// REST.
const rest = new REST().setToken(Config.clientToken);

//export rest
export { rest };

// Create the client and log in.
const client = createClient();
client.login(Config.clientToken);