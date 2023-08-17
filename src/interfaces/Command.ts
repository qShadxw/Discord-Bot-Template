import { Interaction, SlashCommandBuilder } from "discord.js";

interface Command {

	data: SlashCommandBuilder;
	execute: (interaction: Interaction) => Promise<void>;
}

export default Command;