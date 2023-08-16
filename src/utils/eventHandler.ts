import { Client } from "discord.js";
import path from "path";
import fs from "fs";
import Logger from "./logger";

interface Event {
	name: string;
	once: boolean;
	execute: (...args: any[]) => void;
}

export default {
	/**
	 * Registers all the events in the events folder.
	 * @param client {Client}
	 */
	registerEvents: function (client: Client) {
		console.log("Registering events...");
		// Gets all event files - Filters out non .js files.
		const eventsPath: string = path.join(__dirname, "..", "events");
		const eventFiles: string[] = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".ts"));
		console.log("Found " + eventFiles.length + " events.")
		// Loads all the events in the events folder.
		for (const file of eventFiles) {
			const eventPath: string = path.join(eventsPath, file);
			console.log("Loading event..." + eventPath)
			const event: Event = require(eventPath);

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
	},
};