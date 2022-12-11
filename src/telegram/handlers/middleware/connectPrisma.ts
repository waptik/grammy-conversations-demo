import { Context, MiddlewareFn } from 'grammy';
import { prisma } from '../../../../prisma/mod.ts';
import { GrammyContext } from '../../context.ts';

const connectPrisma: MiddlewareFn<GrammyContext> = async (ctx, next) => {
	if (!ctx.db) {
		ctx.db = prisma;
	}

	await next();
};

export default connectPrisma;
