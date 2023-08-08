/*
	Test Command.
	This command will eventually spit out some information needing
	for testing. This will be used for testing purposes only.
 */
// Imports.
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test Command!'),
	async execute(interaction) {
		// Reply with Pong!
		await interaction.reply('Boo!');
	}
}