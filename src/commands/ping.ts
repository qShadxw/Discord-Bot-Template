/*
	Ping Command.
	Simple command that replies with Pong!
	To test if the bot is working.
 */
// Imports.
import { CommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';
import Command from '../interfaces/Command';

 export const pingCommand: Command = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	async execute(interaction) {
		let action = interaction as CommandInteraction;
		await action.reply('Pong!');
	},
};

module.exports = pingCommand;