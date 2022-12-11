import { Composer } from 'grammy';
import { GrammyContext } from '../../context.ts';

const composer = new Composer<GrammyContext>();

composer.command('cancel', async (ctx) => {
	await ctx.conversation.exit();
	await ctx.reply('The current operation has been cancelled.');
});

export default composer;
