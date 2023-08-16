// Imports.
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const fooCommand = {
  data: new SlashCommandBuilder()
    .setName('foo')
    .setDescription('Test Command!'),
  async execute(interaction: CommandInteraction) {
    // Reply with Pong!
    await interaction.reply('bar');
  },
};

module.exports = fooCommand;