import { Interaction, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import Command from 'src/interfaces/Command';
import config from '../config'

const lfgCommand: Command = {
	data: new SlashCommandBuilder()
		.setName('lfg')
		.setDescription('Find users who own a game')
		.addStringOption(option => option.setName('game')
			.setDescription('The game to search for')
			.setRequired(true)) as SlashCommandBuilder,
		
	async execute(interaction: Interaction) {
		
		let action = interaction as CommandInteraction;
		const options = action.options as CommandInteractionOptionResolver
		const gameName = options.getString('game');
		const serverId = interaction.guildId;
	console.log("Starting Game search for " + gameName + " on server " + interaction.guild?.name + "...")
		if (!gameName) {
			await action.reply('No game name provided');
			return;
		}

		try {
			const response = await axios.get(`${config.baseURL}/api/lfg/find?game=${gameName}&server=${serverId}`);
			console.log(response.data['data']);
			//turn the response json into an array
			



			let stringBuilder = '';
			for (const user of response.data['data']) {
				console.log(user.discord_id);
				stringBuilder += `<@${user.discord_id}> `;
			}
			await action.reply(stringBuilder);
		} catch (error) {
			console.error(error);
			await action.reply('An error occurred while searching for LFG users');
		}
	},
};

module.exports = lfgCommand;