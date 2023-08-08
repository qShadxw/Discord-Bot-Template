// Imports.
const { SlashCommandBuilder } = require('discord.js');

// Exports Ping Command. { data, execute }
module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test Command!'),
	async execute(interaction) {
		// Reply with Pong!
		await interaction.reply('Boo!');
	}
}