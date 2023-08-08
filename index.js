// Imports.
const { Client, REST, Routes, GatewayIntentBits } = require('discord.js');
const CommandHandler = require('./utils/commandhandler.js');
const EventHandler = require('./utils/eventhandler.js');
const DeployCommands = require('./utils/deploycommands.js');
const Logger = require('./utils/logger.js');

// Logging that the client is starting.
Logger.log('Client', 'Starting...');

// Environment Variables.
require('dotenv').config();

// Client.
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
});

// Client Events.
EventHandler.registerEvents(client);

// Registering Commands.
client.commands = CommandHandler.getCommands();

// REST.
const rest = new REST().setToken(process.env.CLIENT_TOKEN);

// Deploying Commands.
(async () => {
	try {
		Logger.log('REST', 'Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: DeployCommands.getDeployment() },
		);

		Logger.log('REST', 'Successfully reloaded application (/) commands.');
	} catch (error) {
		Logger.log('REST', error);
	}
})();

// Client Login.
client.login(process.env.CLIENT_TOKEN);
