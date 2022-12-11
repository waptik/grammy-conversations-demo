import { getErrorFromUnknown } from '@utils/errors.ts';
import { GrammyContext, GrammyConversation } from '~grammy/context.ts';
import { createConversation } from '~grammy/deps.ts';

async function setupBotConversation(
	convo: GrammyConversation,
	ctx: GrammyContext,
) {
	try {
		await ctx.replyWithChatAction('typing');

		await ctx.reply('Please wait while we prepare the form for you.');

		await ctx.reply('Please enter the api token mango tree. ');
		const token = await convo.form.text();

		await ctx.replyWithChatAction('typing');
		await ctx.reply(`Please enter the mango id.`);
		const personalToken = await convo.form.text();

		await ctx.reply(`Here are the details you entered:\n
        \nToken: ${token}
        \nPersonal Token: ${personalToken}
        \n\nIs this correct?`);
	} catch (e) {
		await ctx.replyWithChatAction('typing');
		const error = getErrorFromUnknown(e);
		await ctx.reply(
			`Something unnexpected occured because: ${error.message}. Please try again later.`,
		);
		return;
	}
}

export default createConversation(setupBotConversation);
