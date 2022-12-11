import { getFullName } from '@utils/grammy.ts';
import { MiddlewareFn } from 'grammy';
import { GrammyContext } from '~grammy/context.ts';
import { prisma } from '../../../../prisma/mod.ts';

const connectUser: MiddlewareFn<GrammyContext> = async (ctx, next) => {
	try {
		if (ctx.from?.id && !ctx.user) {
			const userResponse = await ctx.db.user.findUnique({
				where: {
					telegramUserId: ctx.from.id.toString(),
				},
			});

			if (!userResponse) {
				ctx.user = await prisma.user.create({
					data: {
						telegramUserId: ctx.from.id.toString(),
						telegramUsername: ctx.from.username,
						name: getFullName(ctx.from),
					},
				});
			} else {
				ctx.user = userResponse;
			}
		}
	} catch (err) {
		console.error(err);
	} finally {
		await next();
	}
};

export default connectUser;
