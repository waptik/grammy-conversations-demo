import { hydrateReply } from 'https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts';
import { parseMode } from 'https://deno.land/x/grammy_parse_mode@1.5.0/transformer.ts';
import { limit as rateLimit } from 'https://deno.land/x/grammy_ratelimiter@v1.1.6/mod.ts';
import { GrammyContext, GrammySession } from './context.ts';

import { tokens } from '@utils/constants.ts';

import commands from '~grammy/handlers/commands/mod.ts';
import { Bot, conversations, GrammyError, HttpError, session } from './deps.ts';
import conversationComposer from './handlers/conversations/mod.ts';
import { addTaskMenu } from './handlers/menu/tasks.ts';
import connectPrisma from './handlers/middleware/connectPrisma.ts';
import connectUser from './handlers/middleware/connectUser.ts';
import ping from './handlers/middleware/ping.ts';

export const grammy = new Bot<GrammyContext>(tokens.tg, {});

grammy.use(connectPrisma);
grammy.use(connectUser);
grammy.use(ping);
// Plugins

grammy.api.config.use(parseMode('HTML'));
grammy.use(rateLimit());
grammy.use(hydrateReply<GrammyContext>);

// custom middlewares

grammy.use(
	session({
		initial: (): GrammySession => ({}),
	}),
);
grammy.use(conversations());

grammy.use(conversationComposer);
grammy.use(addTaskMenu);
grammy.use(commands);

grammy.api
	.setMyCommands([
		{ command: 'start', description: 'Start the bot' },
		{ command: 'help', description: 'How to get help' },
		{ command: 'add_task', description: 'Add a task' },
		{ command: 'setup', description: 'Setup your own bot' },
		{ command: 'cancel', description: 'Cancel the current operation' },
	])
	.then(() => {
		console.log('commands have been uploaded to BotFather');
	})
	.catch((e) => console.error('Failed to upload commands to bot', e));

grammy.catch((err) => {
	const ctx = err.ctx;
	console.error(`Error while handling update ${ctx.update.update_id}:`);
	const e = err.error;
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description);
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e);
	} else {
		console.error('Unknown error:', e);
	}
});
