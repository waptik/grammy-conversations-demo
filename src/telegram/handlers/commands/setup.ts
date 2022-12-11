import { getFullName } from '@utils/grammy.ts';
import { Composer } from 'grammy';

import { GrammyContext } from '~grammy/context.ts';
import { getErrorFromUnknown } from '../../../utils/errors.ts';

const composer = new Composer<GrammyContext>();

composer.command('setup', async (ctx) => {
	try {
		await ctx.replyWithChatAction('typing');
		await ctx.reply(
			`
            Hi ${getFullName(ctx.from!).replaceAll('.', '')},
            \nI'm glad that you want to setup your own bot. This process will take a few minutes.
                    `,
		);
		setTimeout(() => ctx.conversation.enter('setupBotConversation'), 500);
	} catch (err) {
		const error = getErrorFromUnknown(err);
		console.error(error.message);
	}
});

export default composer;
