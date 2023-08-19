import { Interaction, CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder, StringSelectMenuInteraction } from 'discord.js';
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';
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
			const data = await axios.get(`${config.baseURL}/api/lfg/find?game=${gameName}&server=${serverId}`);

			const users = data.data['data'] ?? [];
			
			if(users.length === 0) {
				await action.reply({content: 'No users found with that game', ephemeral: true});
				return;
			}
			const selectMenu = new StringSelectMenuBuilder()
				.setCustomId('lfg')
				.setPlaceholder('Select a user to message')
				.setMinValues(1)
				.setMaxValues(users.length);//lawl, that sounds fucking daft
			selectMenu.addOptions(users.map((user: any) => {
				return new StringSelectMenuOptionBuilder()
					.setLabel(user.discord_name)
					.setValue(user.discord_id)
					.setDescription(user.discord_name);
			}));

			const row = new ActionRowBuilder()
				.addComponents(selectMenu).toJSON();

			const response = await action.reply({
				content: 'Who do you want to tag?',
				components: [row as any],
				ephemeral: true
			});

			const collectorFilter = (i: any) => i.user.id === interaction.user.id;

			const selection = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 }) as StringSelectMenuInteraction;

			if (selection.customId === 'lfg') {
				console.log(selection.values);
				if (selection.values.length === 0) action.editReply(`${interaction.user.displayName} would like somebody to play ${gameName} with them.`)
				if (selection.values.length > 0) {
					//build the username string
					const selectedUserNames = users
						.filter((user: any) => selection.values.includes(user.discord_id))
						.map((user: any) => user.discord_id);

					action.deleteReply();
					let stringBuilder: string[] = [];
					selectedUserNames.forEach((id: string) => {
						stringBuilder.push(`<@${id}>`);
					});
					action.channel?.send(`<@${interaction.user.id}> would like to play ${gameName} with ${stringBuilder}.`);
				}
			}

		} catch (error) {
			console.error(error);
			await action.reply({content: 'An error occurred while searching for LFG users', ephemeral: true});
		}
	},
};

module.exports = lfgCommand;