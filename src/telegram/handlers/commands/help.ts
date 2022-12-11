import { Composer } from '~grammy/deps.ts';

const composer = new Composer();

composer.command('help', async (ctx) => {
	const helpMsg = [
		`<b>Available Commands : </b>`,
		`/start : Start the Bot`,
		`/help : Show Help Menu.`,
		`/add_task : Add a task.`,
		`/setup : Setup your own bot.`,
		`/cancel : Cancel the current operation.`,
	].join('\n');

	return await ctx.reply(helpMsg);
});

export default composer;
