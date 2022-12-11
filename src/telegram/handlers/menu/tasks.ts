import { Menu } from 'menu';
import { GrammyContext } from '~grammy/context.ts';

// Create a simple menu.
export const addTaskMenu = new Menu<GrammyContext>('add-task-menu').text(
	'Continue',
	async (ctx) => {
		await ctx.reply(`Please wait while we prepare the form for  you.`);
		await ctx.answerCallbackQuery();
		setTimeout(() => ctx.conversation.enter('addTaskConversation'), 500);
	},
);
