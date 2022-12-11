import { Composer } from 'grammy';
import { GrammyContext } from '~grammy/context.ts';
import { addTaskMenu } from '~grammy/handlers/menu/tasks.ts';

const composer = new Composer<GrammyContext>();

composer.command('add_task', async (ctx) => {
	await ctx.replyWithChatAction('typing');
	await ctx.reply(
		`We will now help you add a Platform task.
        \nThis process will take a few minutes
        \nClick on the continue button to begin the process.`,
		{
			disable_web_page_preview: true,
			reply_markup: addTaskMenu,
		},
	);
});

export default composer;
