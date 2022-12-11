import { getFullName } from '@utils/grammy.ts';
import { Composer } from 'grammy';

import { GrammyContext } from '~grammy/context.ts';

const composer = new Composer<GrammyContext>();

composer.command('start', async (ctx) => {
	await ctx.replyWithChatAction('typing');
	await ctx.reply(
		`
		Hi ${getFullName(ctx.from!).replaceAll('.', '')},
		Welcome. Your one stop to managing your mangoes 🥳🎉
		
		Type "/" in the message box or click the menu button to see the list of commands.
        `,
	);
});

export default composer;
