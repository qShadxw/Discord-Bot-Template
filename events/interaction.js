// Imports
const { Events } = require('discord.js');
const Logger = require("../utils/logger.js")

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	/**
	 * Executes when an interaction is created.
	 * @param interaction
	 */
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			Logger.log('Interaction', `Command ${interaction.commandName} does not exist.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			Logger.log('Interaction', `Failed to execute command ${interaction.commandName}. ${error}`);
			await interaction.reply(`[Interaction] Failed to execute command ${interaction.commandName}.`);
		}
	}
}