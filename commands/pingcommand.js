/*
	Ping Command.
	Simple command that replies with Pong!
	To test if the bot is working.
 */
// Imports.
const { SlashCommandBuilder } = require('discord.js');

// Exports Ping Command. { data, execute }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		// Reply with Pong!
		await interaction.reply('Pong!');
	}
}