// Imports
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import  Command  from '../interfaces/Command';
import * as fileSystem from 'fs';
import * as filePath from 'path';
import Logger from './logger';

export default {
  getDeployment: function () {
    // Creates new collection for commands.
    const commands: Command[] = [];

    // Gets all command files - Filters out non .ts files.
    const commandsPath = filePath.join(__dirname, '..', 'commands');
    const commandFiles: string[] = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    // Loads all the commands in the command's folder.
    for (const file of commandFiles) {
      const command: Command = require(filePath.join(commandsPath, file)).default;

      // Checks if the command has a valid structure.
      if (!command || !command.data || !command.execute) {
        Logger.log('DeploymentCommands', `${file} does not have a valid command structure.`);
        continue;
      }

      console.log(command.data.toJSON());
      // Adds the command to the collection.
      commands.push(command);
    }

    return commands;
  },

  getDeploymentJson: function () {
    // Creates new collection for commands.
    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    // Gets all command files - Filters out non .ts files.
    const commandsPath = filePath.join(__dirname, '..', 'commands');
    const commandFiles: string[] = fileSystem.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    // Loads all the commands in the command's folder.
    for (const file of commandFiles) {
      const command: Command = require(filePath.join(commandsPath, file)).default;

      // Checks if the command has a valid structure.
      if (!command || !command.data || !command.execute) {
        Logger.log('DeploymentCommands', `${file} does not have a valid command structure.`);
        continue;
      }
      // Adds the command to the collection.
      commands.push(command.data.toJSON());
    }

    return commands;
  },

  deployCommands: async function (rest: REST) {
    const data = await rest.put(
      // Replace CLIENT_ID with your actual client ID.
      // You can also use rest.put(Routes.applicationCommands('@me'), { body: this.getDeployment() }) to deploy commands to your own account.
      // See https://discord.com/developers/docs/interactions/application-commands#registering-a-command-guild for more information.
      `/applications/${process.env.CLIENT_ID}/commands`,
      { body: this.getDeployment() },
    );

    console.log(data);
  },
};