// Imports.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Interaction } from 'discord.js';
import Command from 'src/interfaces/Command';

const fooCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('foo')
    .setDescription('Test Command!'),
  async execute(interaction: Interaction) {
	let action = interaction as CommandInteraction;
    // Reply with Pong!
    await action.reply('bar');
  },
};

module.exports = fooCommand;