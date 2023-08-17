/**
 * Gets the current time.
 * @returns {string}
 */
function getCurrentTime(): string {
	let date = new Date();
	// Returns the current time in the format of HH:MM:SS | DD/MM/YYYY
	// getDate returns the day of the month, getMonth returns the month (0-11), getFullYear returns the year.
	// getMonth + 1 for correct month.
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

/**
 * Logs a message to the console.
 * @param prefix {string}
 * @param message {string}
 */
function log(prefix: string, message: string): void {
	console.log(`[${getCurrentTime()}] [${prefix}] ${message}`);
}

// Exports Log Command
export default {
	log: log,
};