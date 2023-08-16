/*
	Ping Command.
	Simple command that replies with Pong!
	To test if the bot is working.
 */
// Imports.
import { SlashCommandBuilder } from 'discord.js';
import Command from '../interfaces/Command';

const pingCommand: Command = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

module.exports = pingCommand;