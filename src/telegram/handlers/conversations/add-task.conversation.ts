import { GrammyContext, GrammyConversation } from '~grammy/context.ts';
import { getErrorFromUnknown } from '@utils/errors.ts';
import { toUppercase } from '@utils/misc.ts';
import { createConversation } from '~grammy/deps.ts';

// a function that validates an email address and returns a boolean

export async function addTaskConversation(
	conversation: GrammyConversation,
	ctx: GrammyContext,
) {
	await ctx.replyWithChatAction('typing');

	console.log('addTaskConversation.user', ctx.user);

	try {
		// Name
		await ctx.reply('What is the name of the project?');
		let name = await conversation.form.text();
		name = toUppercase(name);

		// Description
		await ctx.replyWithChatAction('typing');

		await ctx.reply('Describe the project');

		const description = await conversation.form.text();

		// Company
		await ctx.replyWithChatAction('typing');

		await ctx.reply('Enter the name of the company');

		const company = await conversation.form.text();

		// Assignee
		await ctx.replyWithChatAction('typing');

		await ctx.reply('Assign someone to this task');

		const assignee = await conversation.form.text();

		// Status
		await ctx.replyWithChatAction('typing');

		await ctx.reply('Set the status of this task');

		const status = await conversation.form.text();

		// Priority
		await ctx.replyWithChatAction('typing');

		await ctx.reply('What is the priority of this task? (1-10)');

		const priority = await conversation.form.number();

		// Target End date
		await ctx.replyWithChatAction('typing');

		await ctx.reply('When will this task be completed? (mm/dd/yyyy) ');

		const endDate = await conversation.form.text();

		await ctx.replyWithChatAction('typing');
		await ctx.replyWithHTML(
			`Thank you for your time 🙏.
            \nHere is your response:
            \nName: ${name}
            \nDescription: ${description}
            \nCompany: ${company}
            \nAssignee: ${assignee}
            \nStatus: ${status}
            \nPriority: ${priority}
            \nTarget End Date: ${endDate}
            \n\nYou can always add a new task by typing /add_task
            `,
		);
	} catch (e) {
		await ctx.replyWithChatAction('typing');
		const error = getErrorFromUnknown(e);
		await ctx.reply(
			`Something unnexpected occured because: ${error.message}. Please try again later.`,
		);
		return;
	}
}

export default createConversation(addTaskConversation);
