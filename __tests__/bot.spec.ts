import { pingCommand } from '../src/commands/ping';
import { CommandInteraction } from 'discord.js';
import { jest } from '@jest/globals';

const mockInteraction = {
	reply: jest.fn(),
} as unknown as CommandInteraction;

describe('ping command', () => {
	it('should reply with pong', () => {
		pingCommand.execute(mockInteraction);
		expect(mockInteraction.reply).toBeCalledWith('Pong!');
	});
});