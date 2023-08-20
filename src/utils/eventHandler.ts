import { Client } from "discord.js";
import path from "path";
import fs from "fs";
import Logger from "./logger";
import BotEvent from "../interfaces/botEvent";

export default {
	/**
	 * Registers all the events in the events folder.
	 * @param client {Client}
	 */
	registerEvents: function (client: Client) {
		console.log("=============================================");
		console.log("              EVENT HANDLER");
		console.log("=============================================");
		console.log("Registering events...");

		// Gets all event files - Filters out non .js files.
		const eventsPath: string = path.join(__dirname, "..", "events");
		Logger.log("EventHandler", `Loading events from ${eventsPath}.`);
		const eventFiles: string[] = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".ts"));
		console.log("Found " + eventFiles.length + " events.")
		// Loads all the events in the events folder.
		for (const file of eventFiles) {
			const eventPath: string = path.join(eventsPath, file);
			const event: BotEvent = require(eventPath);

			if (event.once) {
				console.log("Registering once event..." + event.name)
				client.once(event.name, (...args) => event.execute(...args, client));
			} else {
				console.log("Registering event..." + event.name)
				client.on(event.name, (...args) => event.execute(...args, client));
			}

			// Logs that the event has been loaded.
			Logger.log("EventHandler", `Registered ${file}.`);
		}

		console.log("=============================================");

	},
};